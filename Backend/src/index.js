import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { supabase } from './lib/supabase.js';

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

//get expenses from supabase
app.get('/api/expenses', async (req, res) => {
  const expenses = await supabase.from('expenses').select('*');
  if (expenses.error) {
    return res.status(500).json({ error: expenses.error.message });
  }
  res.json(expenses.data);
})

// CRUD expense
//add expense to supabase
app.post('/api/expenses', async (req, res) => {
  const { title, amount, category, expense_date, notes } = req.body;
  const { data, error } = await supabase.from('expenses').insert([{ title, amount, category, expense_date, notes }]).select();
  if (error) {
    return res.status(500).json({ error: error.message });
  }
  res.status(201).json(data[0]);
})

//update expense in supabase

app.patch('/api/expenses/:id', async (req, res) => {
  const { id } = req.params;
  const { title, amount, category, expense_date, notes } = req.body;

  const updates = {};

  if (title !== undefined) updates.title = title;
  if (amount !== undefined) updates.amount = amount;
  if (category !== undefined) updates.category = category;
  if (expense_date !== undefined) updates.expense_date = expense_date;
  if (notes !== undefined) updates.notes = notes;

  if (Object.keys(updates).length === 0) {
    return res.status(400).json({
      message: 'At least one field is required to update'
    });
  }

  const { data, error } = await supabase
    .from('expenses')
    .update(updates)
    .eq('id', id)
    .select();

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  if (!data || data.length === 0) {
    return res.status(404).json({ message: 'Expense not found' });
  }

  res.json(data[0]);
});

//delete expense from supabase
app.delete('/api/expenses/:id', async (req, res) => {
  const { id } = req.params;

  const { data, error } = await supabase
    .from('expenses')
    .delete()
    .eq('id', id)
    .select();

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  if (!data || data.length === 0) {
    return res.status(404).json({ message: 'Expense not found' });
  }

  res.json({
    message: 'Expense deleted successfully',
    data: data[0]
  });
});

//CRUD income 

/* GET income */
app.get('/api/income', async (req, res) => {
  const { data, error } = await supabase
    .from('income')
    .select('*');

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  res.json(data);
});

/* POST income */
app.post('/api/income', async (req, res) => {
  const { title, amount, source, income_Date, notes } = req.body;

  const { data, error } = await supabase
    .from('income')
    .insert([{ title, amount, source, income_Date, notes }])
    .select();

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  res.status(201).json(data[0]);
});

/* PATCH income */
app.patch('/api/income/:id', async (req, res) => {
  const { id } = req.params;
  const { title, amount, source, income_Date, notes } = req.body;

  const updates = {};
  if (title !== undefined) updates.title = title;
  if (amount !== undefined) updates.amount = amount;
  if (source !== undefined) updates.source = source;
  if (income_Date !== undefined) updates.income_Date = income_Date;
  if (notes !== undefined) updates.notes = notes;

  if (Object.keys(updates).length === 0) {
    return res.status(400).json({ message: 'Provide a field to update' });
  }

  const { data, error } = await supabase
    .from('income')
    .update(updates)
    .eq('id', id)
    .select();

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  if (!data || data.length === 0) {
    return res.status(404).json({ message: 'Income not found' });
  }

  res.json(data[0]);
});

/* DELETE income */
app.delete('/api/income/:id', async (req, res) => {
  const { id } = req.params;

  const { data, error } = await supabase
    .from('income')
    .delete()
    .eq('id', id)
    .select();

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  if (!data || data.length === 0) {
    return res.status(404).json({ message: 'Income not found' });
  }

  res.json({
    message: 'Income deleted successfully',
    data: data[0]
  });
});

// CRUD budget

/* GET budgets */
app.get('/api/budget', async (req, res) => {
  const { data, error } = await supabase
    .from('budget')
    .select('*');

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  res.json(data);
});

/* POST budget */
app.post('/api/budget', async (req, res) => {
  const { category, amount, month } = req.body;

  const { data, error } = await supabase
    .from('budget')
    .insert([{ category, amount, month }])
    .select();

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  res.status(201).json(data[0]);
});

/* PATCH budget */
app.patch('/api/budget/:id', async (req, res) => {
  const { id } = req.params;
  const { category, amount, month } = req.body;

  const updates = {};
  if (category !== undefined) updates.category = category;
  if (amount !== undefined) updates.amount = amount;
  if (month !== undefined) updates.month = month;

  if (Object.keys(updates).length === 0) {
    return res.status(400).json({ message: 'Provide a field to update' });
  }

  const { data, error } = await supabase
    .from('budget')
    .update(updates)
    .eq('id', id)
    .select();

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  if (!data || data.length === 0) {
    return res.status(404).json({ message: 'Budget not found' });
  }

  res.json(data[0]);
});

/* DELETE budget */
app.delete('/api/budget/:id', async (req, res) => {
  const { id } = req.params;

  const { data, error } = await supabase
    .from('budget')
    .delete()
    .eq('id', id)
    .select();

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  if (!data || data.length === 0) {
    return res.status(404).json({ message: 'Budget not found' });
  }

  res.json({
    message: 'Budget deleted successfully',
    data: data[0]
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
