const mongoose = require('mongoose');
mongoose.connect('mongodb://mansoor:mansoor11@ds113853.mlab.com:13853/nodepractice123', {useNewUrlParser: true});

module.exports = mongoose
