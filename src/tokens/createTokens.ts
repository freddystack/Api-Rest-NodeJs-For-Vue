import jwt from 'jsonwebtoken';
import  user, {IUser} from '../models/user';
import config from './configSecret';


class tokens{

       CreateToken = (user: IUser ) =>{
        return jwt.sign({id : user.id, email: user.email  } , config.jwSecret ,{
            expiresIn: 86400
        })
      
      }

}

const token = new tokens()
export default token.CreateToken



  