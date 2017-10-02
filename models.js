// const uuid = require('uuid');

// function StorageException(message) {
//    this.message = message;
//    this.name = "StorageException";
// }

// const dictionary = {
//   create: function(year, english, lao) {
//     const word = {
//       id: uuid.v4(),
//       year: year,
//       english: english,
//       lao: lao
//     };
//     this.words.push(word);
//     return word;
//   },
//   get: function(id=null) {
//     if (id !== null) {
//       return this.words.find(word => word.id === id);
//     }
//     return this.words;
//   },
//   delete: function(id) {
//     const wordIndex = this.words.findIndex(
//       word => word.id === id);
//     if (wordIndex > -1) {
//       this.words.splice(wordIndex, 1);
//     }
//   },
//   update: function(updatedWord) {
//     const {id} = updatedWord;
//     const wordIndex = this.words.findIndex(
//       word => word.id === updatedWord.id);
//     if (wordIndex === -1) {
//       throw new StorageException(
//         `Can't update item \`${id}\` because doesn't exist.`)
//     }
//     this.words[wordIndex] = Object.assign(
//       this.words[wordIndex], updatedWord);
//     return this.words[wordIndex];
//   }
// };

// function createWords() {
//   const storage = Object.create(dictionary);
//   storage.words = [];
//   return storage;
// }


// module.exports = {dictionary: createWords()};

const mongoose = require('mongoose');

const vocabSchema = mongoose.Schema({
  year:{type: Number, required: true},
  type:{type: String, require:true},
  english:{type: String,required: true},
  lao:{type: String,required: true}
});


// this is an *instance method* which will be available on all instances
// of the model. This method will be used to return an object that only
// exposes *some* of the fields we want from the underlying data
vocabSchema.methods.apiRepr = function() {
  return {
    year: this.year,
    type: this.type,
    english: this.english,
    lao: this.lao  
  };
}

const Vocab = mongoose.model('terms', vocabSchema);
module.exports = {Vocab};



