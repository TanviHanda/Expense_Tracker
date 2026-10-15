import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { supabase } from './lib/supabase.js';

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Expense Tracker API is running!');
});
app.get('/test-db', async (req, res) => {
  const {data,error} = await supabase 
  .from('expenses')
  .select('*')
  .limit(1);
})
//get expenses from supabase
app.get('/api/expenses', async(req,res) => {
  const expenses = await supabase.from('expenses').select('*');
  if(expenses.error) {
    return res.status(500).json({error: expenses.error.message});
  }
  res.json(expenses.data);
})

//add expense to supabase
app.post('/api/expenses', async(req,res) => {
  const { title, amount, category, expense_date, notes } = req.body;
  const { data, error } = await supabase.from('expenses').insert([{ title, amount, category, expense_date, notes }]).select();
  if(error) {
    return res.status(500).json({error: error.message});
  }
  res.status(201).json(data);
})
console.log('Secret key loaded:', Boolean(process.env.SUPABASE_SECRET_KEY));
console.log('Supabase URL loaded:', Boolean(process.env.SUPABASE_URL));
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
