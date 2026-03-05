import mongoose from "mongoose";

const musicSchema = new mongoose.Schema({
      uri: {
<<<<<<< HEAD
          type: String,
          required: true
      },
      title: {
          type: String,
          required: true
      },
      artist: {
           type: mongoose.Schema.Types.ObjectId,
           ref: "user",
           required: true
=======
           type: String,
           require: true
      },

      title: {
           type: String,
           require: true
      },
      artist: {
           type: mongoose.Schema.Types.ObjectId,
           ref: 'user',
           require: true
>>>>>>> a4c94b0fc6dc463c73c16e953e637e6ff08cda25
      }
})

const musicModel = mongoose.model("music", musicSchema)

<<<<<<< HEAD
export default musicModel

=======
export default musicModel
>>>>>>> a4c94b0fc6dc463c73c16e953e637e6ff08cda25
