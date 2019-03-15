exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("users")
    .truncate()
    .then(function() {
      // Inserts seed entries
      return knex("users").insert([
        { username: "Enoka", password: "pass" },
        { username: "John", password: "pass" },
        { username: "Becky", password: "pass" }
      ]);
    });
};
