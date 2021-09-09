var ObjectId = require('mongodb').ObjectId;
const {couponsCollection}=require('../db.js');

function getCoupons() {
    return require('../db/coupons.json');
}

async function getAll() {
    return await  couponsCollection().find({}).toArray();
}

async function getCoupon(id) {
    const coupon=couponsCollection();
    const foundCoupon = await coupon.findOne({"_id":ObjectId(id)});
    return foundCoupon;
}

async function addUser(newCoupon) {
    const coupon=couponsCollection();
    const addedCoupon = await coupon.insertOne(newCoupon);
    return addedCoupon;
 }
 
async function update(id,data) { 
    const coupons = couponsCollection();
    var objForUpdate = {};
    if (data.code) objForUpdate.code = data.code;
    if (data.date) objForUpdate.date = data.date;
    if (data.isRedeem!==null) objForUpdate.isRedeem = data.isRedeem;
    objForUpdate = { $set: objForUpdate }
    var myquery = {"_id":ObjectId(id)};
    const updated = coupons.updateOne(myquery, objForUpdate );
    return updated;

/*     var newvalues = { $set: {code:data.code, date:data.date, isRedeem:data.isRedeem} };
     const updated = await coupons.updateOne(myquery,newvalues);
    return updated; */
}

async function deleteCoupon(id) {
    const coupons = couponsCollection();
    const deletedCoupon = await coupons.deleteOne({"_id":ObjectId(id)});
    return deletedCoupon;
}





module.exports={
    getCoupons,
    getCoupon,
    getAll,
    addUser,
    update,
    deleteCoupon

}