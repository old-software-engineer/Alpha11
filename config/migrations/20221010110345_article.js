exports.up = function (knex) {
  return knex.schema.createTable("articles", (table) => {
    table.increments("id");
    table.integer("creator_id").notNullable();
    table.string("text").notNullable();
    table.string("status").notNullable().defaultTo("private");
    table.integer("category_id").notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("articles");
};
