const express=require('express');
const router=express.Router();
//post Model
const Posts = require('../../models/Posts');
//@routes Get api/post
//@desc Get all post
//router.get('/',(req,res) => {
  //  try{
    //    const posts = Posts.find();
      //  if(!posts) throw Error('no items');
        //  res.status(200).json(posts);
    //}catch(err){
      //    res.status(400).json({msg:err})
    //}  
//});
router.get('/', (req, res) => {
    Posts.find({}, (err, response) => {
        if (err)
            res.status(500).json({
                message: {
                    msgBody: "unable to get employees",
                    msgError: "true"
                }
            });
        else
            res.status(200).json(response);
    });
});

//@routes Posts api/post
//@desc create an post
router.post('/', async (req,res) => {
    const newPost=new Posts(req.body);
    try{
        const post = newPost.save();
        if(!post) throw Error('something went wrong while saving the post');
          res.status(200).json(post);
    }catch(err){
        res.status(400).json({msg:err})

    }

    
});
//@routes DELETE api/posts/:id
//@desc DELETE an post
//router.delete('/:id',async (req,res) => {
   // try{
       // const post = Posts.findByIdAndDelete(req.params.id);
       // if(!post) throw Error('no post found!');
       //   res.status(200).json({success:true});
   // }catch(err){
      //  res.status(400).json({msg:err})
  //  }
  router.delete('/:id', (req, res) => {
    Posts.findByIdAndDelete(req.params.id, err => {
        if (err)
            res.status(500).json({
                message: {
                    msgBody: "unable delete employee",
                    msgError: true
                }
            });
        else
            res.status(200).json({
                message: {
                    msgBody: "sucessfully deleted employee",
                    msgError: false
                }
            });
    });
});

    
//});
//@routes update api/posts/:id
//@desc update an post
//router.patch('/:id',async (req,res) => {
    //try{
       // const post = Posts.findByIdAndUpdate(req.params.id, req.body);
        //if(!post) throw Error('something ent wrong while updating the post!');
        //  res.status(200).json({success:true});
   // }catch(err){
      //  res.status(400).json({msg:err})
   // } 
//});
router.put('/:id',(req,res)=>{
    Posts.findOneAndUpdate(req.params.id,req.body,{runValidators:true},(err,response)=>{
        if (err)
        res.status(500).json({
            message: {
                msgBody: "unable update employee",
                msgError: true
            }
        });
    else
        res.status(200).json({
            message: {
                msgBody: "sucessfully updated employee",
                msgError: false
            }
        });
    });
});
module.exports = router;