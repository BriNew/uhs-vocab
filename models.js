const mongoose = require('mongoose');

const vocabSchema = mongoose.Schema({
  // id:{type: String, required: true},
  year:{type: String, required: true},//change to Number?
  type_select:{type: String, required: false},//change to type_select?
  english:{type: String, required: true},
  lao:{type: String, required: true}
});

vocabSchema.methods.apiRepr = function() {
  return {
    id: this._id,
    year: this.year,
    type_select: this.type_select,
    english: this.english,
    lao: this.lao  
  };
}

const Vocab = mongoose.model('Terms', vocabSchema);
module.exports = {Vocab};



