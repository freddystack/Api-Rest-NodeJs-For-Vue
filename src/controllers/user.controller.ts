import { Response , Request, json} from 'express';
import  user, {IUser} from '../models/user';
import createToken from '../tokens/createTokens';
import encrypt from '../encrypt/encryptpass'
import { parse } from 'path';
import bcrypt from 'bcryptjs';





/* export const CreateToken = (user: IUser ) =>{
  return jwt.sign({id : user.id, email: user.email  } , config.jwSecret ,{
      expiresIn: 86400
  })

} */



class UserController{

      

 
     public async getUser (req: Request , res : Response):Promise<void>{
       const User = await user.find();
       res.json(User);
     }

     public async getOneUser (req: Request , res : Response):Promise<Response>{
       const id = req.params._id
       const oneuser = await  user.findOne({_id : id}).populate('post')
       return res.json(oneuser)
    }

    public async createUser (req: Request , res : Response):Promise<Response>{

       try {
        
         const {username, email, password, firsname, lastname,image,post} = req.body
         console.log(req.body)
         if((!username || !password) || (!email || !firsname)){
            return res.status(204).json( {mensajw:"ENVIA TODOS LOS CAMPOS"})
         }

        const USER =  await user.findOne({email})
         if(USER){
             return res.status(206).json({mensaje : 'ESTE USUARIO YA ISXISTE'})
         }

    
         
          const NEWUSER = new user({ username, email, password, firsname,lastname, image, post  }); 
           await NEWUSER.save();
          console.log("CREADOS")
         // return res.send("ACEEPT ")
           return res.status(201).json({ token : createToken(NEWUSER)})
       } catch (error) {
          return res.status(400).json({mensaje : 'HA OCURRIDO UN ERROR'})
       }

    }

    public async updateUser (req: Request , res : Response):Promise<Response>{
        const body = req.body
        const postParametro = req.body.post
        const id = req.params._id
        console.log(req.body)
         if(req.body.password){
           body.password = await encrypt.encryptPass(body.password)
         }
       
        if(postParametro){
           await user.findOneAndUpdate({_id: id}, { $push : {post : postParametro}})
           return res.json({mensaje: 'SE AÑADIDO UN NUEVO POST'})
        }
        const US = await user.findOneAndUpdate({_id: id}, body, {new : true} )
        console.log(US)
        return res.json({mensaje :'updateOne'}) 
    }

    public async deleteUser (req: Request , res : Response): Promise<Response>{
       const id = req.params._id
       await user.findOneAndDelete({_id: id})
       return res.json({mensaje: "USER DALETED"})
    }
  }
 
export const userController = new UserController()

