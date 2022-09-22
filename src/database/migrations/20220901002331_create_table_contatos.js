/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = (knex) => 
  knex.schema.createTable("contatos", (table) => {
    table.increments("id");
    table.string("nome", 60).notNullable();
    table.string("email", 60).notNullable();
    table.string("tel", 14).notNullable();
    table.string("msg", 1000).notNullable();
  });

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = (knex) => knex.schema.dropTable("contatos");
