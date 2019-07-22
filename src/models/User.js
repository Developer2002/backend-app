const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true,
    lowercase: true,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
  },
  password: {
    type: String,
    required: true,
    select: false,
    minlength: 6,
    maxlength: 25,
  },
  biography: {
    type: String,
    default: 'Hey there! I am using app.',
    maxlength: 100,
  },
  age: {
    type: Number,
    required: true,
  },
  sign: {
    type: String,
    enum: ['Aquário', 'Peixes', 'Áries', 'Touro', 'Gêmeos', 'Câncer', 'Leão', 'Virgem', 'Libra', 'Escorpião', 'Sargitário', 'Capricórnio'],
    required: true,
  },
  city: {
    type: String,
    required: true,
    enum: ['Araçatuba'],
  },
}, {
  timestamps: true,
});

UserSchema.pre('save', async function(next) {
  const hash = await bcrypt.hash(this.password, 10);
  this.password = hash;

  next();
});

module.exports = mongoose.model('User', UserSchema);