
import { Router} from 'express';
import  {signInController} from '../controllers/signIn.controllers';



 class SignInRoutes{

    public router : Router = Router();

   constructor(){
    this.routes()
   }

   routes():void{
       this.router.post('/', signInController.SignIn )
     
   }



}

const signInRoutes = new SignInRoutes()
export default signInRoutes.router