const express= require('express');
const postsRoutes=require('./routes/api/posts');

const app=express();
const mongoose=require('mongoose');
const {MONGO_URI}=require('./config');
//Router
//app.get('/',(req,res)=>{
   // res.send('hello from node');
//});
//body parser Middlware
app.use(express.json());

//connect to mongodb
mongoose.connect(MONGO_URI, {
    useNewUrlParser:true,
    useUnifiedTopology:true,
})
.then(()=> console.log('Mongodb connect!'))
.catch(err=>console.log(err));
//user Route
app.use('/api/posts',postsRoutes);
const PORT=process.env.PORT || 5000;
app.listen(PORT,()=>console.log(`server run at port ${PORT}`))