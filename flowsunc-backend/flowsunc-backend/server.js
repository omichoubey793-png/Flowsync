const express = require('express');
const cors    = require('cors');
const dotenv  = require('dotenv');
const connectDB = require('./config/db');

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth',       require('./routes/auth'));
app.use('/api/images',     require('./routes/images'));
app.use('/api/likes',      require('./routes/likes'));
app.use('/api/savedposts', require('./routes/savedPosts'));

// Health check
app.get('/', (req, res) => res.json({ msg: 'FlowSync API running ✅' }));

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});