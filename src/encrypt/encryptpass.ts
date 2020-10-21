import bcrypt from 'bcryptjs';

class EncryptPassword{


    public encryptPass = async (pass : string) =>{
         const salt = await bcrypt.genSalt(10)
         return bcrypt.hash(pass , salt)
    }

   

}

const encrypt = new EncryptPassword()
export default encrypt