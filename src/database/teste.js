let conn = {
  host: "127.0.0.1",
  user: "postgres",
  password: "SenhadoGiu!",
  charset: "utf8",
  port: 5432,
};

// connect without database selected
let knex = require("knex")({ client: "pg", connection: conn });

knex.raw("CREATE DATABASE my_database").then(function () {
  knex.destroy();

  // connect with database selected
  conn.database = "my_database";
  knex = require("knex")({ client: "pg", connection: conn });

  knex.schema
    .createTable("my_table", function (table) {
      table.string("my_field");
    })
    .then(function () {
      knex.destroy();
    });
});
