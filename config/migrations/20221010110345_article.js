exports.up = function (knex) {
  return knex.schema.createTable("articles", (table) => {
    table.increments("id");
    table.integer("creator_id").notNullable();
    table.string("text").notNullable();
    table.string("status").notNullable().defaultTo("private");
    table.integer("category_id").notNullable();
    table.timestamp("createdAt").defaultTo(knex.fn.now());
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("articles");
};
