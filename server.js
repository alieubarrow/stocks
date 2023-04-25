'use strict';

const PORT = 3000;

// The variable stocks has the same value as the variable stocks in the file 'stocks.js'
const stocks = require('./stocks.js').stocks;

const express = require("express");
const app = express();


app.use(express.urlencoded({
    extended: true
}));

app.use(express.static('public'));
// Note: Don't add or change anything above this line.

// Add your code here
app.post('/order', (req, res) => {
    
    const symbol = req.body.symbol;
  
    const stock = findStockBySymbol(symbol);
  
    const totalPrice = req.body.quantity * stock.price;
  
    const responseString = `You placed an order to buy ${req.body.quantity} stocks of ${stock.name}. 
    The price of one stock is $${stock.price.toLocaleString('en-US', { style: 'currency', currency: 'USD' })} 
    and the total price for this order is $${totalPrice.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}`;
  
    res.send(responseString);
  });

function findStockBySymbol(symbol) {
    return stocks.find(stock => stock.symbol === symbol);
  }

  function findStockByPrice(criterion) {
    let resultStock;
    let resultPrice;
  
    for (const stock of stocks) {
      const price = parseFloat(stock.price);
  
      if (!resultStock) {
        resultStock = stock;
        resultPrice = price;
      } else if (criterion === 'highest' && price > resultPrice) {
        resultStock = stock;
        resultPrice = price;
      } else if (criterion === 'lowest' && price < resultPrice) {
        resultStock = stock;
        resultPrice = price;
      }
    }
  
    return resultStock;
  }

app.get('/search', (req, res) => {
  const criterion = req.query.criterion;
  const stock = findStockByPrice(criterion);
  res.send(stock);
});

// Note: Don't add or change anything below this line.
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
});