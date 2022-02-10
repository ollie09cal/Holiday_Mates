import mongoose from 'mongoose'
import uniqueValidator from 'mongoose-unique-validator'
// import HolidayType from './holidayType.js'

//SCHEMA
const { Schema } = mongoose

const holidaySchema = new Schema({
  owner: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true, maxLength: 50 },
  location: { type: String, required: true },
  longitude: { type: Number },
  latitude: { type: Number },
  date: { type: String, required: true },
  description: { type: String, maxLength: 500 },
  image: { type: String, required: true },
  private: { type: Boolean },
  holidayTypes: [{ type: mongoose.Schema.ObjectId, ref: 'HolidayType' }]
})

holidaySchema.virtual('avgRating')
  .get(function(){
    if (!this.holidayTypes.length) return 'Boring Holiday!'

    const sum = this.holidayTypes.reduce((acc, card) => {
      return acc + card.rating
    }, 0)
    return (sum / this.holidayTypes.length).toFixed(2)
  })

holidaySchema.set('toJSON', {
  virtuals: true
})

holidaySchema.plugin(uniqueValidator)

export default mongoose.model('Holiday', holidaySchema)