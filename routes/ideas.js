const express = require('express');
const router = express.Router();
const Idea = require('../model/Idea');
const secureRouter = require('../config/auth');

router.get('/', secureRouter, async (req, res) => {
    const ideas = await Idea.find({}).sort({date:'desc'});
    res.render('ideas/index', { ideas , message: req.flash('success-login')});
})

router.get('/new', secureRouter, (req,res) => {
    res.render('ideas/new');
})

// /ideas/:id/edit
router.get('/:id/edit', secureRouter, async(req,res) => {
    const _id = req.params.id;
    const idea = await Idea.findOne({ _id });
    res.render('ideas/edit',{ idea });
})

router.post('/', async (req,res) => {
    const {title, detail} = req.body;
    try{
        const idea = new Idea({ title, detail });
        await idea.save();
        req.flash('success_msg', 'Video idea added');
        res.redirect('/ideas');
    } catch(e){
        res.send({error:e});
    }
})

router.put('/:id', async(req,res) => {
    const _id = req.params.id;
    const idea = await Idea.findOne({ _id })

    idea.title = req.body.title;
    idea.detail = req.body.detail;

    await idea.save();
    req.flash('success_msg', 'Video idea updated');
    res.redirect('/ideas');    
})

router.delete('/:id', async(req,res) => {
    const _id = req.params.id;
    await Idea.findOneAndDelete({ _id });
    //Flash message should be before redirecting cause it is like we are sending global variable as second parameter
    req.flash('success_msg','Video idea removed');
    res.redirect('/ideas');
})


module.exports = router;