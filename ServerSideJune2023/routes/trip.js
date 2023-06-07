const express = require('express');
const { readTrip, createTrip, deleteTrip, updateTrip } = require('../models/trip');
const router = express.Router();


router.get('/addnew', async(req, res) => {

    res.render('personform')


})


router.post('/addnew', async(req, res) => {



    await createTrip(req.body);
    req.session.flash = {
        type: 'success',
        intro: 'Data Saved:',
        message: "Data for <strong>" +
            req.body.name + "</strong> has been added"
    };
    res.redirect(303, 'trip')


})



router.get('/:name', async(req, res) => {
    var name = req.params.name;

    const person = await readTrip({ 'name': name })

    if (!person) {
        console.log('404 because trip doesn\'t exist');
        res.render('404');
    } else {
        res.render('person', { person: person });
    }
})

router.get('/:name/delete', async(req, res) => {
    var name = req.params.name;

    await deleteTrip(name);

    res.redirect(303, '/trip');

});

router.get('/:name/edit', async(req, res) => {

    var name = req.params.name;

    const person = await readTrip({ 'name': name })

    if (!person) {
        console.log('404 because person doesn\'t exist');
        res.render('404');
    } else {
        res.render('edittripform', { person: person });
    }
})

router.post('/:name/edit', async(req, res) => {

    await updateTrip(req.body);

    req.session.flash = {
        type: 'success',
        intro: 'Data Updated:',
        message: "Data for <strong>" +
            req.body.name + "</strong> has been updated"
    };



    res.redirect(303, '/trip')

})





router.get('/', async(req, res) => {
    const trip = await readTrip();

    // console log to see object response
    console.log('[routes/trip.js] readtrip() :', trip)

    if (req.session.staffdata) {
        var newName = req.session.staffdata.name;
    } else {
        var newName = ""
    }

    res.render('listing', { personlist: trip })

})




module.exports = router;