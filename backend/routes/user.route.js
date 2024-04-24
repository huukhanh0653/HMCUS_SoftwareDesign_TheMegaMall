const express = require('express')
const router = express.Router();
const userController = require('../controllers/user.controller')
// const middleware = require('../middeware/auth')

router
    .get('/', userController.getAllUsers)
    // .get(middleware.isLoggedAdmin, userController.getAllUsers)

router
    .post('/create/createAll', userController.createAllUser);
    // .post(middleware.isLoggedAdmin, userController.createAllUser);

router
    .post('/create/newUser',userController.createUser);    
    // .post(middleware.isLoggedAdmin,userController.createUser);    

router
    .get('/search/product', userController.searchProduct)
    // .get(userController.searchProduct)
    
router
    .get('/information/user', userController.getInfo);
    // .get(userController.getInfo);

router
    .get('/:slug',userController.getUser)
    .patch('/:id', userController.updateUser)
    .delete('/:id',userController.deleteUser);
    // .get(middleware.isLoggedAdmin,userController.getUser)
    // .patch(middleware.isLogged, userController.updateUser)
    // .delete(middleware.isLoggedAdmin,userController.deleteUser);

    
module.exports = router;