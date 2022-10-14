const mongoose=require('mongoose');
const DBconnection=()=>{
    return mongoose.connect(process.env.DBURL).then(result=>{
        console.log(` connected......${process.env.DBURL}`);
    }).catch(err=>{
        console.log(`error ${err}`);
    });
}
module.exports = DBconnection;