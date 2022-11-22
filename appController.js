const mongoose = require('mongoose');
const Contact = require('./Model/contact');


exports.addNew = async (req, res) => {
    const { name, email, phoneNumber, locality, city, state } = req.body;

    var contact = await Contact.findOne({ phoneNumber });

    if (contact) {
        req.session.error = ' Contact exist already';
        res.redirect('/addNew');
    };

    contact = new Contact({
        name,
        email,
        phoneNumber,
        locality,
        city,
        state
    });

    await contact.save();
    res.send('Contact saved!!!!!')
};

exports.alllisting = (req, res) => {
    Contact.find({}, (err, contacts) => {
        if (err) { throw err }
        res.send(contacts);
    });
};

exports.search = async (req, res) => {
    const phoneNumber = req.query.phoneNumber;

    const contact = await Contact.findOne({ phoneNumber });

    if (!contact) {
        req.session.error = 'Contact does not found!';
        res.redirect('/search');
    }

    res.send(contact);



};

exports.update = (req, res) => {
    const phoneNumber = req.params.phoneNumber;
    const { name, email, locality, city, state } = req.body;

    Contact.findOneAndUpdate({ phoneNumber }, { name, email, locality, city, state },(err,update)=>{
        if(err){throw err}
        res.redirect('/alllisting');
    });

};

exports.deleteContact = async (req, res) => {
    const phoneNumber = req.params.phoneNumber;

    Contact.findOneAndDelete({ phoneNumber }, (err, contact) => {
        if (err) {
            req.session.error = err;
            throw err;
        }
        res.redirect('/alllisting');
    });
};

