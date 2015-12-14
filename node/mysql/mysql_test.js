var mysql = require('mysql');
var connection = mysql.createConnection({
	host: 'customers10-master.db.lightspeedappstg.com',
	user: 'php_user',
	password: 'phyno4d',
	database: 'cust76772',
});
connection.connect();
var query_str = "SELECT category.full_path_name" +
" FROM category" + 
" JOIN item on item.category_id = category.category_id" +
" JOIN transaction_line on transaction_line.item_id = item.item_id" +
" JOIN transaction ON transaction.transaction_id = transaction_line.transaction_id" +
" WHERE transaction.shop_id = '1'  AND transaction.time_stamp >= '2015-10-26 00:00:00' AND transaction.time_stamp <= '2015-10-28 23:59:59'";

connection.query(query_str, function(err, rows, fields) {
  if (err) throw err;

  var categories = {};
  rows.forEach(function(row) {
	var category = row.full_path_name.split('|||');
	var cat_str = category.shift();
	categories[cat_str] = true;
	category.forEach(function(cat) {
		cat_str += ('|||'+cat);
		categories[cat_str] = true;
	});
  });
  var count = 0;
  for (var prop in categories) {
	  count++;
  }
  console.log(count);
});

connection.end();
