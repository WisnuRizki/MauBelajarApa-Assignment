'use strict';
const bcrypt = require('bcrypt');
const { password } = require('pg/lib/defaults');
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    const pass = bcrypt.hashSync('maubelajarapa', 10)
     await queryInterface.bulkInsert('Vendors', [{
      id:1,
      name: 'wisnu',
      noHp:"090703045",
      email: 'wisnu@gmail.com',
      password: pass,
      createdAt: new Date(),
      updatedAt: new Date()
   }], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
