const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
app.post('/api/customers', (req, res) => {
  const customers = [
    {id: 1, firstName: 'John', lastName: 'Doe'},
    {id: 2, firstName: 'Brad', lastName: 'Traversy'},
    {id: 3, firstName: 'Mary', lastName: 'Swanson'},
  ];
  res.json(customers);
});

const port = 4701;

app.listen(port, () => `Server running on port ${port}`);