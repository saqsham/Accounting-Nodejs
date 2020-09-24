const mongoose = require('mongoose')

try {
    mongoose.connect('mongodb://root:example@mongodb:27017/accountingnode1', {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: true,
        useUnifiedTopology: true,
    });
} catch (e) {
    console.log(e)
}