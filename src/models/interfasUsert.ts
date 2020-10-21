import { Document} from 'mongoose';


export default interface IUser extends Document{
    username: string;
    email: string;
    password: string;
    firsname: string;
    lastname: string;
    image: string;
    createatt?: Date;
    post?: Array<any>;
   
    
}