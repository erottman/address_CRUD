'use strict'

exports.seed = function (knex) {
  return knex('addresses').del()
  .then(() => {
    return knex('addresses').insert([{
      id:1,
      line_1: '123 Main Street' ,
      line_2: 'c/o Jane Smith',
      city: 'Seattle',
      zip: 98101,
    }, {
      id:2,
      line_1: '6576 High Point Dr',
      line_2: 'SW',
      city: 'Seattle',
      zip: 98126,
  }]);
  })
  .then(() => {
    return knex.raw(
      "SELECT setval('addresses_id_seq', (SELECT MAX(id) FROM addresses));"
    );
  });
};
