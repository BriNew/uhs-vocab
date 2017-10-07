const mongoose = require('mongoose');

const vocabSchema = mongoose.Schema({
  // id:{type: String, required: true},
  year:{type: String, required: true},
  type:{type: String, required: false},
  english:{type: String, required: true},
  lao:{type: String, required: true}
});

vocabSchema.methods.apiRepr = function() {
  return {
    id: this._id,
    year: this.year,
    type: this.type,
    english: this.english,
    lao: this.lao  
  };
}

const Vocab = mongoose.model('Terms', vocabSchema);
module.exports = {Vocab};



