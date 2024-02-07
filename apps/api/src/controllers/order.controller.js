import Order from '../models/order.model';
import Midtrans from 'midtrans-client';

export const addOrder = async (req, res) => {
  let snap = new Midtrans.Snap({
    isProduction: false,
    serverKey: process.env.MIDTRANS_SERVER_KEY,
    clientKey: process.env.MIDTRANS_CLIENT_KEY,
  });

  try {
    const { id, total } = req.body;

    const params = {
      transaction_details: {
        order_id: id,
        gross_amount: total,
      },
    };

    const token = await snap.createTransactionToken(params);
    console.log(token, '>>>>> token');

    const result = await Order.create({
      id,
      status: 'completed',
      payment_method: 'automatic',
      isPaid: true,
    });

    // return res.status(201).send({ message: "A new product has been created successfully" })
    return res.status(201).send({ token });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: error.message });
  }
};
