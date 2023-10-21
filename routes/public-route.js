const router = require('express').Router();
const countryController = require('../controllers/country-controller');
const stateController = require('../controllers/state-controller');
const cityController = require('../controllers/city-controller');
const brandController = require('../controllers/brand-controller');
const categoryController = require('../controllers/category-controller');
const productController = require('../controllers/product-controller');
const am = require('../middlewares/async-middleware');
const bannerController = require('../controllers/banner-controller');
const paymentMethodController = require('../controllers/payment-method-controller');

//Countries
router.get('/countries', am(countryController.findCountries));

//States
router.get('/states/:countryId', am(stateController.findStates));

//Cities
router.get('/cities/:stateId', am(cityController.findCities));

//Brands
router.get('/brands', am(brandController.findBrands));
router.get('/brand/:id', am(brandController.findBrand));

//Categories
router.get('/categories', am(categoryController.findCategories));
router.get('/categories/:id', am(categoryController.findCategories));
router.get('/category/:id', am(categoryController.findCategory));

//Products
router.get('/products', am(productController.findProducts));
router.get('/products/:type', am(productController.findProducts));
router.get('/product/:id', am(productController.findProduct));


//Banners
router.get('/banners', am(bannerController.findBanners));
router.get('/banner/:id', am(bannerController.findBanner));

//Payments
router.get('/payment-methods', am(paymentMethodController.findPaymentMethods));
router.get('/payment-method/:id', am(paymentMethodController.findPaymentMethod));



module.exports = router;