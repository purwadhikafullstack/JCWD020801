const multer = require("multer");
const path = require('path');

module.exports = {
  multerUpload: () => {
    const storage = multer.diskStorage({
      destination: (req, file, cb) => {
        // cb(null, "./src/public/products");
        cb(null, path.join(__dirname, `../../public/products`));
      },
      filename: (req, file, cb) => {
        cb(
          null,
          "PIMG" +
            "-" +
            Date.now() +
            Math.round(Math.random() * 1000000) +
            "." +
            file.mimetype.split("/")[1]
        );
      },
    });
    const fileFilter = (req, file, cb) => {
      const extFilter = ["jpg", "jpeg", "png", "gif"];
      const checkEct = extFilter.includes(file.mimetype.split("/")[1].toLowerCase());

      if (checkEct) {
        cb(null, true);
      } else {
        cb(new Error("file format not match"));
      }
    };
    const limits = { fileSize: 1024 * 1024 };
    return multer({ storage, fileFilter, limits });
  },

  multerUploadProfile: () => {
    const storage = multer.diskStorage({
      destination: (req, file, cb) => {
        // cb(null, "./src/public/admin_pp");
        cb(null, path.join(__dirname, `../../public/admin_pp`));
      },
      filename: (req, file, cb) => {
        cb(
          null,
          "PIMG" +
            "-" +
            Date.now() +
            Math.round(Math.random() * 1000000) +
            "." +
            file.mimetype.split("/")[1]
        );
      },
    });
    const fileFilter = (req, file, cb) => {
      const extFilter = ["jpg", "jpeg", "png", "gif"];
      const checkEct = extFilter.includes(file.mimetype.split("/")[1].toLowerCase());

      if (checkEct) {
        cb(null, true);
      } else {
        cb(new Error("file format not match"));
      }
    };
    const limits = { fileSize: 1024 * 1024 };
    return multer({ storage, fileFilter, limits });
  },

  multerUploadProfile: () => {
    const storage = multer.diskStorage({
      destination: (req, file, cb) => {
        cb(null, "./src/public/admin_pp");
      },
      filename: (req, file, cb) => {
        cb(
          null,
          "PIMG" +
            "-" +
            Date.now() +
            Math.round(Math.random() * 1000000) +
            "." +
            file.mimetype.split("/")[1]
        );
      },
    });
    const fileFilter = (req, file, cb) => {
      const extFilter = ["jpg", "jpeg", "png", "gif"];
      const checkEct = extFilter.includes(file.mimetype.split("/")[1].toLowerCase());

      if (checkEct) {
        cb(null, true);
      } else {
        cb(new Error("file format not match"));
      }
    };
    const limits = { fileSize: 1024 * 1024 };
    return multer({ storage, fileFilter, limits });
  },

  multerUploadProfile: () => {
    const storage = multer.diskStorage({
      destination: (req, file, cb) => {
        cb(null, "./src/public/admin_pp");
      },
      filename: (req, file, cb) => {
        cb(
          null,
          "PIMG" +
            "-" +
            Date.now() +
            Math.round(Math.random() * 1000000) +
            "." +
            file.mimetype.split("/")[1]
        );
      },
    });
    const fileFilter = (req, file, cb) => {
      const extFilter = ["jpg", "jpeg", "png", "gif"];
      const checkEct = extFilter.includes(file.mimetype.split("/")[1].toLowerCase());

      if (checkEct) {
        cb(null, true);
      } else {
        cb(new Error("file format not match"));
      }
    };
    const limits = { fileSize: 1024 * 1024 };
    return multer({ storage, fileFilter, limits });
  },
};