import Order from '../models/order.model';
// import ProductImage from '../models/productimage.model';
// import Category from '../models/category.model';
// import SubCategory from '../models/subcategory.model';
// import { Op } from 'sequelize';
// require('dotenv').config();

export const addOrder = async (req, res) => {
  try {
    const { status, payment_method, payment_proof, isPaid, redeem_voucher } =
      req.body;
    console.log('BODY', req.body);

    const result = await Order.create({
      status,
      payment_method: 'automatic',
      isPaid,
    });

    // const findProduct = await Product.findOne(
    //     {
    //         where: {
    //             name: name
    //         }
    //     }
    // )

    // if (findProduct) {
    //     return res.status(400).send({ message: "Product already exist" })
    // }

    // const result = await Product.create({
    //   name: name,
    //   description: description,
    //   price: price,
    //   weight: weight,
    //   CategoryId: category_id,
    // });

    // await ProductImage.create({
    //     image: `${process.env.BASE_URL_API}/public/products/${req.file?.filename}`,
    //     ProductId: result.id
    // })

    // if (subcategory_id) {
    //     await Product.update(
    //         {
    //             SubCategoryId: subcategory_id
    //         },
    //         {
    //             where: {
    //                 name: name
    //             }
    //         }
    //     )
    // }
    // return res.status(201).send({ message: "A new product has been created successfully" })
    return res.status(201).send({ message: 'success' });
  } catch (error) {
    console.error(error);
    // return res.status(500).send({ message: error.message })
  }
};

// export const getAllProducts = async (req, res) => {
//     try {
//         const {page, sortBy, sortOrder = 'asc', search = '' } = req.query;
//         const limit = 6;
//         const offset = (page - 1) * limit;

//         const allProducts = await Product.findAndCountAll({
//             include: [
//                 {
//                     model: Category,
//                     attributes: ['name']
//                 },
//                 {
//                     model: SubCategory,
//                     attributes: ['name']
//                 }
//             ],
//             where: {
//                 name: {
//                     [Op.like]: `%${search}%`
//                 },
//                 isDeleted: {
//                     [Op.not]: true
//                 }
//             },
//             order: [[sortBy, sortOrder.toUpperCase()]],
//             limit: parseInt(limit),
//             offset: parseInt(offset),
//         })
//         const totalPages = Math.ceil(allProducts.count / limit);
//         return res.status(200).send({ result: allProducts, page, totalPages })
//     } catch (error) {
//         console.error(error)
//         return res.status(500).send({ message: error.message })
//     }
// }

// export const editProduct = async (req, res) => {
//     try {
//         const { id, name, description, price, weight, category_id, subcategory_id, isDisabled } = req.body;

//         const updateFields = {
//             ...(name && { name }),
//             ...(description && { description }),
//             ...(price && { price }),
//             ...(weight && { weight }),
//         };

//         if(category_id){
//             updateFields.CategoryId = category_id
//         }
//         if (subcategory_id) {
//             updateFields.SubCategoryId = subcategory_id
//         }

//         updateFields.isDisabled = isDisabled

//         const findProduct = await Product.findOne({
//             where: {
//                 id: id
//             }
//         })

//         if (!findProduct) {
//             return res.status(404).send({ message: "Product not found" })
//         }

//         if(category_id){
//             if (findProduct.CategoryId != updateFields.category_id) {
//                 await Product.update(
//                     { SubCategoryId: null },
//                     { where: { id: findProduct.id } }
//                 )
//             }
//         }

//         await Product.update(
//             updateFields,
//             {
//                 where: {
//                     id: id
//                 }
//             }
//         )
//         return res.status(200).send({ message: "Product updated" })
//     } catch (error) {
//         console.error(error)
//         return res.status(500).send({ message: error.message })
//     }
// }

// export const deleteProduct = async (req, res) => {
//     try {
//         const id = req.params.id
//         const findProduct = await Product.findOne({
//             where: {
//                 id: id
//             }
//         })
//         if (!findProduct) {
//             return res.status(404).send({ message: "Product not found" })
//         }
//         await Product.update(
//             {
//                 isDeleted: true,
//                 isDisabled: true
//             },
//             {
//                 where: {
//                     id: id
//                 }
//             }
//         )
//         return res.status(200).send({ message: "Product deleted" })
//     } catch (error) {
//         console.error(error)
//         return res.status(500).send({ message: error.message })
//     }
// }

// export const getTotalProduct = async (req, res) => {
//     try {
//         const totalProduct = await Product.count({
//             where: {
//                 isDeleted: false
//             }
//         })
//         res.status(200).send({ totalProduct })
//     } catch (error) {
//         console.error(error)
//         return res.status(500).send({ message: error.message })
//     }
// }

// export const getProductImages = async (req, res) => {
//     try{
//         const id = req.params.id
//         const imageProduct = await ProductImage.findOne({
//             where:{
//                 ProductId: id
//             }
//         })
//         res.status(200).send({ imageProduct })
//     }catch(error){
//         console.error(error)
//         return res.status(500).send({message: error.message})
//     }
// }
