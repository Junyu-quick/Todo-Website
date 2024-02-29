const mongoose = require('mongoose');

export function db() {
    const dbConnectionString = "mongodb+srv://jake:iVifDRVyZc4894jo@cluster0.umpeezj.mongodb.net/";

    mongoose.connect(dbConnectionString)
        .then(() => console.info('Connected to MongoDB Atlas.'))
        .catch((error) => {
            //process.on for error handler will format it 
            throw new Error("Error connecting to MongoDB Atlas.")
        })
}