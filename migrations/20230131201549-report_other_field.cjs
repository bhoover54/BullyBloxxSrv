"use strict"

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    return queryInterface
      .addColumn("reports", "bully_witness", Sequelize.STRING)
      .then(() => queryInterface.addColumn("reports", "bully_witnesses", Sequelize.STRING))
      .then(() => queryInterface.addColumn("reports", "w_keep", Sequelize.STRING))
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
}
