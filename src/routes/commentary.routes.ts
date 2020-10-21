
import { Router} from 'express';
import { commentController } from '../controllers/commentary.controller';



 class CommentaryRoutes{

    public router : Router = Router();

   constructor(){
    this.routes()
   }

   routes():void{
       this.router.get('/', commentController.getCommentarys )
       this.router.post('/', commentController.addCommentary ) 
   }



}

const commRoutes = new CommentaryRoutes()
export default commRoutes.router