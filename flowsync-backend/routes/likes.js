const router = require('express').Router();
const Like  = require('../models/Like');
const Image = require('../models/Image');
const auth  = require('../middleware/auth');

// Like karo
router.post('/:imageId', auth, async (req, res) => {
  try {
    const existing = await Like.findOne({
      imageId: req.params.imageId,
      userId:  req.user.id,
    });
    if (existing) return res.status(400).json({ msg: 'Already liked' });

    await Like.create({ imageId: req.params.imageId, userId: req.user.id });
    await Image.findByIdAndUpdate(req.params.imageId, { $inc: { likesCount: 1 } });

    res.json({ msg: 'Liked ✅' });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

// Unlike karo
router.delete('/:imageId', auth, async (req, res) => {
  try {
    await Like.findOneAndDelete({
      imageId: req.params.imageId,
      userId:  req.user.id,
    });
    await Image.findByIdAndUpdate(req.params.imageId, { $inc: { likesCount: -1 } });

    res.json({ msg: 'Unliked ✅' });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

module.exports = router;