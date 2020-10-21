import mongoose ,{ Schema, Document, model } from 'mongoose';
import bcrypt from 'bcryptjs';

import encrypt from '../encrypt/encryptpass';



export interface IUser extends mongoose.Document{
    username: string;
    email: string;
    password: string;
    firsname: string;
    lastname: string;
    image: string;
    createatt?: Date;
    post?: Array<any>;
   //comparePassword: ()=> Promise<boolean> ;
   comparePassword: Function;
    
    
}

const userSchema = new mongoose.Schema({
  username: {type: String, required: true, unique: true},
  email: {type: String, required: true, unique: true},
  password: {type: String, required: true, unique: true},
  firsname: {type: String, required: true},
  lastname : { type : String },
  image: String,
  createatt: {type : Date , default: Date.now},
  post : [{
     type: Schema.Types.ObjectId,
     ref: 'post'  
  }]
});

 userSchema.pre<IUser>('save', async function(next){
   const user = this;
   if(!user.isModified('password')) return  next()

    const hash =  await encrypt.encryptPass(user.password)
   user.password = hash;  

   next();
});
 
userSchema.methods.comparePassword = async  function(password: string):Promise<boolean>{
   return await bcrypt.compare(password, this.password)
}






export default mongoose.model<IUser>('user' , userSchema)


