select product_id, product_name, quantity from products p 
	join stocks using(product_id) 
	join stores using(store_id)
	where store_id = 1 and category_id = 5
	order by product_name;
