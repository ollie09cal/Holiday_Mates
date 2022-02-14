import mongoose from 'mongoose'
import uniqueValidator from 'mongoose-unique-validator'
import bcrypt from 'bcrypt'


const { Schema } = mongoose


const userSchema = new Schema({
  username: { type: String, required: true, unique: true, maxlength: 30 },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  profilePhoto: { type: String },
  matesToken: [{ type: String }],
  matesRequests: [{ type: mongoose.Schema.ObjectId, ref: 'User' }],
  requestsSent: [{ type: mongoose.Schema.ObjectId, ref: 'User' }],
  mates: [{ type: mongoose.Schema.ObjectId, ref: 'User' }],
  personalToken: { type: String, required: true, unique: true, minLength: 10, maxlength: 20 }
})

//fields for tying holiday cards to user 
userSchema.virtual('ownedHolidays', {
  ref: 'Holiday',
  localField: '_id',
  foreignField: 'owner',
})

userSchema.set('toJSON', {
  virtuals: true,
  transform(_doc, json){
    delete json.password
    return json
  }
})

userSchema
  .virtual('passwordConfirmation')
  .set(function(passwordConfirmation){
    this._passwordConfirmation = passwordConfirmation
  })

userSchema
  .pre('validate', function(next){
    if (this.isModified('password') && this.password !== this._passwordConfirmation){
      this.invalidate('passwordConfirmation', 'Does not match password field.')
    }
    next()
  })

userSchema
  .pre('save', function(next){
    if (this.isModified('password')){
      this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync()) //this generates our encryption method and sets the default number of rounds, which can also be specified
    }
    next()
  })

userSchema.plugin(uniqueValidator)



userSchema.methods.validatePassword = function(password){
  console.log(password, this.password)
  return bcrypt.compareSync(password, this.password)
}


export default mongoose.model('User', userSchema)