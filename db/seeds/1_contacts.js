'use strict'

exports.seed = function (knex) {
  return knex('contacts').del()
  .then(() => {
    return knex('contacts').insert([{
      id:1,
      address_id:1,
      first_name: 'The Dude',
      last_name: 'Lebowski',
      phone_number: '555-555-5553',
      email_address: 'duderino@gmail.com',
      poster_url : 'http://www.parent.co/wp-content/uploads/2016/04/The-Big-Lebowski-White-Russian.jpeg',
    }, {
      id:2,
      address_id:1,
      first_name: 'The Dude',
      last_name: 'Lebowski',
      phone_number: '555-555-5553',
      email_address: 'duderino@gmail.com',
      poster_url : 'http://www.parent.co/wp-content/uploads/2016/04/The-Big-Lebowski-White-Russian.jpeg',
    }, {
      id:3,
      address_id: 2,
      first_name: 'Jesus',
      last_name: 'Dont Fuck With',
      phone_number: '555-555-5554',
      email_address: 'pedo@gmail.com',
      poster_url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTytsCITiWx7MfEsb4ykkL6ESZ9YVdlUZWHR3pVN29gn6NJohlK',
  }]);
  })
  .then(() => {
    return knex.raw(
      "SELECT setval('contacts_id_seq', (SELECT MAX(id) FROM contacts));"
    );
  });
};
