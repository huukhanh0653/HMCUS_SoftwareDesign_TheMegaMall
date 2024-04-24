const express = require('express');
const router = express.Router();

const productController = require('../controllers/product.controller')
// const middleware = require('../middeware/auth')

router
    // .route('/')
    // .get(productController.getAllProduct)
    // .post(middleware.isLoggedAdmin,productController.createProduct)
    .get('/', productController.getAllProduct)
    .post('/', productController.createProduct)

router
    // .route('/create/createAll')
    // .post(productController.createAllProduct)
    .post('/create/createAll', productController.createAllProduct)

router
    // .route('/:id')
    // .get(productController.getProduct)
    // .patch(middleware.isLoggedAdmin, productController.updateProduct)
    // .delete(middleware.isLoggedAdmin, productController.deleteProduct)
    .get('/:slug', productController.getProduct)
    .patch('/:id', productController.updateProduct)
    .delete('/:id', productController.deleteProduct)

module.exports = router;