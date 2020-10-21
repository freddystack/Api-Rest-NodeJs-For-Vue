import { Response , Request} from 'express';
import  user,{IUser} from '../models/user';
import mongoose from 'mongoose';
import encrypt from '../encrypt/encryptpass';
import bcrypt, { hash } from 'bcryptjs';
import createTokens from '../tokens/createTokens';

import nuevo from '../models/test';


export const pass = (user: IUser ) =>{
      return user.password

}
export const com = (user : IUser, pass : string)=>{
    return bcrypt.compare( pass , user.password)
}


class SignInController{
    
  
      constructor(){
     
      }
    
     public async SignIn(req: Request, res: Response):Promise<Response>{

          const { email , password} = req.body
        console.log(email, password)
         if(!email || !password){
              return res.status(400).send("POR FAVOR INGRESA TODO LOS CAMPOS")
         } 
        
         
         
       
          const USEREMAIL = await user.findOne({email})
        
         if(!USEREMAIL){ 
             
             return res.status(401).send("Este usuario no existe")
           
         }

         const IsMatch = await USEREMAIL.comparePassword(password)
        
          if(IsMatch){
            return res.status(200).json({ token : createTokens(USEREMAIL)})
          }
          return res.status(400).send("ESTE ES EL MENSAJE 400")

     }
    
  }
 
export const signInController = new SignInController()

