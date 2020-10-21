import mongoose,{ ConnectionOptions} from 'mongoose';
//import { ConnectionOptions } from 'tls';


class Conection{

     public conec(){

        const USER = "userfreddy";
        const PASS = "passfreddy"
        const DBNAME = "NODEJSMONGO"
        const MONGO_URI = `mongodb+srv://userfreddy:passfreddy@cluster0.qe72a.mongodb.net/NODEJSMONGO?retryWrites=true&w=majority`

        const dbOptions:  ConnectionOptions ={
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true
        }

        mongoose.set('useFindAndModify', true ) // useUnifiedTopology: true
        mongoose.connect(MONGO_URI || process.env.MONGO_URL , dbOptions )
         .then(bd => console.log('DB IS CONECTED'))
         .catch(err =>{
            console.log(err)
            process.exit(0);
         });
     }

}

const  conexion = new Conection()
export default conexion
