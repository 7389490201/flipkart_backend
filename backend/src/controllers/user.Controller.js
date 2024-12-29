const User = require("../models/user.Model")
const jwt = require("jsonwebtoken")

exports.signUp = (req, res) => {
    User.findOne({ email: req.body.email })
        .then((user) => {
            if (user) {
                return res.status(400).json({ message: "User is already exist" })
            }
            if (!user) {
                const { firstName, lastName, email, password, username } = req.body;
                const _user = new User({ firstName, lastName, email, password, username: Math.random().toString().substring(2, 10) })
                _user.save()
                    .then((data) => {
                        return res.status(201).json({ message: data })
                    }).catch((err) => {
                        return res.status(400).json({ message: err })
                    })
            }
        }).catch((err) => {
            return res.status(500).json({ message: err })
        })
}

exports.signIn = (req, res) => {
    User.findOne({ email: req.body.email })
        .then((user) => {
            if (!user) {
                return res.status(404).json({ message: "Invalid Email" })
            }
            if (user.authenticate(req.body.password)) {
                const token = jwt.sign({ id: user._id, role: user.role }, process.env.SECRET_KEY);
                const { _id, firstName, lastName, email, fullName, role } = user;
                return res.status(200).json({
                    token,
                    user: { _id, firstName, lastName, email, fullName, role }
                })
            } else {
                return res.status(400).json({ message: "Invalid Password" })
            }
        }).catch((err) => {
            return res.status(500).json({ message: "Internal Server Error" + err })
        })
}

exports.adminSignup = (req, res) => {
    User.findOne({ email: req.body.email })
        .then((user) => {
            if (user) {
                return res.status(400).json({ message: "Admin is already exist" })
            }
            if (!user) {
                const { firstName, lastName, email, password, username } = req.body;
                const _user = new User({
                    firstName,
                    lastName,
                    email,
                    password,
                    username: Math.random().toString().substring(2, 10),
                    role:"admin"
                })
                _user.save()
                    .then((data) => {
                        return res.status(201).json({ message: data })
                    }).catch((err) => {
                        return res.status(400).json({ message: err })
                    })
            }
        }).catch((err) => {
            return res.status(500).json({ message: err })
        })
}