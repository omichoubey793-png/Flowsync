const router = require('express').Router();
const { DeleteObjectCommand } = require('@aws-sdk/client-s3');
const { s3, upload } = require('../config/s3');
const Image = require('../models/Image');
const auth  = require('../middleware/auth');

// GET — sari images dekho
router.get('/', async (req, res) => {
  try {
    const images = await Image.find().sort({ createdAt: -1 });
    res.json(images);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

// GET — tag se search karo
router.get('/search', async (req, res) => {
  try {
    const { tag } = req.query;
    if (!tag) return res.status(400).json({ msg: 'Tag required' });
    const images = await Image.find({
      tags: { $in: [tag.toLowerCase()] }
    }).sort({ createdAt: -1 });
    res.json(images);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

// POST — image upload karo
router.post('/', auth, upload.single('image'), async (req, res) => {
  try {
    const { title, description, tags } = req.body;
    const image = await Image.create({
      title,
      description,
      tags: tags ? tags.split(',').map(t => t.trim().toLowerCase()) : [],
      imageUrl:  req.file.location,
      s3Key:     req.file.key,
      ownerId:   req.user.id,
      ownerName: req.user.fullName,
    });
    res.status(201).json(image);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

// DELETE — image delete karo (sirf owner)
router.delete('/:id', auth, async (req, res) => {
  try {
    const image = await Image.findById(req.params.id);
    if (!image) return res.status(404).json({ msg: 'Image not found' });
    if (image.ownerId.toString() !== req.user.id)
      return res.status(403).json({ msg: 'Only owner can delete' });

    // S3 se delete karo
    await s3.send(new DeleteObjectCommand({
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: image.s3Key,
    }));

    // MongoDB se delete karo
    await image.deleteOne();
    res.json({ msg: 'Deleted successfully' });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

module.exports = router;