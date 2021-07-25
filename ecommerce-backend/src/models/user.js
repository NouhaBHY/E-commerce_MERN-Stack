const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const userSchema = new mongoose.Schema({           //1er object
    firstName: {
        type: String,
        required: true,
        trim: true,   //remove the white space
        min: 3,
        max: 20
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
        min: 3,
        max: 20
    },
    userName: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        index: true,// we can query the userName
        lowercase: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true
    },
    hash_password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    contactNumber: { type: String},
    profilPicture: { type: String},
},{ timestamps: true});                   //2eme object

//// create virtual field :
userSchema.virtual('password')
.set(function(password){
    this.hash_password = bcrypt.hashSync(password, 10);//from the doc_of_bcrypt// here : salt = 10
});
////create methods
userSchema.methods = {
    authenticate: function(password){
        return bcrypt.compareSync(password, this.hash_password);
    }
}

//to check a password 
module.exports = mongoose.model('user', userSchema);
