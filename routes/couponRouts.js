const express = require('express');
const router = express.Router();
const couponService =require('../services/couponService.js')

// POST /coupon - create a new coupon
//======================================

router.post('/', (req, res) => { 
    const coupon = req.body;
    console.log(coupon.isRedeem);
    if (coupon.code && coupon.date && coupon.isRedeem) {
        const success = couponService.add(coupon)
        if (success) {
            res.status(201).send('coupon added successfully');
        } else {
            res.status(203).send('Rejected')
        }
    } else {
        res.status(203).send('Rejected')
    }
})

// GET /coupon - list all of the coupons
//======================================
router.get('/', (req, res) => {
    const coupons = couponService.getAll();
    res.send(coupons);
})

// GET /coupon/:code - return a coupon
//======================================
router.get('/:code',(req,res) =>{
    const {code}=req.params;
    const coupon = couponService.getCoupon(code);
    res.send(coupon);
})

// PUT /coupon/:code - edit a coupon
//======================================
router.put('/:code', (req, res) => {
    const toUpdate = req.body;
    const { code } = req.params;
    const updatedCoupon = couponService.update(code, toUpdate);
    if (updatedCoupon) {
        res.send(updatedCoupon);
    } else {
        res.status(400).send();
    }
})

// DELETE /coupon/:code - delete a coupon
//======================================

router.delete('/:code',(req,res)=>{
    const { code } = req.params;
    couponService.deleteCoupon(code);
    res.send('coupon deleted');
})

//POST /coupon/:code/redeem - Redeems the coupon code. 
//If the coupon has been redeemed before already, return status code 400.
//======================================
router.post('/:code/redeem',(req,res)=>{
    const { code } = req.params;
    const couponToRedeem = couponService.getCoupon(code);
    if(couponToRedeem){

        if(couponToRedeem.isRedeem==='1') {
            res.status(400).send('coupon is not active')
        }else{
            couponService.update(code,{"isRedeem":"1"});
            res.status(201).send('coupon Redeemed successfully');
        }

    }else{
        res.status(401).send('there is not coupon matching to the code');
    }
})


//GET /coupon/search/:code - returns if a certain coupon code exists or not (200/404). (edited) 
//======================================
router.get('/search/:code',(req,res)=>{
    const { code } = req.params;
    const couponTovalidate = couponService.getCoupon(code);
    if(couponTovalidate){
        if(couponTovalidate.isRedeem==='1') res.status(400).send('coupon is not active')
    }else{
        res.status(401).send('there is not coupon matching to the code');
    }
})


module.exports = router;