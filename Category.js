const mongoose = require('mongoose');
const ProductCategory = new mongoose.Schema({
    newCategoryName: {
        type: String,
        required: true
    },
});

module.exports = mongoose.model('categorie', ProductCategory);
