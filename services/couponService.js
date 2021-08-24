const fs = require('fs');

function getCoupons() {
    return require('../db/coupons.json');
}

function getAll() {
    return getCoupons()
}

function getCoupon(code) {
    const coupons = getCoupons();
    const foundCoupon = coupons.find(existCoupon => existCoupon.code === code);
    return foundCoupon;
}

function setcoupons(coupons) {
    fs.writeFileSync("./db/coupons.json", JSON.stringify(coupons));
}

function add(coupon) {
    const foundcoupon = getCoupon(coupon.code);
    const coupons = getCoupons();    
    if (!foundcoupon) {
        const newcoupon = {
            code: coupon.code,
            date: coupon.date,
            isRedeem: coupon.isRedeem
        }
        coupons.push(newcoupon);
        setcoupons(coupons);
        return true;
    }
    return false;
}

function update(code,data) {
    const coupons = getCoupons();
    const foundCoupon = coupons.find(existCoupon => existCoupon.code === code);
    if(!foundCoupon) return false;
    Object.keys(foundCoupon).forEach(key=>{
        if(data[key]){
            foundCoupon[key] =data[key]
        }
    })
    setcoupons(coupons);
    return foundCoupon;
}

function deleteCoupon(code) {
    const coupons = getCoupons();
    const filreredCoupons = coupons.find(existCoupon => existCoupon.code !== code);
    setcoupons(filreredCoupons);
}





module.exports={
    getCoupons,
    setcoupons,
    getCoupon,
    getAll,
    add,
    update,
    deleteCoupon

}