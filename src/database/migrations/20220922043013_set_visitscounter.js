/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = (knex) => knex.raw(`
  INSERT INTO visitscounter(github, portfolio, auxgithub, auxportfolio) VALUES (0,0,0,0);

  CREATE OR REPLACE FUNCTION incrementa() RETURNS trigger AS 
  $$
  BEGIN
    IF TG_ARGV[0]::DECIMAL = 0 THEN
      UPDATE visitscounter SET github = github + 1;
    ELSIF TG_ARGV[0]::DECIMAL = 1 THEN
      UPDATE visitscounter SET portfolio = portfolio + 1;
    END IF;
    RETURN NULL;
  END
  $$ 
  LANGUAGE PLPGSQL;

  CREATE OR REPLACE TRIGGER trg_incrementagithub AFTER UPDATE OF auxgithub ON visitscounter
    FOR EACH ROW EXECUTE PROCEDURE incrementa(0);

  CREATE OR REPLACE TRIGGER trg_incrementaportfolio AFTER UPDATE OF auxportfolio ON visitscounter
    FOR EACH ROW EXECUTE PROCEDURE incrementa(1);

  SELECT * FROM visitscounter;

  UPDATE visitscounter SET auxgithub = 0 WHERE auxgithub = 0;
  UPDATE visitscounter SET auxportfolio= 0 WHERE auxportfolio = 0;
`);

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  
};
