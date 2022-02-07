const mongoose = require('mongoose');

const dbConnection = () => {
    const dbUrl = process.env.MONGODB_URI;
    mongoose.connect(dbUrl)
        .then(() => console.log('Database Connection Success'))
        .catch((err) => console.log('Connection With Databse Failed. Reason ' + err.message));
}

module.exports = dbConnection();