import mongoose ,{ Schema, Document,  mongo } from 'mongoose';
import bcrypt from 'bcryptjs';

import encrypt from '../encrypt/encryptpass';


export interface UserDoc extends mongoose.Document {
    name: {
      type: string;
      unique: boolean;
      required: boolean;
    }
    mifuncion:() => string

  }

const nuevoSchema = new  mongoose.Schema({
 name : String
 
});





nuevoSchema.methods.mifuncion =  function(para : string):string{
    this.name
    return para
}





const nuevo = mongoose.model<UserDoc>('nuevo', nuevoSchema);
export default nuevo
