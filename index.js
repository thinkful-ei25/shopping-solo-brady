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

function renderShoppingList() {
    console.log('\'renderShoppingList\' ran');
    //responsible for displaying shopping list in DOM
    // we will need to place all shopping list items in <ul class="shopping-list js-shopping-list"> 
    // Using STORE, translate each item as a string representing <li> with:
    // Item Name as inner text
    //Item's index in Store set as a data attribute on the <li>
    // item's checked status state (true or false) - this will render the presence or absence of a css class
    // Joing these together as one long string
    // insert <li> string inside of the the .js-shopping-list <ul> in the dom
    
    const shoppingListItemString = '<li>apples</li>';
    //places shoppingListItemString into the Shopping List <ul>
    $('.js-shopping-list').html(shoppingListItemString);
}

function handleNewItems() {
    //responsible for handling when users add new items
    console.log('\'handleNewItems\' ran');
}

function handleCheckedItems() {
    //responsible for handling when users mark an item as checked
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

