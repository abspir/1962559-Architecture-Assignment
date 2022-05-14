const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PW}@cluster0.rq1io.mongodb.net/stateuniversity?retryWrites=true&w=majority`)
.then((res)=>{
    console.log('Connected to Atlas..');
})
.catch((e) => {
    console.log(e);
})
