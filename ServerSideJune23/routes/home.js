const express = require('express');
const router = express.Router();

router.get('/',  (req, res) => {

    var message = "";
     
    if (req.signedCookies.tracking){
        var dateLastVisit = req.signedCookies.tracking;
        var message = "Welcome back :" + req.signedCookies.tracking;
    }

    var currentDate = new Date();

    res.cookie ('tracking', currentDate.toUTCString(), {signed: true});
    res.render('main', {'message': message});
});



//main page
router.get('/', (req, res) => {
    res.render("main");

});

//about page
router.get('/person', (req, res) => {
    res.render("person");

});

//contact page
router.get('/contact', (req, res) => {
    res.render("contact");

});

//blog page
router.get('/blog', (req, res) => {
    res.render("blog");

});

module.exports = router;