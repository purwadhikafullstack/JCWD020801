import CustomerVoucher from '../models/customervoucher.model'
import Voucher from '../models/voucher.model'

export const addVoucher = async (req, res) => {
    try {
        const { type, code, start_date, end_date, value, amount } = req.body

        const isCodeExist = await Voucher.findOne({
            where: {
                code: code
            }
        })

        if (isCodeExist) {
            return res.status(400).send({ message: "Voucher code is already listed" })
        }

        await Voucher.create({
            type,
            code,
            value,
            amount,
            start_date,
            end_date
        })

        return res.status(200).send({ message: "A new voucher has been created successfully" })

    } catch (error) {
        console.error(error);
        return res.status(400).send({ message: error.message })
    }
}

export const getCustomerVoucher = async (req, res) => {
    try {
        const { page } = req.query
        const limit = 6
        const offset = (page - 1) * limit;

        const result = await CustomerVoucher.findAndCountAll({
            where: {
                CustomerId: req.user.id
            },
            order: [
                ['createdAt', 'DESC']
            ],
            include: [
                {
                    model: Voucher,
                    // attributes: ['type'],
                }
            ],
            limit: parseInt(limit),
            offset: parseInt(offset)
        });

        const totalPages = Math.ceil(result.count / limit)
        res.status(200).send({ result: result, page, totalPages })
    } catch (error) {
        console.error(error);
        return res.status(400).send({ message: error.message })
    }
}