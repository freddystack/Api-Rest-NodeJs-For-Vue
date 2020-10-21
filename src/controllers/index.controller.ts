import { Response , Request} from 'express';


class IndexController{

 
     public index (req: Request , res : Response){
         res.send("ESTE ES EL INDEX")
     }
        
  }
 
export const indexController = new IndexController()

