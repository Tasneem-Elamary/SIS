/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Alter the 'Department' column to allow NULL values
    await queryInterface.changeColumn('Instructors', 'Department', {
      type: Sequelize.STRING, // Adjust the data type as needed
      allowNull: true,
    });
  },

  async down(queryInterface, Sequelize) {
    // Revert the 'Department' column to NOT allow NULL values
    await queryInterface.changeColumn('Instructors', 'Department', {
      type: Sequelize.STRING, // Ensure the same data type as in the 'up' method
      allowNull: false,
    });
  },
};
