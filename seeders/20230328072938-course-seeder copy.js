'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    

      await queryInterface.bulkInsert('Courses', [{
        vendorId: 1,
        name: 'React Course',
        price: 20000,
        description: "React",
        isActive: true,
        createdAt: new Date(),
				updatedAt: new Date(),
      },{
        vendorId: 1,
        name: 'Laravel Course',
        price: 30000,
        description: "Laravel",
        isActive: true,
        createdAt: new Date(),
				updatedAt: new Date(),
      },{
        vendorId: 1,
        name: 'Node Course',
        price: 100000,
        description: "Node",
        isActive: true,
        createdAt: new Date(),
				updatedAt: new Date(),
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
