const express = require('express');
const {
    createProduct,
    getProducts,
  } = require('../controllers/productController');
const { 
    getCategories, 
    createCategory, 
    updateCategory, 
    deleteCategory } = require('../controllers/categoryController'); 
const {
    registerCustomerWithEmailAndPassword, 
    checkEmail} = require("../controllers/CustomerController");
const { GetCountryOfOrigins, CreateCountryOfOrigin } = require('../controllers/countryOfOrigins');

const { getAllProductType, createProductType, deleteProductType } = require('../controllers/productTypeController');

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
const { createEmployee, getAllEmployee } = require('../controllers/EmployeeController');


const router = express.Router();





//router warranty
router.get('/warranty-policies', getAllWarrantyPolicy);
router.post('/create-warranty-policies', createWarrantyPolicy);
router.delete('/delete-warranty-policies', deleteWarrantyPolicy);
router.patch('/update-warranty-policies', updateWarrantyPolicy);



//router product type
router.get('/product-types', getAllProductType);
router.post('/create-product-types', createProductType);
router.delete('/delete-product-types', deleteProductType);

//router manufacturer
router.get('/manufacturers', getManufacturers);
router.post('/create-manufacturers', createManufacturer);
router.patch('/update-manufacturers', updateManufacturer);
router.delete('/delete-manufacturers', deleteManufacturer);

//router product
router.get('/products', getProducts)

//router category
router.get('/categories', getCategories);
router.post('/create-categories', createCategory);
router.patch('/update-categories', updateCategory);
router.delete('/delete-categories', deleteCategory);

//router customer
router.post('/register', registerCustomerWithEmailAndPassword);
router.get('/check-email', checkEmail);

//router country of origin
router.get('/country-of-origin', GetCountryOfOrigins);
router.post('/create-country-of-origin', CreateCountryOfOrigin);



//#region Admin
//router Admin

//router Employee
router.post('/create-employee', createEmployee);
router.get('/employees', getAllEmployee);
//router position
router.get('/positions', getAllPosition);




//#endregion









module.exports = router;