import React, { useEffect, useState } from "react";
import ItemForm from "./ItemForm";
import Filter from "./Filter";
import Item from "./Item";

function ShoppingList() {
	const [selectedCategory, setSelectedCategory] = useState("All");
	const [items, setItems] = useState([]);

	function handleCategoryChange(category) {
		setSelectedCategory(category);
	}

	const itemsToDisplay = items.filter((item) => {
		if (selectedCategory === "All") return true;

		return item.category === selectedCategory;
	});

  function handleAddItem(item){
    setItems((prevItems)=>[...prevItems,item])
  }

	useEffect(() => {
		async function fetchItems() {
			try {
				const data = await fetch("http://localhost:4000/items");
				const itemArray = await data.json();
				setItems(itemArray);
			} catch (error) {
				console.log(`Error: ${error}`);
			}
		}
		fetchItems();
	}, []);

	return (
		<div className="ShoppingList">
			<ItemForm handleAddItem={handleAddItem}/>
			<Filter
				category={selectedCategory}
				onCategoryChange={handleCategoryChange}
			/>
			<ul className="Items">
				{itemsToDisplay.map((item) => (
					<Item key={item.id} item={item} />
				))}
			</ul>
		</div>
	);
}

export default ShoppingList;
