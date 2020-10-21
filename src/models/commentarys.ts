import { Schema, model} from 'mongoose';


const SchemaCommentarys = new Schema({
   thepost: { type: String, ref:'post'} ,
   email:{type: String, required: true, ref: 'user'},
   username:{type: String , required: true, ref:'user'},
   image: {type: String , required: true, ref: 'user'},
   commentary: {type: String, required: true}
})


export default model('comment', SchemaCommentarys)




