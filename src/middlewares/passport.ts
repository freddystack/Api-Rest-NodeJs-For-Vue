import { Strategy , ExtractJwt , StrategyOptions  } from 'passport-jwt';
import { config } from 'process';
import confiog from '../tokens/configSecret';
import user from '../models/user';


const options: StrategyOptions={
   jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
   secretOrKey : confiog.jwSecret

}


export default new Strategy(options , async(payload, done)  =>{
   try {
        const USER = await user.findById(payload.id)
        if(USER){
            return done(null, USER)
        }
        return done(null ,false)
   } catch (error) {
       console.log(error)
   }

})

