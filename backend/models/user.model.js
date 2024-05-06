const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const userSchema = new Schema({
    userName: {
        type: String,
        require: [true, 'A User must have a userName']
    },
    password: {
        type: String,
        require: [true, 'A User must have a password']
    },
    role: {
        type: String,
        default: 'user',
        require: [true, 'A User must have a role']
    },
    fullName: {
        type: String,
        default: 'No Name'
    },
    type: {
        type: String,
        default: 'local'
    },
    birthday: {
        type: Date
    },
    gender: {
        type: String
    },
    phoneNumber: {
        type: String
    },
    address: {
        type: String
    },
    imageAvatar: {
        type: String,
        default: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBXqRKXezHfKsAvXX2HOz0QO_5dvdAj5s0Bg&usqp=CAU"
    },
    cart: [{
        product_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product'
        },
        quantity: Number
    }],
    balance: [{
        payment_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Payment'
        },
        balance: {
            type: Number,
            default: 0
        }
    }],
    accountPayment: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Payment',
        default: null
    },
    transaction: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Transaction',
        }
    ],
    totalMoneyTransaction: {
        type: Number,
        default: 0
    },
}, { timestamps: true })

const User = mongoose.model('Users', userSchema);

module.exports = User;
