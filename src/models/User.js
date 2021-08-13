import mongoose from 'mongoose';

const Schema = new mongoose.Schema({
  firstName: {
  type: String,
  required: true
  },
  lastName: {
  type: String,
  required: true
  },
  email: {
  type: String,
  required: true,
  unique: true
  },
  active: {
  type: Boolean,
  },
})

export default mongoose.model('UserGQL', Schema)