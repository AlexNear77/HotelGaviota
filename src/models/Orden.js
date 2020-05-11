const {Schema, model} =require('mongoose');

const ordenSchema = new Schema({
   orden:{type:String},
   total:{type:String},
   envio:{type:String},
   estado:{type:String},
   cliente:{type:String}

}, {
   timestamps:true
});

module.exports = model('Orden',ordenSchema);