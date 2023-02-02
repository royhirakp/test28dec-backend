const express = require('express')
const jsw = require('jsonwebtoken')
const { body } = require('express-validator');
const router = express.Router();
const fs = require('fs')
const TodoModel = require('../models/ToDo')
const bodyParser = require('body-parser')
router.use(bodyParser.json())



router.post('/' ,async (req,res)=>{
    try {
        const Todo = await TodoModel.create({
            Acivity : req.body.Acivity,
            Status: 'Pending',
            TimeTaken: '',
            Action: 'start',
            user: req.userID
        })
        res.json({
            Todo:  Todo,
            status:"sucsess"
           
        })
    } catch (error) {
        res.status(502).json({
            status:"error",
           messege: error.messege
        })
    }
})
// HANDALING THE START POSE END BUTTON OF TODO

router.post('/:action/:id', async(req,res)=>{   // action = status of the todo // id= _id of the todo
        try {
        
        if(req.params.action === 'start'){
            const todo = await TodoModel.updateOne({_id: req.params.id},{$set:{Action:'started'}})
            console.log(todo)
            return  res.json({todo})
        }else if(req.params.action === 'pause'){
            const data = await TodoModel.findOne({_id: req.params.id})
            console.log(data)
            if(data.Action ==="started"){
                const time = parseFloat(data.TimeTaken==""?0:data.TimeTaken) + parseInt(req.body.time)
                const todo = await TodoModel.updateOne({_id: req.params.id},{$set:{Action:'Paused',TimeTaken:time}})
                console.log(todo)
                
                return  res.json({todo})
            }else if(data.Action === 'Paused'){
                const time = parseFloat(data.TimeTaken) + parseInt(req.body.time)
                const todo = await TodoModel.updateOne({_id: req.params.id},{$set:{Action:'started',TimeTaken:time}})
                res.json({todo})
            }           
        }else if(req.params.action === 'end'){
            // console.log('end1')
            const todo = await TodoModel.updateOne({_id: req.params.id},{$set:{Action:'Complited',TimeTaken:req.body.time}})
            // const todo = await TodoModel.updateOne({_id: req.params.id},{$set:{Action:'Paused'}})
            // console.log('end2')
            // console.log(todo)
            res.json({todo})
        }
    } catch (error) {
        res.status(502).json({
            status:'error!',
            messege:error.messege
        })
    }
})
router.get('/', async (req,res)=>{
    try {
        // console.log(req.userID)
        let TodoData = await TodoModel.find({user:req.userID});
    res.json({
        status:'susecss',
        TodoData
    })        
    } catch (error) {
        res.status(400).json({
            status: 'failed',
            messege: error.messege
        })
        
    }

})

module.exports = router;