/* 
1.) User can press a switch/checkbox to toggle between displaying all items or displaying only items that are unchecked
  -
2.) User can type in a search term and the displayed list will be filtered by item names only containing that search term
3.) User can edit the title of an item 
*/

'use strict';

const STORE = {
    items: [  
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
    ],
    hide: false,
    searchTerm: ''
};

function generateItemElement(item, itemIndex) {
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
    const items = shoppingList.map((item, index) => generateItemElement(item, index));
  
    return items.join('');
}

function renderShoppingList() {    
    // const shoppingListItemString = generateShoppingItemsString(STORE);
    // Create a shopping list that updates based on whether hide is true or false.

    let items = Array.from(STORE.items);

    if(STORE.hide === true) { items = Array.from(STORE.items).filter(item => !item.checked); }
    
    //call function to attaches the items to an index and then add this to the shopping list html.
    const shoppingListItemString = generateShoppingItemsString(items); //pass the array to generateShoppingItemsString
  
    $('.js-shopping-list').html(shoppingListItemString);
}


function addItemShoppingList(newItem) {
    STORE.items.push({name: newItem, checked: false});


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
    STORE.items[itemIndex].checked = !STORE.items[itemIndex].checked; 
}

function toggleHiddenCheckItems() {
  STORE.hide = !STORE.hide;
}
function handleHiddenCheckedItems(){
  $('#toggle-completed-items').click(function(event) {
    toggleHiddenCheckItems(STORE.items);
    renderShoppingList();
  })
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
    });
    console.log('\'handleCheckedItems\' ran');
}

function deleteItemFromStore (itemIndex) {
    STORE.items.splice(itemIndex, 1);
}

function handleDeletedItems() {
    // responsible for deleting items
    //Listen for "delete" click .shopping-item-delete
    //retrive the index of the item we want to delete from data attribute - used getItemIndexFromElement function
    //Remove from STORE object with splice - needs new function
    //Re-Render
    $('.js-shopping-list').on('click', '.js-item-delete', function(event){
        const itemIndex = getItemIndexFromElement(event.currentTarget);
        deleteItemFromStore(itemIndex);
        renderShoppingList();

    });
    console.log('\'handleDeletedItems\' ran');
}

function handleShoppingList() {
    // Calls all other functions to load when document ready
    renderShoppingList();
    handleNewItems();
    handleCheckedItems();
    handleDeletedItems();
    handleHiddenCheckedItems();


}

$(handleShoppingList);

