exports.up = function (knex) {
  return knex.schema.createTable("comments", (table) => {
    table.increments("id");
    table.integer("creator_id").notNullable();
    table.string("text").notNullable();
    table.integer("article_id").notNullable();
    table.timestamp("createdAt").defaultTo(knex.fn.now());
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("comments");
};
