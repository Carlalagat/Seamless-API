const {Router} =require('express');
const { route } = require('./product.route');


const router = Router();

router.get('/signup',()=>{});
router.post('/signup',()=>{});
router.get("/login",()=>{});
route.post("/login",()=>{});

module.exports = router;