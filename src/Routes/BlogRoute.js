const express = require('express')
// const bcrypt = require('bcrypt')
const jsw = require('jsonwebtoken')
const { body } = require('express-validator')
const router = express.Router();

const BlogModel = require('../models/Blog')
const bodyParser = require('body-parser')
router.use(bodyParser.json())

router.post('/', async (req,res)=>{
    try {
        const createBlog = await BlogModel.create({
            title: req.body.title,
            describtion: req.body.describtion,
            user: req.userID
        })
        res.json({
            status:"sucsess",
            createBlog
        })
    } catch (error) {
        res.json({
            status:"sucsess",
           messege: error.messege
        })
    }
})

router.get('/', async (req,res)=>{
    try {
        console.log(req.userID)
        let blog = await BlogModel.find({user:req.userID});
    res.json({
        status:'susecss',
        blog
    })
        
    } catch (error) {
        res.status(400).json({
            status: 'failed',
            messege: error.messege
        })
        
    }

})

module.exports = router;