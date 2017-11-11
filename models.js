const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const mongoosePaginate = require('mongoose-paginate');

const vocabSchema = mongoose.Schema({
  year:{type: String, required: true},//change to Number?
  type_select:{type: String, required: true},//change to type_select?
  english:{type: String, required: true, unique: true},
  lao:{type: String, required: true}
});

vocabSchema.plugin(uniqueValidator);
vocabSchema.plugin(mongoosePaginate);

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






