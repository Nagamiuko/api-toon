import mongoose from "mongoose";
const {Schema} = mongoose

const userSchemas = new mongoose.Schema(
   {
      email: {
         type:String,
         // required:true,
         unique: true 
      },
      fullname:{
         type:String,
      },
      username: {
         type: String,
         // required: true,
         unique:true
      },
      password: {
         type: String,
         // required: true,
      },
      avatar:{
        public_id:{
           type:String
         },
        avatar_url:{
           type:String
        },
        image_name:{
           type:String,
        }
      },
      sex:{
         type:String,
      },
      isAdmin: {
        type: Boolean,
        default: false,
      },
 },
 {timestamps: true}
)
export default mongoose.model("mangauser", userSchemas)