import User from '../models/UserModels.js'

export const  UserAll = async (req, res ) =>{
  
   try{
       const datauser =  await User.find()
        res.status(200).json(datauser)
       //  res.status(200).json({data:datauser , message:"User All Succesfully ('-')"})
   }catch(err){
     res.status(404).json("NoT Delete User !")
     console.log(err)
   }
 
 }
 export const  UserOne = async (req, res ) =>{
   
   try{
       const datauser =  await User.findById(req.params.userid)
        res.status(200).json(datauser)
       //  res.status(200).json({data:datauser , message:"User All Succesfully ('-')"})
   }catch(err){
     res.status(404).json("NoT Delete User !")
     console.log(err)
   }
 
 }
 export const  getUserOne = async (req, res ) =>{
     console.log("UserID:",req.user._id);
   try{
       const user =  await User.findById(req.user._id)
        res.status(200).json({success:true , user})
   }catch(err){
     res.status(404).json("No Fonr User !")
     console.log(err)
   }
 
 }