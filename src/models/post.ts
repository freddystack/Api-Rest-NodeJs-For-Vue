import { Schema, model } from 'mongoose';

const PostSchema = new Schema({

    url: {type : String, required: true, unique : true, lowercase: true},
    titulo: {type: String, required: true},
    descripcion: {type: String, required: true},
    handup: {type: Number },
    handdown: {type: Number },
    createAt: {type: Date, default: Date.now},
    updatedAt: Date,
    imagen: {type: String  },
    username: {type: String, ref: 'user'},
    email:{type: String, ref: 'user'},
    image: {type: String ,ref: 'user'},
    commentarys:[{
        type: Schema.Types.ObjectId,
        ref: 'comment'
    }]
   




})

export default model('post', PostSchema)

