const router    = require('express').Router();
const SavedPost = require('../models/SavedPost');
const Image     = require('../models/Image');
const auth      = require('../middleware/auth');

// Save karo
router.post('/:imageId', auth, async (req, res) => {
  try {
    const existing = await SavedPost.findOne({
      imageId: req.params.imageId,
      userId:  req.user.id,
    });
    if (existing) return res.status(400).json({ msg: 'Already saved' });

    await SavedPost.create({
      imageId: req.params.imageId,
      userId:  req.user.id,
    });
    res.json({ msg: 'Saved ✅' });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

// Unsave karo
router.delete('/:imageId', auth, async (req, res) => {
  try {
    await SavedPost.findOneAndDelete({
      imageId: req.params.imageId,
      userId:  req.user.id,
    });
    res.json({ msg: 'Unsaved ✅' });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

// Apne saved posts dekho
router.get('/my', auth, async (req, res) => {
  try {
    const saved = await SavedPost.find({ userId: req.user.id })
      .populate('imageId')
      .sort({ createdAt: -1 });
    res.json(saved);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

module.exports = router;