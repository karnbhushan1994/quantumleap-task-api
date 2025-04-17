import app from './app.js';
import { connectDB } from './config/db.js';

const PORT = process.env.PORT || 5000;
connectDB(); // Will use process.env.MONGODB_URI

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
