import Customer from '../models/customer.model';
import CustomerAddress from '../models/customeraddress.model'

export const getAll = async (req, res) => {
    try {
        const result = await CustomerAddress.findAll({
            include: [
                {
                    model: Customer,
                    attributes: ['email']
                }
            ]
        })
        res.status(200).send({ result: result })
    } catch (error) {
        console.log(error);
        res.status(400).send({ message: error.message })
    }
}

export const addressCreate = async (req, res) => {
    try {
        const { title, customerAddressName, phoneNumber, address, longitude, latitude } = req.body

        const findAddress = await CustomerAddress.findOne({
            where: {
                address,
                CustomerId: req.user.id
            }
        });

        if (findAddress == null) {
            const result = await CustomerAddress.create({
                ...req.body,
                CustomerId: req.user.id
            }, {
                include: [
                    {
                        model: Customer,
                        attributes: ['email']
                    }
                ]
            })

            return res.status(200).send({ message: "Success adding new address to your profile!", result: result })

        } else {
            console.log("Address is already on your address list");
            return res.status(400).send({ message: "Address is already on your address list" })
        }

    } catch (error) {
        console.log(error);
        res.status(400).send({ message: error.message })
    }
}

export const addressEdit = async (req, res) => {
    try {
        const { title, customerAddressName, phoneNumber, address, longitude, latitude } = req.body

        await CustomerAddress.update({
            ...req.body,
        }, {
            where: {
                CustomerId: req.user.id,
                id: req.params.id
            }
        })
        res.status(200).send({ message: "Success updating your address" })

    } catch (error) {
        console.log(error);
        res.status(400).send({ message: error.messsage })
    }
}

export const getAllByCustomerId = async (req, res) => {
    try {
        const result = await CustomerAddress.findAll({
            where: {
                CustomerId: req.user.id
            },
            order: [
                ['isDefault', 'DESC']
            ]
        })
        res.status(200).send({ result: result })
    } catch (error) {
        console.log(error);
        res.status(400).send({ message: error.message })
    }
}

export const deleteById = async (req, res) => {
    try {
        await CustomerAddress.destroy({
            where: {
                CustomerId: req.user.id,
                id: req.params.id
            },
        })
        res.status(200).send({ message: "Success deleting an address from the list" })
    } catch (error) {
        console.log(error);
        res.status(400).send({ message: error.message })
    }
}

export const setDefaultAddress = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user.id

        const currentDefaultAddress = await CustomerAddress.findOne({
            where: {
                CustomerId: userId,
                isDefault: true
            }
        })

        if (currentDefaultAddress) {
            await currentDefaultAddress.update({ isDefault: false })
        }

        const newDefaultAddress = await CustomerAddress.update({
            isDefault: true
        }, {
            where: {
                CustomerId: userId,
                id: id
            }
        })
        res.status(200).send({ message: "Your Default Address has been updated" })
    } catch (error) {
        console.log(error);
        res.status(400).send({ message: error.message })
    }
}
