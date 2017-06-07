var express = require('express');
var app = express();
var PORT = 3000;

app.use(express.static('public'));
app.use(express.static('node_modules'));
app.listen(PORT, function(){
  console.log('app is listening on port', PORT);
});
