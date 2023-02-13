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
      .addColumn("reports", "blyg_first_name1", Sequelize.STRING)
      .then(() => queryInterface.addColumn("reports", "blyg_first_name2", Sequelize.STRING))
      .then(() => queryInterface.addColumn("reports", "blyg_first_name3", Sequelize.STRING))

      .then(() => queryInterface.addColumn("reports", "blyg_last_name1", Sequelize.STRING))
      .then(() => queryInterface.addColumn("reports", "blyg_last_name2", Sequelize.STRING))
      .then(() => queryInterface.addColumn("reports", "blyg_last_name3", Sequelize.STRING))

      .then(() => queryInterface.addColumn("reports", "blyg_gender1", Sequelize.STRING))
      .then(() => queryInterface.addColumn("reports", "blyg_gender2", Sequelize.STRING))
      .then(() => queryInterface.addColumn("reports", "blyg_gender3", Sequelize.STRING))

      .then(() => queryInterface.addColumn("reports", "blyg_grade1", Sequelize.STRING))
      .then(() => queryInterface.addColumn("reports", "blyg_grade2", Sequelize.STRING))
      .then(() => queryInterface.addColumn("reports", "blyg_grade3", Sequelize.STRING))

      .then(() => queryInterface.addColumn("reports", "blyg_teacher1", Sequelize.STRING))
      .then(() => queryInterface.addColumn("reports", "blyg_teacher2", Sequelize.STRING))
      .then(() => queryInterface.addColumn("reports", "blyg_teacher3", Sequelize.STRING))

      .then(() => queryInterface.addColumn("reports", "blyv_first_name1", Sequelize.STRING))
      .then(() => queryInterface.addColumn("reports", "blyv_first_name2", Sequelize.STRING))
      .then(() => queryInterface.addColumn("reports", "blyv_first_name3", Sequelize.STRING))

      .then(() => queryInterface.addColumn("reports", "blyv_last_name1", Sequelize.STRING))
      .then(() => queryInterface.addColumn("reports", "blyv_last_name2", Sequelize.STRING))
      .then(() => queryInterface.addColumn("reports", "blyv_last_name3", Sequelize.STRING))

      .then(() => queryInterface.addColumn("reports", "blyv_gender1", Sequelize.STRING))
      .then(() => queryInterface.addColumn("reports", "blyv_gender2", Sequelize.STRING))
      .then(() => queryInterface.addColumn("reports", "blyv_gender3", Sequelize.STRING))

      .then(() => queryInterface.addColumn("reports", "blyv_grade1", Sequelize.STRING))
      .then(() => queryInterface.addColumn("reports", "blyv_grade2", Sequelize.STRING))
      .then(() => queryInterface.addColumn("reports", "blyv_grade3", Sequelize.STRING))

      .then(() => queryInterface.addColumn("reports", "blyv_teacher1", Sequelize.STRING))
      .then(() => queryInterface.addColumn("reports", "blyv_teacher2", Sequelize.STRING))
      .then(() => queryInterface.addColumn("reports", "blyv_teacher3", Sequelize.STRING))

      .then(() => queryInterface.addColumn("reports", "blyw_first_name1", Sequelize.STRING))
      .then(() => queryInterface.addColumn("reports", "blyw_first_name2", Sequelize.STRING))
      .then(() => queryInterface.addColumn("reports", "blyw_first_name3", Sequelize.STRING))

      .then(() => queryInterface.addColumn("reports", "blyw_last_name1", Sequelize.STRING))
      .then(() => queryInterface.addColumn("reports", "blyw_last_name2", Sequelize.STRING))
      .then(() => queryInterface.addColumn("reports", "blyw_last_name3", Sequelize.STRING))

      .then(() => queryInterface.addColumn("reports", "blyw_gender1", Sequelize.STRING))
      .then(() => queryInterface.addColumn("reports", "blyw_gender2", Sequelize.STRING))
      .then(() => queryInterface.addColumn("reports", "blyw_gender3", Sequelize.STRING))

      .then(() => queryInterface.addColumn("reports", "blyw_grade1", Sequelize.STRING))
      .then(() => queryInterface.addColumn("reports", "blyw_grade2", Sequelize.STRING))
      .then(() => queryInterface.addColumn("reports", "blyw_grade3", Sequelize.STRING))

      .then(() => queryInterface.addColumn("reports", "blyw_teacher1", Sequelize.STRING))
      .then(() => queryInterface.addColumn("reports", "blyw_teacher2", Sequelize.STRING))
      .then(() => queryInterface.addColumn("reports", "blyw_teacher3", Sequelize.STRING))
      .then(() => queryInterface.addColumn("reports", "details_total", Sequelize.STRING))
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
