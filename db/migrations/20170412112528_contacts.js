'use strict'

exports.up = function(knex) {
  return knex.schema.createTable('contacts', (table) => {
    table.increments().notNullable();
    table.integer('address_id').notNullable();
    table.string('first_name').notNullable();
    table.string('last_name').notNullable();
    table.string('phone_number').notNullable();
    table.text('email_address').notNullable();
    table.text('poster_url').notNullable();
    table.timestamps(true,true);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('contacts');
};
