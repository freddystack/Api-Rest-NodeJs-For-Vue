import comment from '../models/commentarys';
import { Response,Request } from 'express';
import user from '../models/user';


class CommentaryController{

  public async addCommentary(req: Request, res: Response):Promise<Response> {
        try {
            const {email, username,commentary} = req.body
            console.log(req.body)
          
            if(!email || !commentary){
               return res.status(400).json({mensaje : 'Completa los campos por favor'})
            }
            const USER = await user.findOne({email,username})
            if(USER){

                var image = USER.image
          
               
                const COMMENT = new comment({email,username,commentary,image})
                await COMMENT.save()
                console.log(COMMENT)
                return res.status(200).json(COMMENT) 
            }else{
                console.log("NO EXISTE EN LA DB")
                return res.status(401).json({mensaje: 'El usuario que ingresate no existe'})
            }
   
           
        } catch (error) {
            console.log("ESTE ES EL CATCH NO EXISTE")
            return res.status(404).json({mensaje: 'ESTE USUARIO NO EXISTE EN LA DB'})
        }
  }

  public async getCommentarys(req: Request, res: Response):Promise<Response>{
        
       try {
            const COMMENTARYS = await  comment.find()
            return res.status(200).json(COMMENTARYS)
        } catch (error) {
            return res.status(400).send(error)
        } 
}




}

export const commentController = new CommentaryController()

