const mongoose = require('mongoose')
const mongoURI = process.env.MONGODB_URI

const client = async () => {
  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('DB Connected')
  } catch (error) {
    console.log('Error', error.message)
  }
}

module.exports = client
