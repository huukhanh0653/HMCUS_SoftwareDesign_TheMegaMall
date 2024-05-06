const jwt = require('jsonwebtoken');
const User = require('../models/user.model')
const bcrypt = require('bcrypt');
const dotenv = require('dotenv')
const path = require('path');
const https = require('https');
const fs = require('fs');

dotenv.config({
    path: path.join(__dirname, '..', 'config.env')
});

exports.fail = (req, res) => {
    res.status(401).json({
        status: "failed",
    })
}

exports.success = (req, res) => {
    const id = req.user._id;
    const token = jwt.sign({
        id
    }, process.env.KEY_TOKEN, {
        expiresIn: '5h'
    });
    res.cookie('token', token, {
        expires: new Date(Date.now() + 30 * 1000)
    });
    res.redirect('http://localhost:5173')
}

exports.successLocal = (req, res) => {
    const id = req.user._id;
    const token = jwt.sign({
        id
    }, process.env.KEY_TOKEN, {
        expiresIn: '5h'
    });
    res.cookie('token', token, {
        expires: new Date(Date.now() + 30 * 1000)
    });
    res.json({
        "token": token
    })
}

exports.signup = async (req, res) => {
    try {
        const {
            userName,
            password,
            confirmpassword
        } = req.body;
        if (!userName || !password || !confirmpassword) {
            return res.status(400).json({
                status: "fail",
                msg: "Please fill all the information",
            });
        }
        const isTaken = await User.findOne({
            "userName": userName
        });
        if (isTaken) {
            return res.status(400).json({
                status: "fail",
                msg: "Email is already taken",
            });
        }

        if (password != confirmpassword) {
            return res.status(400).json({
                status: "fail",
                msg: "Confirm password and password don't match",
            });
        }

        if (password.length < 6) {
            return res.status(400).json({
                status: "fail",
                msg: "password must be at least 6 characters long",
            });
        }

        const NewBody = {
            userName: userName,
            password: password,
        }
        const fullName = NewBody.userName.split("@")[0]
        const saltRounds = 10
        bcrypt.hash(NewBody.password, saltRounds, async function (err, hash) {
            if (err) {
                return next(err);
            }
            const newUser = await User.create({
                userName: NewBody.userName,
                fullName: fullName,
                password: hash
            });
            
            const options = {
                hostname: 'localhost',
                port: 3001,
                path: '/api/v1/payment/create',
                method: 'POST',
                ca: fs.readFileSync('./openssl/cert.pem', 'utf8'),
                headers: {
                    'creatatial': 'true',
                    'Content-Type': 'application/json'
                }
            };
            
            const req = https.request(options);
            req.on('error', (error) => {
                console.error(error);
            });
            req.write(JSON.stringify({
                id: newUser._id
            }));
            req.end();
            
            res.status(201).json({
                status: 'success',
                data: {
                    user: newUser
                }
            })
        })

    } catch (err) {
        res.status(400).json({
            status: "fail",
            msg: err
        })
    }
}