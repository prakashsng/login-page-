const { request } = require('express');
const express = require('express');
const Router = express.Router();
const homeSchema=require ('../moduls/homeSchema')

Router.get('/',(err,res)=>{
    res.render('register',{title:'fill the form'})
})

Router.post('/register',async(request,res)=>{
    try{
        const{
        name,
        number,
        email,
        password,
        cpassword
    }=request.body;
     
    if(password===cpassword){
        const userData =new homeSchema({
            name,
            number,
            email,
            password,
            cpassword
        })
         userData.save(err=>{
            if(err){
                console.log('error')
            }else{
                res.render('register',{title:'done',password:'',email:''})
            }
         })
    const useremail=await homeSchema.findOne({email:email});
     if(email===useremail.email){
        res.render('register',{title :'',password:'',email:'email is already'})
     }  else{
        console.log('err');
     }

    }else{
        res.render('register',{title:'',password:'not matching'})
    }

    }catch(error){
        res.render('register',{title:'err the code',password:'',email:''})
    }
})
Router.post('/login',(request,res)=>{
    const{
        email,
        password
    }=request.body;

    homeSchema.findOne({email:email},(err,result)=>{
       if(email ===result.email && password===result.password){
        res.render('dashbord',{name :result.name})
       }else{
        console.log(err)
       }
    })
})




Router.post('/Forgot password',(request,res)=>{
    const{
        email,
         password,
    }=request.body;
    homeSchema.findOne({email:email}),(err,result)=>{
        if (emaill===result.email &&password===result.password) {
            res.render({name:result.name})
        } else {
            console.log(err)
        }
    }
})
  



module.exports = Router;