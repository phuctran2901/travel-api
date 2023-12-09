const { findById } = require('../models/code');
const Code = require('../models/code');
const User = require('../models/user');
exports.getAllCode = async (req, res) => {
    try {
        const code = await Code.find({});
        res.json({
            status: 'success',
            code
        })
    }
    catch (err) {
        res.json({
            status: 'failed',
            errors: err
        })
    }
}

exports.createCode = async (req, res) => {
    try {
        const { userID } = req.user;
        const admin = await User.findById(userID);
        if (admin.role === 'admin') {
            const code = await Code.create({
                code: req.body.code,
                discount: req.body.discount,
                type: req.body.type
            });
            res.json({
                status: 'success',
                code
            })
        }
        else res.json({
            messenger: "Không đủ quyền"
        })
    }
    catch (err) {
        res.json({
            status: 'failed',
            errors: err
        })
    }
}

exports.deleteOneCode = async (req, res) => {
    try {
        const { userID } = req.user;
        const admin = await User.findById(userID);
        if (admin.role === 'admin') {
            await Code.findByIdAndDelete(req.params.id);
            res.json({
                status: "success"
            })
        }
        else {
            res.json({
                messenger: "Không đủ quyền"
            })
        }
    }
    catch (err) {

    }
}

exports.getOneCode = async (req, res) => {
    try {
        const { id } = req.params;
        const code = await Code.findById(id);
        res.json({
            status: "success",
            code
        })
    }
    catch (err) {
        res.json({
            status: "failed"
        })
    }
}

exports.editOneCode = async (req, res) => {
    try {
        const { id } = req.params;
        await Code.findByIdAndUpdate(id, { ...req.body }, { runValidators: true, new: true })
        res.json({
            status: "success"
        })
    }
    catch {

    }
}

exports.checkCode = async (req, res) => {
    try {
        const { code } = req.body;
        const coupon = await Code.findOne({ code: code });
        if (coupon) {
            res.json({
                status: "success",
                coupon
            })
        } else {
            res.json({
                status: "failed",
                messenger: "Mã giảm giá không tồn tại"
            })
        }
    }
    catch (err) {

    }
}