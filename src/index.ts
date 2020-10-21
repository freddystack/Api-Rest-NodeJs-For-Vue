import express,{ Application, application, json  } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import helmet from 'helmet';
import mongoose from 'mongoose';
import conexion from './db/conection';
import compression from 'compression';
import passport from 'passport';
import passportmiddleware from './middlewares/passport';




// jwtSecret: process.env.JWT_SECRET || 'screttoken'

///   RUTAS
import indexRoutes from './routes/index.routes';
import postRoutes  from './routes/post.routes';
import  userRoutes from './routes/user.routes';
import  signInRoutes from './routes/signin.routes';
import commRoutes from './routes/commentary.routes';



import { threadId } from 'worker_threads';





export class server{

      public   app: express.Application ;
     constructor(){
        this.app = express();
        this.config();
        this.routes();

     }
     //// userfreddy passfreddy

     config():void{
         
        conexion.conec()

        this.app.set('port', process.env.PORT || 3000)
        this.app.use(morgan('dev'))
        this.app.use(cors());
        this.app.use(express.json())
        this.app.use(express.urlencoded({extended : false}))
        this.app.use(helmet())
        this.app.use(compression())
        this.app.use(passport.initialize())
        passport.use(passportmiddleware)
     }

     routes():void{
           this.app.use(indexRoutes);
           this.app.use('/api/post' ,   passport.authenticate('jwt',{ session: false})   ,  postRoutes);
           this.app.use('/api/user' , /* passport.authenticate('jwt',{ session: false})  , */ userRoutes)
           this.app.use('/api/signin' , signInRoutes)
           this.app.use('/api/commentary', commRoutes)
     }
     start():void{
        this.app.listen(this.app.get('port'), ()=>{
            console.log(`SERVER ON PORT ${this.app.get('port')}`)
        });
     }




}
const serve = new server();
serve.start()
