const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
const config = require('../utils/config')
const logger = require('../utils/logger')

const url = config.MONGODB_URI

// console.log("Connecting to", url)

mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
}).then(() => {
  logger.info('Connected to MongoDB')
}).catch((error) => {
  logger.error('Error connecting to MongoDB:', error.message)
})

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minLength: 3,
  },
  author: {
    type: String,
    required: true,
    minLength: 2,
  },
  url: String,
  likes: {
    type: Number,
    required: false,
    default: 0,
  },
  user: {    
    type: mongoose.Schema.Types.ObjectId,    
    ref: 'User'  
  }
})
blogSchema.plugin(uniqueValidator)

blogSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Blog', blogSchema)

