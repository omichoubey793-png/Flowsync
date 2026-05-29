const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
  title:       { type: String, required: true },
  description: { type: String },
  tags:        [{ type: String }],
  imageUrl:    { type: String, required: true },
  s3Key:       { type: String, required: true },
  ownerId:     { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  ownerName:   { type: String },
  likesCount:  { type: Number, default: 0 },
}, { timestamps: true });

module.exports = mongoose.model('Image', imageSchema);