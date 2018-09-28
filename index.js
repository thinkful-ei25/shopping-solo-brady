// 1. Must be able to see current shopping list
// 2. Must be able to add items
// 3. Check and cross off completed items
// 4. Delete items


'use strict';

function renderShoppingList() {
  console.log(`'renderShoppingList' ran`);
  //responsible for displaying shopping list in DOM
}

function handleNewItems() {
  //responsible for handling when users add new items
  console.log(`'handleNewItems' ran`);
}

function handleCheckedItems() {
  //responsible for handling when users mark an item as checked
  console.log(`'handleCheckedItems' ran`);
}

function handleDeletedItems() {
  // responsible for deleting items
  console.log(`'handleDeletedItems' ran`)
}

function handleShoppingList() {
  // Calls all other functions to load when document ready
  renderShoppingList();
  handleNewItems();
  handleCheckedItems();
  handleDeletedItems();


}

$(handleShoppingList)

