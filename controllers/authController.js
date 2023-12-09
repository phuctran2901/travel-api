const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bycript = require('bcryptjs');
exports.register = async (req, res, next) => {
    try {
        const email = await User.find({ email: req.body.email });
        if (email.length !== 0) {
            res.json({
                status: "failed",
                messenger: "Email đã có người sử dụng"
            });
            res.end();
        }
        const newUser = await User.create({ ...req.body });
        if (!newUser) {
            res.json({
                status: "failed",
                messenger: "Đăng ký tài khoản thất bại"
            })
            res.end();
        } else {
            bycript.hash(newUser.password, 10, function (err, hash) {
                if (err) {
                    res.json({
                        status: "failed",
                        messenger: "Đăng ký tài khoản thất bại!"
                    })
                    return;
                }
                newUser.password = hash;
                newUser.save(function (err, result) {
                    const token = jwt.sign({ userID: result._id }, process.env.APP_SECERT);
                    res.json({
                        status: "success",
                        user: result,
                        token
                    })
                });
            })
        }

    }
    catch (err) {
        console.log("Err", err)
    }
}


exports.login = async (req, res, next) => {
    try {
        const user = await User.findOne({ email: req.body.email })
            .populate("cart.product");
        if (!user) {
            res.json({
                status: 'failed',
                messenger: 'Email không hợp lệ'
            })
            return;
        }
        if (bycript.compareSync(req.body.password, user.password)) {
            const token = jwt.sign({ userID: user.id }, process.env.APP_SECERT);
            const subTotal = user.cart.reduce((total, cart) => {
                let price = cart.product.sale > 0 ? cart.product.price - (cart.product.sale / 100 * cart.product.price) : cart.product.price;
                return total + price * cart.quantity;
            }, 0);
            res.status(200).json({
                status: "success",
                token: token,
                user: {
                    _id: user._id,
                    cart: user.cart,
                    email: user.email,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    role: user.role,
                    phone: user.phone,
                    image: user.image,
                    address: user.address
                },
                subTotal
            })
        }
        else {
            res.json({
                status: "failed",
                messenger: "Sai email hoặc mật khẩu"
            })
        }
    }
    catch (err) {
        console.log("Err", err)
    }
}

exports.getCurrentUser = async (req, res, next) => {
    try {
        const { userID } = req.user;
        if (userID) {
            const user = await User.findById(userID)
                .populate("cart.product");
            const subTotal = user.cart.reduce((total, cart) => {
                let price = cart.product.sale > 0 ? cart.product.price - (cart.product.sale / 100 * cart.product.price) : cart.product.price;
                return total + price * cart.quantity;
            }, 0);
            res.status(200).json({
                status: 'success',
                user,
                subTotal
            })
        }
    }
    catch (err) {
    }
}

exports.loginAdmin = async (req, res, next) => {
    try {
        const { password, email } = req.body;
        const user = await User.findOne({ email: email });
        if (!user) {
            res.json({
                status: 'failed',
                messenger: "Không tìm thấy email"
            })
            return;
        }
        if (bycript.compareSync(password, user.password)) {
            if (user.role === 'admin') {
                const token = jwt.sign({ userID: user.id }, process.env.APP_SECERT);
                res.status(200).json({
                    status: "success",
                    token: token,
                    user: {
                        id: user._id,
                        cart: user.cart,
                        email: user.email,
                        firstName: user.firstName,
                        lastName: user.lastName,
                        role: user.role,
                        phone: user.phone,
                        address: user.address,
                        image: user.image
                    }
                })
            }
        }
        else {
            res.json({
                status: "failed",
                messenger: "Sai tài khoản hoặc mật khẩu"
            })
        }
    }
    catch (err) {
        console.log("Err", err)
    }
}