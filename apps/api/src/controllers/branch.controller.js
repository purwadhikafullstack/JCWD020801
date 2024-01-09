import Branch from '../models/branch.model'
import Admin from '../models/admin.model'
const { Op } = require('sequelize');
require("dotenv").config();
// import { sequelize }
const Sequelize = require('sequelize')

export const getAll = async (req, res) => {
    try {
        const result = await Branch.findAll({
            include: [
                {
                    model: Admin,
                    attributes: ['name', 'username', 'email']
                }
            ]
        })
        res.status(200).send({ result })
    } catch (error) {
        console.log(error);
        res.status(400).send({ message: error.message })
    }
}

export const getSuperStore = async (req, res) => {
    try {
        const result = await Branch.findOne({
            where: {
                isSuperStore: true
            }
        })
        res.status(200).send({ result })
    } catch (error) {
        console.log(error);
        res.status(400).send({ message: error.message })
    }
}

export const getById = async (req, res) => {
    try {
        const result = await Branch.findOne({
            where: {
                id: req.params.id
            },
            include: [
                {
                    model: Admin,
                    attributes: ['name', 'username', 'email']
                }
            ]
        })
        res.status(200).send({ result })
    } catch (error) {
        console.log(error);
        res.status(400).send({ message: error.message })
    }
}

export const addBranch = async (req, res) => {
    try {
        const { name, address, contactNumber, latitude, longitude, AdminId } = req.body

        const findBranch = await Branch.findOne({
            where: {
                address
            }
        })

        if (findBranch == null) {
            const result = await Branch.create({
                ...req.body,
            })

            return res.status(200).send({ message: "Success adding a new branch", result: result })

        } else {
            console.log("Branch with this address is already listed");
            return res.status(400).send({ message: "Branch with this address is already listed" })
        }

    } catch (error) {
        console.log(error);
        res.status(400).send({ message: error.message })
    }
}

export const editBranch = async (req, res) => {
    try {
        const { name, address, contactNumber, latitude, longitude, AdminId } = req.body

        const findBranch = await Branch.findOne({
            where: {
                address
            }
        })

        if (findBranch == null) {
            await Branch.update({
                ...req.body,
            }, {
                where: {
                    id: req.params.id,
                }
            })
            return res.status(200).send({ message: "Success updating branch data" })
        } else {
            return res.status(400).send({ message: "This address has been listed" })
        }

    } catch (error) {
        console.log(error);
        res.status(400).send({ message: error.message })
    }
}

export const changeStatus = async (req, res) => {
    try {
        const branchData = await Branch.findOne({
            where: {
                id: req.params.id
            }
        })

        if (branchData) {
            const updatedStatus = !branchData.isActive

            await branchData.update({ isActive: updatedStatus })
            return res.status(200).send({ message: "Branch status updated successfully" })
        } else {
            return res.status(404).send({ message: 'Branch not found' });
        }
    } catch (error) {
        console.log(error);
        res.status(400).send({ message: error.message })
    }
}

export const getNearestBranch = async (req, res) => {
    try {
        const { latitude, longitude } = req.query;

        const nearestBranch = await Branch.findOne({
            attributes: [
                'id',
                'name',
                'longitude',
                'latitude',
                [
                    Sequelize.fn(
                        'ST_Distance_Sphere',
                        Sequelize.literal(`point(${longitude}, ${latitude})`),
                        Sequelize.literal('point(longitude, latitude)'),
                    ),
                    'distance'
                ]
            ],
            order: [
                [
                    Sequelize.fn(
                        'ST_Distance_Sphere',
                        Sequelize.literal(`point(${longitude}, ${latitude})`),
                        Sequelize.literal('point(longitude, latitude)'),
                    ),
                    'ASC'
                ]
            ],
            limit: 1
        });

        // Access the calculated distance from the result
        const result = nearestBranch ? nearestBranch.get({ plain: true }) : null;

        // Sending the result along with the distance
        res.status(200).send({ result: result, distance: result ? result.distance : null });

    } catch (error) {
        console.log(error);
        res.status(400).send({ message: error.message });
    }
};



// -------------------------------
// export const getNearestBranch = async (req, res) => {
//     try {
//         const { latitude: userLat, longitude: userLon } = req.query;

//         const branches = await Branch.findAll({
//             attributes: ['id', 'name', 'latitude', 'longitude'],
//             raw: true,
//         });

//         console.log("Received coordinates:", userLat, userLon);

//         let nearestBranch;
//         let minDistance = Infinity;

//         branches.forEach(branch => {
//             const branchDistance = calculateDistance(userLat, userLon, branch.latitude, branch.longitude);
//             console.log("Branch coordinates:", branch.latitude, branch.longitude, "Distance:", branchDistance);
//             if (branchDistance < minDistance) {
//                 minDistance = branchDistance;
//                 nearestBranch = branch;
//             }
//         });


//         if (nearestBranch) {
//             res.status(200).send({ result: nearestBranch, distance: minDistance });
//         } else {
//             res.status(404).send({ message: 'No branches found' });
//         }
//     } catch (error) {
//         console.log(error);
//         res.status(400).send({ message: error.message })
//     }
// }

// Function to calculate distance between two coordinates using Haversine formula
// const calculateDistance = (lat1, lon1, lat2, lon2) => {
//     const earthRadius = 6371;
//     const dLat = toRadians(lat2 - lat1);
//     const dLon = toRadians(lon2 - lon1);

//     const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
//         Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) *
//         Math.sin(dLon / 2) * Math.sin(dLon / 2);

//     const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
//     const distance = earthRadius * c; // Distance in kilometers
//     return distance;
// }

// const toRadians = (degrees) => { return degrees * (Math.PI / 180) }