
import { Router} from 'express';
import { postController } from '../controllers/post.controller';



 class PostRoutes{

    public router : Router = Router();

   constructor(){
    this.routes()
   }

   routes():void{
       this.router.get('/', postController.getPost )
       this.router.get('/:_id', postController.getOnePost )
       this.router.post('/', postController.createPost )
    //   this.router.put('/:_id', postController.puntuation )
       this.router.put('/:_id', postController.updatePost )
       this.router.delete('/:_id', postController.deletePost )
   }



}

const postRoutes = new PostRoutes()
export default postRoutes.router