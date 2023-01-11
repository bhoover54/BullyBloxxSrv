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
      .addColumn("reports", "bully_witnessed", Sequelize.STRING)
      .then(() => queryInterface.addColumn("reports", "threat_name", Sequelize.STRING))
      .then(() => queryInterface.addColumn("reports", "threat_gender", Sequelize.STRING))
      .then(() => queryInterface.addColumn("reports", "threat_grade", Sequelize.STRING))
      .then(() => queryInterface.addColumn("reports", "threat_teacher", Sequelize.STRING))
      .then(() => queryInterface.addColumn("reports", "threat_date", Sequelize.STRING))
      .then(() => queryInterface.addColumn("reports", "threat_student_aware", Sequelize.STRING))
      .then(() => queryInterface.addColumn("reports", "threat_other_student", Sequelize.STRING))
      .then(() => queryInterface.addColumn("reports", "threat_details", Sequelize.STRING))
      .then(() => queryInterface.addColumn("reports", "w_name", Sequelize.STRING))
      .then(() => queryInterface.addColumn("reports", "w_gender", Sequelize.STRING))
      .then(() => queryInterface.addColumn("reports", "w_grade", Sequelize.STRING))
      .then(() => queryInterface.addColumn("reports", "w_teacher", Sequelize.STRING))
      .then(() => queryInterface.addColumn("reports", "w_type", Sequelize.STRING))
      .then(() => queryInterface.addColumn("reports", "w_other_students", Sequelize.STRING))
      .then(() => queryInterface.addColumn("reports", "w_sknow", Sequelize.STRING))
      .then(() => queryInterface.addColumn("reports", "w_details", Sequelize.STRING))
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
