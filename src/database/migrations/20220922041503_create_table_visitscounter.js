/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = (knex) => knex.schema.createTable("visitscounter", (table) => {
  table.integer("github");
  table.integer("portfolio");
  table.integer("auxgithub");
  table.integer("auxportfolio");
});

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = (knex) => knex.schema.dropTable("visitscounter");
