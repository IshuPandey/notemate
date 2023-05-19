const mongoose=require('mongoose');
const mongoURI="mongodb://0.0.0.0:27017/notemate?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false";

const connectToMongo=()=>{
    mongoose.connect(mongoURI)
}
module.exports=connectToMongo;