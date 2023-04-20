const sequelize = require('../config/connection');
const { Post } = require('../models');

const postSeedData = require('./postSeedData.json');

const seedDatabase = async () => {
    await sequelize.sync({ force: true });

    await Post.bulkCreate(postSeedData);

    process.exit(0);
}

seedDatabase();