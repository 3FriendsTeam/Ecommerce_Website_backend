const express = require('express');
const {
    createProduct,
    getProducts,
    SearchProduct,
  } = require('../controllers/productController');
const { 
    getCategories, 
    createCategory, 
    updateCategory, 
    deleteCategory, 
    getCategoryById,
    getAllManufacturerOfProduct} = require('../controllers/categoryController'); 
const {
    registerCustomerWithEmailAndPassword, 
    checkEmail,
    getCustomerInfo,
    updateCustomerInfo,
    getAllCustomer,
    LockCustomer,
    UnLockCustomer} = require("../controllers/CustomerController");
const { GetCountryOfOrigins, CreateCountryOfOrigin } = require('../controllers/countryOfOrigins');


const {
    createManufacturer,
    getManufacturers,
    deleteManufacturer,
    updateManufacturer} = require('../controllers/ManufacturersController');

const{
    createWarrantyPolicy,
    getAllWarrantyPolicy,
    deleteWarrantyPolicy,
    updateWarrantyPolicy
} = require('../controllers/WarrantyPolicy');

const {
    getAllPosition,
} = require('../controllers/PositionController');
const { createEmployee, getAllEmployee, LoginEmployee, updatePassword, deleteEmployeeById, LockEmployee, UnLockEmployee } = require('../controllers/EmployeeController');
const { getPromotionById } = require('../controllers/PromotionController');


const router = express.Router();





//router warranty
router.get('/warranty-policies', getAllWarrantyPolicy);
router.post('/create-warranty-policies', createWarrantyPolicy);
router.delete('/delete-warranty-policies', deleteWarrantyPolicy);
router.patch('/update-warranty-policies', updateWarrantyPolicy);

//router manufacturer
router.get('/manufacturers', getManufacturers);
router.post('/create-manufacturers', createManufacturer);
router.patch('/update-manufacturers', updateManufacturer);
router.delete('/delete-manufacturers', deleteManufacturer);

//router product
router.get('/products', getProducts)
router.get('/search-products', SearchProduct);
//router category
router.get('/categories', getCategories);
router.post('/create-categories', createCategory);
router.patch('/update-categories', updateCategory);
router.delete('/delete-categories', deleteCategory);
router.get('/get-category-by-id', getCategoryById);
router.get('/get-all-manufacturer-Of-Product-By-Category',getAllManufacturerOfProduct);

//router promotion
router.get('/promotions-by-id', getPromotionById);



//router customer
router.post('/register', registerCustomerWithEmailAndPassword);
router.get('/check-email', checkEmail);
router.get('/get-customer-info', getCustomerInfo);
router.post('/update-customer-info', updateCustomerInfo);
router.get('/get-all-customer', getAllCustomer);
router.post('/lock-customer',LockCustomer);
router.post('/unlock-customer',UnLockCustomer);
//router country of origin
router.get('/country-of-origin', GetCountryOfOrigins);
router.post('/create-country-of-origin', CreateCountryOfOrigin);



//#region Admin
//router Admin

//router Employee
router.post('/create-employee', createEmployee);
router.get('/employees', getAllEmployee);
router.post('/login-employee', LoginEmployee);
router.put('/update-password', updatePassword);
router.delete('/delete-employee-by-id', deleteEmployeeById);
router.post('/lock-employee', LockEmployee);
router.post('/unlock-employee', UnLockEmployee);
//router position
router.get('/positions', getAllPosition);




//#endregion









module.exports = router;