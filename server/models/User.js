const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10
const jwt = require('jsonwebtoken');

const userSchema = mongoose.Schema({
    name: {
        type : String,
        maxlength: 50
    },
    email: {
        type: String,
        trim: true,
        unique: 1
    },
    password: {
        type: String,
        maxlength: 100
    },
    role: {
        type: Number,
        default: 0
    },
    image: String,
    token: {
        type: String
    },
    tokenExp: {
        type: Number
    }
})

userSchema.pre('save', function( next ){
    var user = this;

    if(user.isModified('password')){
        //��й�ȣ�� ��ȣȭ ��Ų��.
        bcrypt.genSalt(saltRounds, function(err,salt){
            if(err) return next(err)

            bcrypt.hash(user.password, salt, function(err, hash){
                if(err) return next(err)
                user.password = hash
                next()
            })
        })
    } else {
        next()
    }
})


userSchema.methods.comparePassword = function(plainPassword, cb){

 //plainPassword 1234567   ��ȣȭ�� ��й�ȣ 2b$10$6bqk8uxhzOTdP4omN1q2WuoDmyzfItw7nUQFQvU9NLc9vTUZvHTaG
    bcrypt.compare(plainPassword, this.password, function(err, isMatch) {
        if(err) return cb(err);
        cb(null, isMatch);
    });
};
userSchema.methods.generateToken = function(cb){

    var user = this;

    // jsonwebtoken�� �̿��ؼ� ��ū�� �����ϱ�.

    var token = jwt.sign(user._id.toHexString(), 'secretToken')
    //user._id + 'secretToken' = token
    // ->
    // 'secretToken' -> user._id
    
    user.token = token
    user.save(function(err, user) {
        if(err) return cb(err)
        cb(null, user)
    })
}

userSchema.statics.findByToken = function(token, cb){
    var user = this;

    //��ū�� decode �Ѵ�.
    jwt.verify(token, 'secretToken', function(err, decoded) {
        //���� ���̵� �̿��ؼ� ������ ã�� ������ 
        //Ŭ���̾�Ʈ���� ������ ��ū�� �����ͺ��̽��� ������ ��ū�� ��ġ�ϴ��� Ȯ��

        user.findOne({"_id": decoded, "token": token}, function(err, user) {
            if(err) return cb(err);
            cb(null, user)
        })
    })
}

const User = mongoose.model('User',userSchema)
module.exports = { User }