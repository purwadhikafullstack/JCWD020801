import Admin from '../models/admin.model';
import Branch from '../models/branch.model'
import bcrypt from 'bcrypt';
import { Op } from 'sequelize';
import jwt from 'jsonwebtoken';
import fs from 'fs';
import { transporter } from '../middleware/admin/admin.transporter';
import handlebars from 'handlebars';
import moment from 'moment'
require('dotenv').config();

function generateVerificationCode() {
  const length = 5;
  const charset =
    'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let verificationCode = '';

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    verificationCode += charset.charAt(randomIndex);
  }

  return verificationCode.toUpperCase();
}

export const createAdmin = async (req, res) => {
  try {
    const { name, username, email } = req.body;

    const findUser = await Admin.findOne({
      where: {
        [Op.or]: [{ username: username }, { email: email }],
      },
    });

    if (findUser == null) {
      const verCode = generateVerificationCode();

      const result = await Admin.create({
        ...req.body,
        verification_code: verCode,
      });

      let payload = { id: result.id };
      const path = require('path');
      const token = jwt.sign(payload, process.env.KEY_JWT, { expiresIn: '1h' });
      const data = fs.readFileSync(
        path.join(__dirname, '../templates/admin/emailVerification.html'),
        'utf-8',
      );
      const tempCompile = await handlebars.compile(data);
      const tempResult = tempCompile({
        name: name,
        username: username,
        email: email,
        link: `${process.env.BASE_URL}admin-verification/${token}`,
      });

      await transporter.sendMail({
        from: 'vadittolk@gmail.com',
        to: email,
        subject: 'Fresh Finds - Account Verification',
        html: tempResult,
      });

      return res.status(201).send({ message: 'A new admin has been created successfully' });
    } else {
      return res.status(409).send({ message: 'Account is already exist' });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: error.message });
  }
};

export const getAllAdmin = async (req, res) => {
  try {
    const { page, sortBy, sortOrder = 'asc', search = '' } = req.query;
    const limit = 5;
    const offset = (page - 1) * limit;

    const dataAdmin = await Admin.findAndCountAll({
      include: [
        {
          model: Branch
        }
      ],
      where: {
        isSuperAdmin: false,
        name: {
          [Op.like]: `%${search}%`
        }
      },
      attributes: {
        exclude: ['password'],
      },
      order: [[sortBy, sortOrder.toUpperCase()]],
      limit: parseInt(limit),
      offset: parseInt(offset),
    });

    const totalPages = Math.ceil(dataAdmin.count / limit);
    return res.status(200).send({ result: dataAdmin, page, totalPages });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: error.message });
  }
};

export const deleteAdmin = async (req, res) => {
  const id = req.params.id;
  try {
    const deletedCount = await Admin.destroy({
      where: {
        id: id,
      },
    });

    if (deletedCount > 0) {
      return res.status(200).send({ message: 'Account successfully deleted' });
    } else {
      return res
        .status(404)
        .send({ message: 'Account not found or already deleted' });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: error.message });
  }
};

export const updateAdmin = async (req, res) => {
  const { id, name, username, email, password } = req.body;

  try {

    const updateFields = {
      ...(name && { name }),
      ...(username && { username }),
      ...(email && { email })
    };
    if (password) {
      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(password, salt);
      updateFields.password = hashPassword;
    }
    if (req.file) {
      updateFields.profile_picture = `${process.env.BASE_URL_API}public/admin_pp/${req.file?.filename}`
    }
    const [updatedCount] = await Admin.update(
      updateFields, {
      where: { id: id }
    }
    );

    if (updatedCount > 0) {
      return res.status(200).send({ message: 'Admin updated' });
    } else {
      return res.status(404).send({ message: 'Admin not found' });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: error.message });
  }
};

export const loginAdmin = async (req, res) => {
  try {
    const { email, username, password } = req.body;
    let dataLoginAdmin;
    let isValid;

    dataLoginAdmin = await Admin.findOne({
      where: email ? { email } : username ? { username } : null,
      include: [{ model: Branch }]
    });

    if (!dataLoginAdmin) {
      return res.status(404).send({ message: 'Account not found' });
    }

    if (!dataLoginAdmin.isVerified) {
      return res.status(403).send({ message: "Your account isn't verified" });
    }

    if (dataLoginAdmin.password) {
      isValid = await bcrypt.compare(password, dataLoginAdmin.password);
    }

    if (!isValid) {
      return res.status(401).send({ message: 'Incorrect password' });
    }

    let payload = {
      id: dataLoginAdmin.id,
      isSuperAdmin: dataLoginAdmin.isSuperAdmin,
    };
    const expiresIn = req.query.rememberme === 'true' ? undefined : '3h';
    const token = jwt.sign(payload, process.env.KEY_JWT, { expiresIn });

    dataLoginAdmin.dataValues.formattedCreatedAt = moment(dataLoginAdmin.createdAt).format('MMMM Do YYYY, h:mm:ss a');

    return res.status(200).send({
      message: 'Login success',
      result: dataLoginAdmin,
      token,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: error.message });
  }
};

export const keepLoginAdmin = async (req, res) => {
  try {
    const adminData = await Admin.findOne({
      where: {
        id: req.admin.id,
      },
      include: [{ model: Branch }]
    });

    if (!adminData) {
      return res.status(404).send({ message: 'Admin not found' });
    }

    adminData.dataValues.formattedCreatedAt = moment(adminData.createdAt).format('MMMM Do YYYY, h:mm:ss a');

    return res.status(200).send({ message: 'Keep login', result: adminData });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: error.message });
  }
};

export const updateVerifiedAdmin = async (req, res) => {
  try {
    const adminData = await Admin.findOne({
      where: {
        id: req.admin.id,
      },
    });

    if (!adminData) {
      return res.status(404).json({ message: 'Account not found' });
    }

    if (adminData.isVerified) {
      return res.status(400).json({ message: 'Account is already verified' });
    }

    await Admin.update(
      { isVerified: true },
      {
        where: {
          id: req.admin.id,
        },
      },
    );

    return res.status(200).send({ message: 'Account successfully verified' });
  } catch (error) {
    return res.status(400).send({ error: error.message });
  }
};

export const updatePasswordAdmin = async (req, res) => {
  try {
    const { password } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    await Admin.update(
      {
        password: hashPassword,
      },
      {
        where: {
          id: req.admin.id,
        },
      },
    );
    return res.status(200).send({ message: 'Password successfully updated' });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

export const forgotPassword = async (req, res) => {
  try {
    let { email } = req.query;

    const findAccount = await Admin.findOne({
      where: {
        email: email,
      },
      attributes: {
        exclude: ['password'],
      },
    });

    if (findAccount) {
      let payload = { id: findAccount.id };
      const path = require('path');
      const token = jwt.sign(payload, process.env.KEY_JWT, {
        expiresIn: '24h',
      });
      const data = fs.readFileSync(
        path.join(__dirname, '../templates/admin/forgotPassword.html'),
        'utf-8',
      );
      const tempCompile = await handlebars.compile(data);
      const tempResult = tempCompile({
        email: email,
        link: `${process.env.BASE_URL}admin-reset-password/${token}`,
      });

      await transporter.sendMail({
        from: 'vadittolk@gmail.com',
        to: email,
        subject: 'Fresh Finds - Reset Password',
        html: tempResult,
      });
      return res.status(200).send({ message: 'Email has been sent' });
    } else {
      return res.status(404).send({ message: 'Account not found' });
    }
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

export const getVerCode = async (req, res) => {
  try {
    const account = await Admin.findOne({
      where: {
        id: req.admin.id,
      },
      attributes: ['verification_code', 'password'],
    });

    if (!account) {
      return res.status(404).send({ message: 'Account not found' });
    }

    return res.status(200).send({ result: account });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error: error.message });
  }
};

export const getTotalAdmin = async (req, res) => {
  try {
    const totalAdmin = await Admin.count({
      where: {
        isSuperAdmin: false,
      },
    });
    const latestAdded = await Admin.findOne({
      where: {
        isSuperAdmin: false
      },
      order: [['createdAt', 'DESC']],
    })
    res.status(200).send({ totalAdmin, latestAdded });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: error.message });
  }
};

export const logoutAdmin = (req, res) => {
  try {
    req.admin = null;
    return res.status(200).send({
      message: 'Logout success',
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: error.message });
  }
};

export const getAllAdminNoPagination = async (req, res) => {
  try {

    const result = await Admin.findAll({
      include: [
        {
          model: Branch
        }
      ],
      where: {
        isSuperAdmin: false
      },
      // order: 
    })

    result.forEach(row => {
      row.dataValues.formattedCreatedAt = moment(row.createdAt).format('MMMM Do YYYY, h:mm:ss a');
      row.dataValues.formattedUpdatedAt = moment(row.updatedAt).format('MMMM Do YYYY, h:mm:ss a');
  });

    return res.status(200).send({ result: result })
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: error.message })
  }
}

export const superAdmin = async (req, res) => {
  try {
    const { name, username, email, password, code } = req.body;

    if (!code) {
      return res.status(400).send({ message: 'Please input code' });
    }

    if (code != 'freshfinds') {
      return res.status(400).send({ message: 'Wrong code' });
    }

    const findAdmin = await Admin.findOne({
      where: {
        [Op.or]: [{ username: username }, { email: email }],
      },
    });

    if (findAdmin) {
      return res.status(409).send({ message: 'Account is already exist' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    const verCode = 'SA'

    await Admin.create({
      name: name,
      username: username,
      email: email,
      password: hashPassword,
      isVerified: true,
      isSuperAdmin: true,
      verification_code: verCode,
    });

    return res.status(201).send({ message: 'A new superadmin has been created successfully' });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error: error.message });
  }
}