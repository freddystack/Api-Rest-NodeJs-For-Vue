import { Response , Request} from 'express';
import post from '../models/post';
import user from '../models/user';



class PostController{

 
     public async getPost (req: Request , res : Response):Promise<void>{

       console.log(req.headers.authorization)
       const Pots = await post.find();
       res.json(Pots);
     }

     public async getOnePost (req: Request , res : Response){
       const id = req.params._id
       const onepost = await  post.findOne({_id: id}).populate('commentarys')
       res.json(onepost)
    }

    public async createPost (req: Request , res : Response):Promise<Response>{
        try {
          const { url,titulo, descripcion, imagen,username,email,image,handup,handdown} = req.body
         
            if((!titulo || !descripcion) || (!username || !email) ){
                 return res.status(401).json({mensaje : 'DEBE DE ENVIAR LOS CAMPOS REQUERIDOS'})
            }

          const USER = await user.findOne({email})  
          if(!USER){
             return res.status(401).json({mensaje: 'ESTE USUARIO NO EXISTE EN LA DB'})
          }
          console.log(req.body)
          const NEWPOST = new post({url,titulo,descripcion,imagen,username,email,image,handup,handdown});
          await NEWPOST.save()
          return res.json( NEWPOST)
        } catch (error) {
           return res.status(400).json({mensaje: error})
        }
    }
    public async puntuation (req: Request , res : Response):Promise<Response>{
     
      try {
           //   5f5d5ee038d97e3fd4af6d90
            const body = req.body
     
            const id = req.params._id
            //const USER = await post.findOne({url})
            console.log("DATOS   "+id, body)
            let postUpdate = await post.findOne({_id: id})
          
           
           if(!postUpdate){
             
              console.log("ESTE ESUARIO NO EXISTE ")
           } 
           const updateOne = await post.findOneAndUpdate({_id: id}, body ,{new : true})
           
           return res.json({updated : updateOne})

        
      } catch (error) {
         return res.json({error : "NO EXISTE ESTE USUARIO" })
      }
     
     // const NEWPUNT = new post({handup,handdown});
     // await NEWPUNT.save()
      // res.json({json : NEWPUNT})
  }

    public async updatePost (req: Request , res : Response){
        try {
           // DATOS DESDE EL BODY Y PARAMNS
          const {commentarys,titulo, descripcion,imagen,handup,handdown} = req.body
          const body = req.body
          const COMMENTARY = req.body.commentarys
          const id = req.params._id
          console.log(id, body)

          if(COMMENTARY){
            await post.findOneAndUpdate({_id: id}, { $push : {commentarys : COMMENTARY}})
            return res.json({mensaje: 'SE AÑADIDO UN NUEVO COMMENTARIO'})
          }

          // HAY TRES UPDATE PARA EL POST
          const POST = await post.findOne({_id : id})
          if(POST){
            const POSTUPDATE = await post.findOneAndUpdate({_id: id}, body ,{new : true})
            return res.json(POSTUPDATE)
          }
        } catch (error) {
          return res.send("NO EXISTE "+error)
        }
    }

    public async deletePost (req: Request , res : Response): Promise<Response>{
       const id = req.params._id
       await post.findOneAndDelete({_id: id})
       return res.status(200).json({mensaje :'Post Eliminated'})
    }
  }
 
export const postController = new PostController()

