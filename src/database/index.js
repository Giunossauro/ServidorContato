const knexfile = require("../../knexfile");
const knex = require("knex")(knexfile.development);

module.exports = knex;
//run on terminal: knex migrate:make create_table_contatos -> t32 -> dps roda
//knex migrate:latest
//34 em diante é seeds

//config var: heroku config:set PGSSLMODE=no-verify
