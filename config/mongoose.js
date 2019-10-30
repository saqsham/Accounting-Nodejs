const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/accountingnode1', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: true,
    useUnifiedTopology: true,
    
});
