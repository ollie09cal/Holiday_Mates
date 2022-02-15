import mongoose from 'mongoose'
import uniqueValidator from 'mongoose-unique-validator'

//SCHEMA
const { Schema } = mongoose

const commentsSchema = new Schema({
  text: { type: String, required: true, maxlength: 300 },
  owner: { type: mongoose.Schema.ObjectId, ref: 'User', required: true }
}, {
  timestamps: true,
})

const holidayTypeCardSchema = new Schema({
  type: { type: String, required: true },
  location: { type: String, required: true },
  latitude: { type: Number, required: true },
  longitude: { type: Number, required: true },
  owner: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
  link: { type: String },
  photo: [{ type: String }],
  description: { type: String, required: true, maxLength: 300 },
  vibeTag: [{ type: String }],
  rating: { type: Number, required: true, min: 1, max: 5 },
  private: { type: Boolean },
  comments: [commentsSchema],
  holidayId: { type: mongoose.Schema.ObjectId, ref: 'Holiday', required: true },
})

holidayTypeCardSchema.plugin(uniqueValidator)

export default mongoose.model('HolidayType', holidayTypeCardSchema)