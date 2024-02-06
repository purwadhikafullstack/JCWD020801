import Discount from "../models/discount.model";
import moment from 'moment'
import ProductBranch from "../models/productbranch.model";
import Product from "../models/product.model";
import Branch from "../models/branch.model";
import { Op } from "sequelize";
import Admin from "../models/admin.model";

export const getAllDiscount = async (req, res) => {
    try {
        const { page, sortBy, sortOrder = 'asc', search, admid } = req.query;
        console.log(req.query);
        const limit = 5;
        const offset = (page - 1) * limit;

        const findAdmin = await Admin.findOne({
            where: {
                id: admid
            }
        })

        let whereCondition = {}
        if (admid && findAdmin.isSuperAdmin === false) {
            const findBranches = await Branch.findAll({
                where: {
                    AdminId: admid
                }
            });

            const branchIds = findBranches.map(branch => branch.id);
            whereCondition = {
                '$ProductBranch.Branch.id$': branchIds
            };
        }
        if (search) {
            whereCondition = {
                ...whereCondition,
                [Op.and]: {
                    '$ProductBranch.Product.name$': {
                        [Op.like]: `%${search}%`
                    }
                }
            };
        }

        const allDiscount = await Discount.findAndCountAll({
            include: [
                {
                    model: ProductBranch,
                    include:[
                        {model: Product},
                        {model: Branch}
                    ]
                }
            ],
            where: whereCondition,
            order: [[sortBy, sortOrder.toUpperCase()]],
            limit: parseInt(limit),
            offset: parseInt(offset),
        });

        allDiscount.rows.forEach(row => {
            row.dataValues.formattedCreatedAt = moment(row.createdAt).format('MMMM Do YYYY, h:mm:ss a');
            row.dataValues.formattedUpdatedAt = moment(row.updatedAt).format('MMMM Do YYYY, h:mm:ss a');
        });

        const totalPages = Math.ceil(allDiscount.count / limit);
        return res.status(200).send({ result: allDiscount, page, totalPages })

    } catch (error) {
        console.error(error)
        return res.status(500).send({ message: error.message })
    }
}

export const getTotalDiscount = async (req, res) => {
    try {
        const totalDiscount = await Discount.count()
        res.status(200).send({ totalDiscount })
    } catch (error) {
        console.error(error)
        return res.status(500).send({ message: error.message })
    }
}

export const addDiscount = async (req, res) => {
    try {
        const {type, value, min_purchase_amount, max_discount, productbranchid, amount } = req.body;
        console.log(req.body);

        let discount_amount = 0

        if(value === 'percentage'){
            discount_amount = amount / 100;
        }else{
            discount_amount = amount
        }

        const findDiscount = await Discount.findOne({
            where: {
                ProductBranchId: productbranchid
            }
        })

        if (findDiscount) {
            return res.status(400).send({ message: "Discount for this product already exist" })
        }

        await Discount.create({
            type: type,
            value: value,
            min_purchase_amount: min_purchase_amount,
            max_discount: max_discount,
            amount: discount_amount,
            ProductBranchId: productbranchid
        })

        return res.status(201).send({ message: "A new discount has been created successfully" })
    } catch (error) {
        console.error(error)
        return res.status(500).send({ message: error.message })
    }
}

export const updateDiscount = async (req, res) => {
    try {
        const { id, value, min_purchase_amount, max_discount, amount } = req.body;

        const updateFields = {
            ...(value && { value }),
            ...(min_purchase_amount && { min_purchase_amount }),
            ...(max_discount && { max_discount }),
            ...(amount && { amount }),
        };

        const findDiscount = await Discount.findOne({
            where: {
                id: id
            }
        })

        if (!findDiscount) {
            return res.status(404).send({ message: 'Discount data not found' })
        }

        await Discount.update(
            updateFields,
            {
                where: {
                    id: id
                }
            }
        )

        return res.status(200).send({ message: 'Discount data updated' })
    } catch (error) {
        console.error(error)
        return res.status(500).send({ message: error.message })
    }
}

export const deleteDiscount = async (req, res) => {
    try {
        const id = req.params.id
        const findDiscount = await Discount.findOne({
            where: {
                id: id
            }
        })
        if (!findDiscount) {
            return res.status(404).send({ message: "Discount data not found" })
        }
        await Discount.destroy({
            where: {
                id: id,
            },
        });
        return res.status(200).send({ message: "Discount deleted" })
    } catch (error) {
        console.error(error)
        return res.status(500).send({ message: error.message })
    }
}