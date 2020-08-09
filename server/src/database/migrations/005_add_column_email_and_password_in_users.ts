import Knex from 'knex';

export async function up(knex: Knex) {
  return knex.schema.table('users', (table) => {
    table.string('surname').notNullable().defaultTo('');
    table.string('email').unique().notNullable().defaultTo('');
    table.string('password').notNullable().defaultTo('');
  });
}

export async function down(knex: Knex) {
  return knex.schema.table('users', (table) => {
    table.dropColumn('surname');
    table.dropColumn('email');
    table.dropColumn('password');
  });
}
