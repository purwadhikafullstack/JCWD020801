// import OrderDetail from '../models/order.model';
// // import ProductImage from '../models/productimage.model';
// // import Category from '../models/category.model';
// // import SubCategory from '../models/subcategory.model';
// // import { Op } from 'sequelize';
// // require('dotenv').config();

// export const createOderDetail = async (req, res) => {
//   try {
//     const { status, payment_method, payment_proof, isPaid, redeem_voucher } =
//       req.body;
//     console.log('BODY', req.body);

//     const result = await Order.create({
//       status,
//       payment_method: 'automatic',
//       isPaid,
//     });

//     // const findProduct = await Product.findOne(
//     //     {
//     //         where: {
//     //             name: name
//     //         }
//     //     }
//     // )

//     // if (findProduct) {
//     //     return res.status(400).send({ message: "Product already exist" })
//     // }

//     // const result = await Product.create({
//     //   name: name,
//     //   description: description,
//     //   price: price,
//     //   weight: weight,
//     //   CategoryId: category_id,
//     // });

//     // await ProductImage.create({
//     //     image: `${process.env.BASE_URL_API}/public/products/${req.file?.filename}`,
//     //     ProductId: result.id
//     // })

//     // if (subcategory_id) {
//     //     await Product.update(
//     //         {
//     //             SubCategoryId: subcategory_id
//     //         },
//     //         {
//     //             where: {
//     //                 name: name
//     //             }
//     //         }
//     //     )
//     // }
//     // return res.status(201).send({ message: "A new product has been created successfully" })
//     return res.status(201).send({ message: 'success' });
//   } catch (error) {
//     console.error(error);
//     // return res.status(500).send({ message: error.message })
//   }
// };
