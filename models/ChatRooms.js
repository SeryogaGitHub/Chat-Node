const {Schema, model} = require('mongoose');
const ChatRooms = new Schema({
  id: {
    type: String,
    required: true
  },
  name: {
    type: String,
    default: false
  }
})

module.exports = model('ChatRooms', ChatRooms)