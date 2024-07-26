const fs = require('fs');
const express = require('express');
const url = require('url');
const slugify = require('slugify');
const replaceTemplate = require('./modules/replaceTemplate');

const tempOverview = fs.readFileSync(
  `${__dirname}/templates/template-overview.html`,
  'utf-8'
);
const tempCard = fs.readFileSync(
  `${__dirname}/templates/template-card.html`,
  'utf-8'
);
const tempProduct = fs.readFileSync(
  `${__dirname}/templates/template-product.html`,
  'utf-8'
);

const app = express();

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
const dataObj = JSON.parse(data);

const slugs = dataObj.map((el) => slugify(el.productName, { lower: true }));

// Overview page
app.get('/', (req, res) => {
  res.writeHead(200, {
    'Content-type': 'text/html',
  });
  const cardsHtml = dataObj.map((el) => replaceTemplate(tempCard, el)).join('');
  const output = tempOverview.replace('{%PRODUCT_CARDS%}', cardsHtml);
  res.end(output);
});
// Product page
app.get('/product', (req, res) => {
  const { query } = url.parse(req.url, true);
  res.writeHead(200, {
    'Content-type': 'text/html',
  });
  const product = dataObj[query.id];
  const output = replaceTemplate(tempProduct, product);
  res.end(output);
});

app.get('*', (req, res) => {
  res.send(404, 'Not Found');
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log('Listening to requests on port 4000');
});
