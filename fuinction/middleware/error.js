//err handling middleware to handle only ROUTES error
//todo next time use winston
module.exports = function(err, req,  res, next) {
    console.log('Error: ', err);
    //or just 'smth failed'
    res.status(500).send('Error: ', err)
}