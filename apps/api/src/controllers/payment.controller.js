import Midtrans from 'midtrans-client';
const axios = require('axios');

const snap = new Midtrans.Snap({
  isProduction: false,
  serverKey: process.env.MIDTRANS_SERVER_KEY,
  clientKey: process.env.MIDTRANS_CLIENT_KEY,
});

export const tokenMidtrans = async (req, res) => {
  // const { id, productName, price } = req.body;
  const [product] = req.body;

  console.log(product, '>>>>> body');

  // console.log(id, '>>>>>> id');
  // console.log(typeof id, '>>>>>> id');
  // console.log(price, '>>>>>> id');
  // console.log(typeof price, '>>>>>> id');

  // const params = products.map((item) => {
  //   const product = {
  //     transaction_details: {
  //       order_id: item.id,
  //       gross_amount: item.price * item.quantity,
  //     },
  //   };
  //   console.log(product);
  //   return product;
  // });

  const params = {
    transaction_details: {
      order_id: product.id,
      gross_amount: product.price * product.quantity,
    },
  };

  console.log(params, 'produccdcdcdcdcd');
  const token = await snap.createTransactionToken(params);
  console.log(token, '>>>>> token');

  res.status(200).send(token);
  // console.log(product, '>>>>> product');
  // console.log(product.id, '>>>>> product');
  // console.log(product.price, '>>>>> product');
  // console.log(product.quantity, '>>>>> product');

  // const params = {
  //   item_details: {
  //     name: product.name,
  //     price: product.price,
  //     quantity: product.quantity,
  //   },
  //   transaction_details: {
  //     order_id: product.id,
  //     gross_amount: product.price * product.quantity,
  //   },
  // };

  // try {
  //   console.log(token);
  //   res.status(200).send({ message: 'success' });

  //   //   res.status(200).send({ message: 'success' });
  // } catch (error) {
  //   console.log(error);
  //   res.status(500).send({ message: 'error server' });
  // }
};
