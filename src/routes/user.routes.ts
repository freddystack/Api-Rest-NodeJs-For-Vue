
import { Router} from 'express';
import { userController } from '../controllers/user.controller';



 class UserRoutes{

    public router : Router = Router();

   constructor(){
    this.routes()
   }

   routes():void{
       this.router.get('/', userController.getUser )
       this.router.get('/:_id', userController.getOneUser )
       this.router.post('/', userController.createUser )
       this.router.put('/:_id', userController.updateUser )
       this.router.delete('/:_id', userController.deleteUser )
   }



}

const userRoutes = new UserRoutes()
export default userRoutes.router