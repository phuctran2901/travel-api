
const User = require('../models/user');
const Type = require('../models/type');
const NXB = require('../models/nxb');


exports.createType = async (req, res) => {
    try {
        const { userID } = req.user;
        const admin = await User.findById(userID)
        if (admin.role === 'admin') {
            await Type.create({ ...req.body }, (err, result) => {
                if (result) {
                    res.json({
                        status: "success",
                        result
                    })
                }
            })
        }
    }
    catch (err) {

    }
}


exports.getAllType = async (req, res) => {
    try {
        const types = await Type.find({});
        res.json({
            status: "success",
            types
        })
    }
    catch (err) {

    }
}

exports.deleteNXB = async (req, res) => {
    try {
        const { id } = req.params;
        const { userID } = req.user;
        const admin = await User.findById(userID);
        if (admin.role === 'admin') {
            const d = await NXB.findByIdAndDelete(id);
            res.json({
                status: "success",
                d
            })
        }
        else {
            res.json({
                status: "failed",
                messenger: "Bạn không đủ quyền"
            })
        }
    }
    catch (err) {

    }
}

exports.getAllNXB = async (req, res) => {
    try {
        const nxb = await NXB.find({});
        res.json({
            status: "success",
            nxb
        })
    }
    catch (err) {

    }
}

exports.createNXB = async (req, res) => {
    try {
        const { userID } = req.user;
        const admin = await User.findById(userID)
        if (admin.role === 'admin') {
            await NXB.create({ ...req.body }, (err, result) => {
                if (result) {
                    res.json({
                        status: "success",
                        result
                    })
                }
            })
        }
    }
    catch (err) {

    }
}

exports.deleteType = async (req, res) => {
    try {
        const { id } = req.params;
        const { userID } = req.user;
        const admin = await User.findById(userID);
        if (admin.role === 'admin') {
            const d = await Type.findByIdAndDelete(id);
            res.json({
                status: "success",
                d
            })
        }
        else {
            res.json({
                status: "failed",
                messenger: "Bạn không đủ quyền"
            })
        }
    }
    catch (err) {

    }
}