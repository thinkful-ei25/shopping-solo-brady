// 1. Must be able to see current shopping list
// 2. Must be able to add items
// 3. Check and cross off completed items
// 4. Delete items


'use strict';

const STORE = [
    {
        name: 'apples',
        checked: false
    },
    {
        name: 'oranges',
        checked: false
    },
    {
        name: 'milk',
        checked: true
    },
    {
        name: 'bread',
        checked: false
    }
];

function generateItemElement(item, itemIndex, template) {
    return `
    <li class="js-item-index-element" data-item-index="${itemIndex}">
      <span class="shopping-item js-shopping-item ${item.checked ? 'shopping-item__checked' : ''}">${item.name}</span>
      <div class="shopping-item-controls">
        <button class="shopping-item-toggle js-item-toggle">
            <span class="button-label">check</span>
        </button>
        <button class="shopping-item-delete js-item-delete">
            <span class="button-label">delete</span>
        </button>
      </div>
    </li>`;
}


function generateShoppingItemsString(shoppingList) {
    // takes in argument shoppingList
    console.log('Generating shopping list element');
    const items = shoppingList.map((item, index) => generateItemElement(item, index));
  
    return items.join('');
}

function renderShoppingList() {
    console.log('\'renderShoppingList\' ran');
    // Responsible for displaying shopping list in DOM
    // Places all shopping items in <ul class="shopping-list js-shopping-list"> 
    // Joing these together as one long string
    // insert <li> string inside of the the .js-shopping-list <ul> in the dom
    
    const shoppingListItemString = generateShoppingItemsString(STORE);
    //places shoppingListItemString into the Shopping List <ul>
    $('.js-shopping-list').html(shoppingListItemString);
}

function addItemShoppingList(newItem) {
  STORE.push({name: newItem, checked: false});


}


function handleNewItems() {
    //responsible for handling when users add new items
    // Listen for when users submit new list item
    // Take in name of text input form and clear item input from form
    // Add item to STORE as a new object. Name = val() Checked: False
    // Re-Render the list with new STORE update.
    $('#js-shopping-list-form').submit(function(event) {
        event.preventDefault();
        const newItem = $('.js-shopping-list-entry').val();
        $('.js-shopping-list-entry').val('');
        addItemShoppingList(newItem);
        renderShoppingList();
    });
    
}

function getItemIndexFromElement(item) {
  const itemIndexString = $(item).closest('.js-item-index-element').attr('data-item-index');
  return parseInt(itemIndexString, 10);
}

function crossCheckedItems(itemIndex){
STORE[itemIndex].checked = !STORE[itemIndex].checked; 
}

function handleCheckedItems() {
    //responsible for handling when users mark an item as checked
    //Listen for 'check' click
    //Retrieve item index in STORE from data attribute
    //Toggle checked property for item at index
    //Re-render
    
    $('.js-shopping-list').on('click', '.js-item-toggle', function(event) {
      const itemIndex = getItemIndexFromElement(event.currentTarget);
      crossCheckedItems(itemIndex);
      renderShoppingList();
    })
    console.log('\'handleCheckedItems\' ran');
}

function handleDeletedItems() {
    // responsible for deleting items
    console.log('\'handleDeletedItems\' ran');
}

function handleShoppingList() {
    // Calls all other functions to load when document ready
    renderShoppingList();
    handleNewItems();
    handleCheckedItems();
    handleDeletedItems();


}

$(handleShoppingList);

