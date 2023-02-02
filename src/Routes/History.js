const express = require('express')
// const bcrypt = require('bcrypt')
const jsw = require('jsonwebtoken')
const { body } = require('express-validator');
// const multer = require('multer');
const router = express.Router();
const fs = require('fs')
const TodoModel = require('../models/ToDo')
const bodyParser = require('body-parser')
router.use(bodyParser.json())
//Model 
const HistoryModel = require('../models/History')

router.get('/', async (req,res)=>{
    try {
        // console.log(req.userID)
    let History = await HistoryModel.find({user:req.userID});
    res.json({
        History,
        status:'susecss',
        
    })        
    } catch (error) {
        res.status(400).json({
            status: 'failed',
            messege: error.messege
        })   
    }
})


router.post('/:Acivity/:Time' ,async (req,res)=>{
    try {
        const History = await HistoryModel.create({
            Acivity : req.params.Acivity,
            Time: req.params.Time,
            user: req.userID
        })
        res.json({
            History:  History,
            status:"sucsess"
           
        })
    } catch (error) {
        res.status(502).json({
            status:"error",
           messege: error.messege
        })
    }
})

module.exports = router;