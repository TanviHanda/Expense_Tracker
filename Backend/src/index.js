import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { supabase } from './lib/supabase.js';

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Test route
app.get('/', (req, res) => {
  res.send('Expense Tracker API is running!');
});
app.get('/test-db', async (req, res) => {
  const {data,error} = await supabase 
  .from('expenses')
  .select('*')
  .limit(1);

  if(error) {
    return res.status(500).json({error: error.message});
  }
  res.json({
     message: 'Supabase connected successfully!',
     data,
  });
})
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
