import Midtrans from 'midtrans-client';
const axios = require('axios');

let snap = new Midtrans.Snap({
  isProduction: false,
  serverKey: process.env.MIDTRANS_SERVER_KEY,
  clientKey: process.env.MIDTRANS_CLIENT_KEY,
});

export const tokenMidtrans = async (req, res) => {
  const { id, total } = req.body;

  const params = {
    transaction_details: {
      order_id: id,
      gross_amount: total,
    },
  };

  console.log(params, '>>>>> params');

  try {
    const token = await snap.createTransactionToken(params);
    console.log(token, '>>>>> token');
    res.status(200).send(token);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: 'error server' });
  }
};
