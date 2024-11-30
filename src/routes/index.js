const express = require('express');
const {
    createProduct,
    getProducts,
    SearchProduct,
    getProductsByIdCategory,
    getProductsById,
    getLowStockProucts,
    getDiscontinuedProducts,
    deleteProduct,
    updateProduct,
    reView,
    getProductsByManufacturer,
  } = require('../controllers/productController');
const { 
    getCategories, 
    updateCategory, 
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
    updateWarrantyPolicy,
    getWarrantyPolicyById
} = require('../controllers/WarrantyPolicy');

const {
    getAllPosition,
} = require('../controllers/PositionController');
const { createEmployee, getAllEmployee, LoginEmployee, updatePassword, deleteEmployeeById, LockEmployee, UnLockEmployee, updateEmployee, resetPassword } = require('../controllers/EmployeeController');
const { getPromotionById, createPromotion, deletePromotion, updatePromotion, getAllPromotion, getPromotionByCode } = require('../controllers/PromotionController');
const { getAllMethodPayment, updateStatusMethodPayment } = require('../controllers/PaymentMethodController');
const { getAllOrders, getOrderById, getNewOrders, updateOrderStatus, getShipingOrders, getPackingOrders, getCompleteOrders, getOrdersByIdCustomer, getOrderCustomerDetail, createOrder } = require('../controllers/OrderController');
const { revenueByDate, revenueByWeek, revenueByMonth, revenueByYear, customRangeRevenue } = require('../controllers/RevenueController');
const { getAllSupplier, addSupplier, updateSupplier, updateSupplierStatus, getSupplierById, getSupplier } = require('../controllers/SupplierController');
const { getDeliveryReceipts, createDeliveryReceipt, getDeliveryReceiptDetails, updateDeliveryReceipt, updateStatusDeliveryreceipt } = require('../controllers/DeliveryreceiptController');
const { getAddressByIdCustomer, deleteAddress, updateAddress, addAddress } = require('../controllers/AdressUserController');


const router = express.Router();





//router warranty
router.get('/get-warranty-policies', getWarrantyPolicyById);
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
router.post('/create-product', createProduct);
router.get('/products', getProducts)
router.get('/search-products', SearchProduct);
router.get('/get-product-by-id-category', getProductsByIdCategory);
router.get('/get-product-by-id', getProductsById);
router.get('/get-low-stock-products', getLowStockProucts);
router.get('/get-discontinued-products',getDiscontinuedProducts);
router.delete('/delete-product',deleteProduct);
router.put('/update-product',updateProduct);
router.get('/get-products-by-id-manufacturer', getProductsByManufacturer);
//router category
router.get('/categories', getCategories);
router.put('/update-categories', updateCategory);
router.get('/get-category-by-id', getCategoryById);
router.get('/get-all-manufacturer-Of-Product-By-Category',getAllManufacturerOfProduct);

//router promotion
router.get('/promotions-by-id', getPromotionById);
router.post('/create-promotion', createPromotion);
router.delete('/delete-promotion', deletePromotion);
router.put('/update-promotion', updatePromotion);
router.get('/get-all-promotion', getAllPromotion);
router.get('/get-promotion-by-code',getPromotionByCode);
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

//router order
router.get('/get-orders-by-id-customer',getOrdersByIdCustomer);
router.get('/get-order-customer-detail',getOrderCustomerDetail);
router.post('/re-view',reView);
router.post('/create-order',createOrder);


//router shippingAddress
router.get('/get-address-by-id-customer',getAddressByIdCustomer);
router.post('/create-address',addAddress);
router.put('/update-address',updateAddress);
router.delete('/delete-address',deleteAddress);

//#region Admin
//router Admin



//router order
router.get('/orders', getAllOrders);
router.get('/get-order-by-id', getOrderById);
router.get('/new-orders', getNewOrders);
router.post('/update-order-status', updateOrderStatus);
router.get('/shiping-orders', getShipingOrders);
router.get('/packing-orders',getPackingOrders);
router.get('/get-complete-orders',getCompleteOrders);
//router Employee
router.post('/create-employee', createEmployee);
router.get('/employees', getAllEmployee);
router.post('/login-employee', LoginEmployee);
router.put('/update-password', updatePassword);
router.delete('/delete-employee-by-id', deleteEmployeeById);
router.post('/lock-employee', LockEmployee);
router.post('/unlock-employee', UnLockEmployee);
router.put('/update-employee', updateEmployee);
router.put('/reset-password', resetPassword);
//router position
router.get('/positions', getAllPosition);

//router method Payment
router.get('/method-payment', getAllMethodPayment);
router.post('/update-status-method-payment', updateStatusMethodPayment);

router.get('/revenue-by-date', revenueByDate);
router.get('/revenue-by-week', revenueByWeek);
router.get('/revenue-by-month', revenueByMonth);
router.get('/revenue-by-year', revenueByYear);
router.get('/custom-range-revenue', customRangeRevenue);



// router supplier
router.get('/suppliers', getAllSupplier);
router.post('/create-supplier', addSupplier);
router.put('/update-supplier', updateSupplier);
router.patch('/update-supplier-status', updateSupplierStatus);
router.get('/get-supplier-by-id', getSupplierById);
router.get('/get-supplier', getSupplier);


router.get('/get-delivery-receipt', getDeliveryReceipts);
router.get('/get-delivery-receipt-by-id', getDeliveryReceiptDetails);
router.post('/create-delivery-receipt',createDeliveryReceipt);
router.put('/update-delivery-receipt',updateDeliveryReceipt);
router.put('/update-status-delivery-receipt',updateStatusDeliveryreceipt);









//#endregion









module.exports = router;