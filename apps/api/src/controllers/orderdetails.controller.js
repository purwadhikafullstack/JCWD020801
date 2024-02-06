import OrderDetail from '../models/orderdetail.model';

export const createOderDetail = async (req, res) => {
  try {
    const data = req.body;
    console.log('data>>>>>>', data);
    // console.log('total', total);
    // console.log('product', product);

    const params = data.map((item) => ({
      quantity: item.quantity,
      total: item.price * item.quantity,
      // ProductId: item.id,
    }));

    const result = await OrderDetail.bulkCreate(params);

    // console.log('result>>>>'.result);

    return res.status(201).send({
      result,
      message: 'order details has been created successfully',
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: error.message });
  }
};

export const getAllOrderDetails = async (req, res) => {
  const result = await OrderDetail.findAll();

  console.log('data>>>>>>', result);

  return res.status(200).send({ result });
};
