
exports.up = function(knex) {
    return knex.schema.createTable('cars', tbl => {
      //primary key/ID    
      tbl.increments();
  
      tbl.string('VIN', 17)
          .notNullable()
          .unique()
          .index();
  
      tbl.string('make', 100)
          .notNullable();
  
      tbl.string('model', 100)
          .notNullable();
  
      tbl.integer('mileage')
          .notNullable();
  
      tbl.string('transmission_type', 100);
  
      tbl.string('status_of_title', 100);
    });
  };
  
  exports.down = function(knex) {
      return knex.schema.dropTableIfExists('cars');
  };
  