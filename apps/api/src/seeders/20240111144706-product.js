'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Products', [
      {
        name: 'card 1',
        description: 'FreshDirect Rotisserie Chicken, Raised w/o Antibiotics',
        price: 25000,
        stock: 54,
        img: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?q=80&w=1965&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      },
      {
        name: 'card 2',
        description:
          'Just FreshDirect 100% Grass-Fed Local 80% Lean Ground Beef, Fresh, Premium Packaging',
        img: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        price: 25000,
        stock: 54,
      },
      {
        name: 'card 3',
        description:
          'Siggis Skyr Icelandic-Style Strained Non-Fat Yogurt, Mixed Berry and Acai',
        img: 'https://images.unsplash.com/photo-1519996529931-28324d5a630e?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        price: 2500000,
        stock: 54,
      },
      {
        name: 'card 4',
        description:
          'Just FreshDirect Local Angus RWA 90% Lean Ground Beef, Premium Packaging',
        img: 'https://images.unsplash.com/photo-1601004890684-d8cbf643f5f2?q=80&w=1915&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        price: 25000,
        stock: 54,
      },
      {
        name: 'card 5',
        description: 'Sprouts Organic Chicken Thin Sliced Boneless Breast',
        img: 'https://images.unsplash.com/photo-1557800636-894a64c1696f?q=80&w=1965&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        price: 25000000,
        stock: 54,
      },
      {
        name: 'card 6',
        description: 'this is desc this is desc this is desc',
        img: 'https://plus.unsplash.com/premium_photo-1671379041175-782d15092945?q=80&w=1920&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        price: 250000,
        stock: 54,
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Products', null, {});
  },
};
