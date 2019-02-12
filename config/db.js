const mongoose = require('mongoose');
mongoose.connect('mongodb://mansoor:mansoor11@ds133275.mlab.com:33275/service-app', {useNewUrlParser: true});

module.exports = mongoose
