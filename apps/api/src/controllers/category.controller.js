import Category from '../models/category.model'

export const addCategory = async (req, res) => {
    try{
        const { name } = req.body;

        const findCategory = await Category.findOne({
            where:{
                name: name
            }
        })

        if(findCategory){
            return res.status(400).send({message: 'Category is alread exist'})
        }

        await Category.create({
            name: name
        })

        return res.status(200).send({message: 'A new category has been added successfully'})
    }catch(error){
        console.error(error)
        res.status(500).send({message: error.message})
    }
}

export const getAllCategory = async (req, res) => {
    try{
        const { page, sortBy = 'createdAt', sortOrder = 'asc' } = req.query;
        const limit = 5;
        const offset = (page - 1) * limit;

        const allCategory = await Category.findAll({
            order: [[sortBy, sortOrder.toUpperCase()]],
            limit: parseInt(limit),
            offset: parseInt(offset),
        });
        return res.status(200).send({result: allCategory})
    }catch(error){
        console.error(error)
        return res.status(500).send({message: error.message})
    }
}

export const deleteCategory = async (req, res) => {
    try{
        const id = req.params.id;
        const findCategory = await Category.findOne({
            where: {
                id: id
            }
        })
        if(!findCategory){
            return res.status(404).send({message: 'Category not found'})
        }
        await Category.destroy({
            where: {
                id: id
            }
        })
        return res.status(200).send({message: 'Category has been deleted'})
    }catch(error){
        console.error(error)
        return res.status(500).send({message: error.message})
    }
}

export const updateCategory = async (req, res) => {
    try{
        const {id, name} = req.body

        const findCategory = await Category.findOne({
            where: {
                id: id
            }
        })

        if(!findCategory){
            return res.status(404).send({message: 'Category not found'})
        }

        await Category.update(
            {
                name: name
            },
            {
                where: {
                    id : id
                }
            }   
        )
        return res.status(200).send({message: 'Category updated'})
    }catch(error){
        console.error(error)
        res.status(500).send({message: error.message})
    }
}