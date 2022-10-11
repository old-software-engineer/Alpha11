exports.up = function (knex) {
  return knex.schema.createTable("reactions", (table) => {
    table.increments("id");
    table.string("reaction").notNullable();
    table.integer("creator_id").notNullable();
    table.integer("article_id").notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("reactions");
};
