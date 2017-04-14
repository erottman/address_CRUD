const express = require('express');
const router = express.Router();
const db = require('../db');


router.get('/', (req, res, next) => {
    db.from('contacts')
    .innerJoin('addresses','addresses.id','contacts.address_id')
    .then(contacts => {
      console.log(contacts);
      res.render('contacts/index', {contacts});
    })
});

router.get('/new', (req, res, next) => {
  res.render('contacts/new', {title: 'Add a New Contact'
  });
});

router.get('/:id',(req,res,next) => {
    let id = req.params.id
    db.from('contacts')
    .innerJoin( 'addresses', 'addresses.id', 'contacts.address_id')
    .where('contacts.id', id)
    .first()
    .then(contact => {
      res.render('contacts/show', {contact});
  })
})

router.get('/:id/edit',(req,res,next) => {
    let id = req.params.id
    db.from('contacts')
    .innerJoin( 'addresses', 'addresses.id', 'contacts.address_id')
    .where('contacts.id', id)
    .first()
    .then(contact => {
      res.render('contacts/edit', {contact});
  })
})

router.post('/', (req,res,next) => {
  let address = {
    line_1: req.body.line_1,
    line_2: req.body.line_2,
    city: req.body.city,
    zip: req.body.zip
  }
  db('addresses')
  .insert(address)
  .returning('id')
  .then(id  => {
    console.log(id);
    let contact = {
      address_id : id[0],
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      phone_number: req.body.phone_number,
      email_address: req.body.email_address,
      poster_url: req.body.poster_url
    }
    db('contacts')
    .insert(contact)
    .returning('id')
    .then(id => {
      res.redirect(`/contacts/${id}`)
    })
  })
})


router.put('/:id', (req,res,next) => {
 let address = {
   line_1: req.body.line_1,
   line_2: req.body.line_2,
   city: req.body.city,
   zip: req.body.zip
 }
 let contact = {
   first_name: req.body.first_name,
   last_name: req.body.last_name,
   phone_number: req.body.phone_number,
   email_address: req.body.email_address,
   image_url: req.body.image_url
 }
 var contact_id =req.params.id;
 db('contacts')
 .update(contact)
 .where('id', contact_id)
 .returning('address_id')
 .then(id  => {
   db('addresses')
   .update(address)
   .where('id', id[0])
   .then(() => {
     res.redirect(`/contacts/${contact_id}`)
   })
 })
})



router.delete('/:id',(req,res,next) => {
    let id = req.params.id
    db('contacts')
    .del()
    .where({id})
    .returning('address_id')
    .then(addressID => {
      db('contacts')
      .count()
      .where('address_id', addressID[0])
      .then(count => {
        if (count[0] === 0) {
          db('addresses')
          .del()
          .where('id', addressID[0])
          .then(() => {
            res.redirect('/contacts')
          })
        }
          res.redirect('/contacts')
      })
    })
  })



module.exports = router;
