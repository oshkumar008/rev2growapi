import mango from 'mongoose';
const { Schema,model } = mango;
const userSchema = new Schema({
    fname:{
        type:String,
        required:true
    },
    lname: {
        type:String,
        required:true
    },
    username:{
        type: String,
        required: true,
        unique: true,
        index: true,
        maxlength: 100,
        trim: true,
        uniqueCaseInsensitive: true
    },
    email:{
        type: String,
        required: true,
        unique: true,
        index: true,
        maxlength: 100,
        trim: true,
        uniqueCaseInsensitive: true
    },
    password:{
        type:String,
        required:true
    },
    mobile:{
        type:String,
        required:true
    },
    status:{
        type:Boolean,
        required:true
    },
    is_admin:{
        type:Number,
        default:null
    }
});

export default  model('User',userSchema);