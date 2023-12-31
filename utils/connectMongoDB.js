const mongoose= require('mongoose');

const MongoDB = async()=> mongoose.connect(process.env.URL);

module.exports = MongoDB;
