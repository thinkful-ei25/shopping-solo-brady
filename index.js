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
    searchedItems: [],
    searchTerm: ''   
};

//MULTI-USE FUNCTIONS

//Inputs each item into necessary CSS
function generateItemElement(item) {
    let itemIndex = STORE.items.indexOf(item);
    return `
    <li class="js-item-index-element" data-item-index="${itemIndex}">
      <span contenteditable="true" class="shopping-item js-shopping-item ${item.checked ? 'shopping-item__checked' : ''}">${item.name}</span>
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

// Aggregrates individual items into one signular list.
function generateShoppingItemsString(shoppingList) {
    // takes in argument shoppingList
    
    const items = shoppingList.map((item, index) => generateItemElement(item, index)); //updates index
    return items.join('');
}


// Sends the list of items (filtered or un-filtered) to DOM
function renderShoppingList() {    
    let filteredItems = [...STORE.items];

    if(STORE.searchTerm.length !== 0) {
        filteredItems = STORE.searchedItems;
        console.log('these are', filteredItems);
    }
    if(STORE.hide){
        filteredItems = filteredItems.filter(item => !item.checked);
    }
    const shoppingListItemString = generateShoppingItemsString(filteredItems); 
    $('.js-shopping-list').html(shoppingListItemString);
}

//Returns the index of an Item in the Store
function getItemIndexFromElement(item) {
    const itemIndexString = $(item)
        .closest('.js-item-index-element')
        .attr('data-item-index');
    return parseInt(itemIndexString, 10);

}

/* NEW ITEM FUNCTIONS
    addItemShoppingList(newItem) - pushes new item to STORE
    handleNewItems() - adds item iput to STORE
 */

//Pushes new item to STORE. Called by handleNewItems
function addItemShoppingList(newItem) {
    STORE.items.push({name: newItem, checked: false});
}

//Adds item from input to STORE
function handleNewItems() {
    $('#js-shopping-list-form').submit(function(event) {
        event.preventDefault();
        const newItem = $('.js-shopping-list-entry').val();
        $('.js-shopping-list-entry').val('');
        addItemShoppingList(newItem);
        renderShoppingList();
    });
}

//END OF NEW ITEM FUNCTION

/* CHECKED PROPERTY FUNCTIONS
    toggleCheckedForListItem() - Toggles the checked property of the item in STORE
    handleCheckedItems() - Responsible for handling when a users marks an item as checked 
*/

//Toggles the Checked property for an item
function toggleCheckedForListItem (itemIndex){
    STORE.items[itemIndex].checked = !STORE.items[itemIndex].checked; 
}

//Responsible for handling when a users marks an item as checked
function handleCheckedItems() {
    $('.js-shopping-list').on('click', '.js-item-toggle', function(event) {
        const itemIndex = getItemIndexFromElement(event.currentTarget);
        toggleCheckedForListItem(itemIndex);
        renderShoppingList();
    });
}

//END OF CHECKED PROPERTY FUNCTIONS

/* HIDE CHECKED ITEM FUNCTIONS
    toggleHiddenCheckItems() - Toggles the hide property in STORE obj
    handleHiddenCheckedItems() - Responsbile for handling when a user clicks hide checked items
*/

// Toggles the hide property in STORE obj
function toggleHiddenCheckItems() { 
    STORE.hide = !STORE.hide;
}

// Responsbile for handling when a user clicks hide checked items
function handleHiddenCheckedItems(){
    $('#toggle-completed-items').click(function() {
        toggleHiddenCheckItems();
        renderShoppingList();
    });
}

// END OF HIDE CHECKED ITEM FUNCTIONS

/* DELETE ITEM FUNCTIONS
    deleteItemFromStore() - removes the deleted item from STORE obj
    handleDeletedItems() - Responsbile for handling when user clicks delete button
*/

//Removes the deleted item from STORE obj
function deleteItemFromStore (itemIndex) {
    STORE.items.splice(itemIndex, 1);
}
//Responsbile for handling when user clicks delete button
function handleDeletedItems() {
    $('.js-shopping-list').on('click', '.js-item-delete', function(event){
        const itemIndex = getItemIndexFromElement(event.currentTarget);
        deleteItemFromStore(itemIndex);
        renderShoppingList();

    });
}
// END OF DELETE ITEM FUNCTIONS


// SEARCH FUNCTIONS
// listen for inputs from the search box

function compareSearchTerm () {
    let searchTerm = new RegExp(STORE.searchTerm, 'g');
    if(STORE.searchTerm !== '') {
        STORE.searchedItems = STORE.items.filter(item => item.name.match(searchTerm));  //should return the matched searches
    } else{ STORE.searchedItems = [];}
    
    console.log(STORE.searchedItems);
}

function handleSearch() {
    $('.js-shopping-list-search').keypress(function(event) {
        if(event.keycode === 13) {
            event.preventDefault();
        }
    });

//Update to pass nothing, and use STORE above. 
    $('.js-shopping-list-search').on('keyup', function() {
        STORE.searchTerm = $(this).val().toLowerCase();
        //const searchTerm = $(this).val().toLowerCase();
        //console.log('we ran handleSearch');
        compareSearchTerm();
        renderShoppingList();

    });
}


//Listen for linput on the .js-shopping-item
//Get the index of that item from the store
//Update the name of the item to be the new text input
//re-render
function handleEditItem() {
    $('.js-shopping-item').on('input', function(event) {
        const itemIndex = getItemIndexFromElement(event.currentTarget); //assigning the index of the the editted item to itemIndex
        const updatedItem = STORE.items[itemIndex];
        updatedItem.name = event.currentTarget.innerHTML;
        renderShoppingList();
    });
}




// Calls all other functions to load when document ready
function handleShoppingList() {
    // Calls all other functions to load when document ready
    renderShoppingList();
    handleNewItems();
    handleCheckedItems();
    handleDeletedItems();
    handleHiddenCheckedItems();
    handleSearch();
    handleEditItem();
}

$(handleShoppingList);
