const express = require('express');
const router = express.Router();
const couponService =require('../services/couponService.js')

// GET /coupon - list all of the coupons
//======================================
router.get('/', async(req, res) => {
    const coupons = await couponService.getAll();
    res.send(coupons);
})

// GET /coupon/:code - return a coupon
//======================================
router.get('/:code',async(req,res) =>{
    const {code}=req.params;
    const coupon = await couponService.getCoupon(code);
    if (!coupon) {
        res.status(404).send('no such coupon number');
    } else {
        res.send(user);
    }
})


// POST /coupon - create a new coupon
//======================================
router.post('/', async (req, res) => { 
    const coupon = req.body;
    console.log(coupon)
    if (coupon.code && coupon.date && coupon.isRedeem!==null) {
        const success = await couponService.addUser(coupon)
        if (success) {
            res.status(201).send('coupon added successfully');
        } else {
            res.status(203).send('Rejected')
        }
    } else {
        res.status(203).send('Rejected')
    }
})


// PUT /coupon/:code - edit a coupon
//======================================
router.put('/:id', async(req, res) => {
    const toUpdate = req.body;
    const { id } = req.params;
    const updatedCoupon = await couponService.update(id, toUpdate);
    if (updatedCoupon) {
        res.send(updatedCoupon);
    } else {
        res.status(400).send();
    }
})

// DELETE /coupon/:code - delete a coupon
//======================================

router.delete('/:id',async(req,res)=>{
    const { id } = req.params;
    const deletedCoupon = await couponService.deleteCoupon(id);
    res.send(deletedCoupon);
})

//POST /coupon/:code/redeem - Redeems the coupon code. 
//If the coupon has been redeemed before already, return status code 400.
//======================================
router.post('/:id/:code',async(req,res)=>{
    const { id,code } = req.params;
    const couponToRedeem = await couponService.getCoupon(id);
    console.log(couponToRedeem.code);
    if(couponToRedeem.code===code){
        if(couponToRedeem.isRedeem===true) {
            res.status(400).send('coupon is not active')
        }else{
            couponService.update(id,{"isRedeem":true});
            res.status(201).send('coupon Redeemed successfully');
        }
    }else{
        res.status(401).send('code doesnt match');
    }
})


//GET /coupon/search/:code - returns if a certain coupon code exists or not (200/404). (edited) 
//======================================
router.get('/search/:id',async(req,res)=>{
    const { id } = req.params;
    const couponTovalidate = await couponService.getCoupon(id);
    if(couponTovalidate){
        if(couponTovalidate.isRedeem===true) res.status(400).send('coupon is not active');
        res.status(400).send('coupon is active');
    }else{
        res.status(401).send('there is not coupon matching to the code');
    }
})


module.exports = router;