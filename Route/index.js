const express = require('express');
const router = express.Router();


//Controller Import 
const { signup } = require('../Conntroller/Signup');
const { login } = require('../Conntroller/Login');
const { AddProduct,ApprovePost,GetAllApprovedPost,GetAllApprovedPostAdmin,GetAllProducts } = require('../Conntroller/Product');
const {placeOrder,approveRejectOrder}  = require("../Conntroller/Orders")
// const {ApprovePost} = require("../Conntroller/Product")
// const {GetAllApprovedPost} = require("../Conntroller/Product")


// MiddelWare Import
const {verifyAdminToken,verifySubadminToken,verifyUserToken} = require("../MiddelWare/TokenVaerification")
const {upload} = require("../MiddelWare/Multer")


// stripe
const {processPayment,confirmPayment} = require("../Conntroller/Strippe")
// Signup route
router.post('/signup', signup);
router.post('/login', login);   
router.post('/AddProduct',verifyAdminToken,upload, AddProduct);
router.put('/posts/:postId/approve',verifyAdminToken, ApprovePost);
router.post('/GetAllApprovedPostAdmin',verifyAdminToken, GetAllApprovedPostAdmin);
router.get('/GetAllProducts', GetAllProducts);
router.get('/GetAllApprovedPost', GetAllApprovedPost);
router.post('/Checkout',verifyUserToken, placeOrder);
router.post('/approveRejectOrder',verifyAdminToken, approveRejectOrder);
router.post('/processPayment',verifyUserToken, processPayment);
router.post('/confirmPayment',verifyUserToken, confirmPayment);

module.exports = router;
