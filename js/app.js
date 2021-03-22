//  storage controller

// Item controller - Immediately invoked function expression (IIFE)
const ItemCtrl = (function() {
    // item constructor
    const Item = function(id, name, calories) {
        this.id = id;
        this.name = name;
        this.calories = calories;
    }

    //  state/data structure constructor
    const data = {
        items: [
            { id: 0, name: 'Pizza', calories: 600 },
            { id: 1, name: 'Ham Burger', calories: 1200 },
        ],
        currentItem: null,
        totalCalories: 0
    }

    // public functions
    return {
        // returns items in the data structure
        getItems: function() {
            return data.items
        },

        // gets users input from the name and calories input field and adds it to the items data structure
        addItem: function(name, calories) {
            let ID;

            // generate ID
            if (data.items.length > 0) { // get the length of the array, subtract 1 from it 
                ID = data.items[data.items.length - 1].id + 1;
            } else {
                ID = 0;
            }

            //  parse calories to numbers
            calories = parseInt(calories);

            // create new item
            newItem = new Item(ID, name, calories);

            // push item to items array/data structure
            data.items.push(newItem);
            // newItem is returned because addItem function will be assigned to a variable
            return newItem;
        },

        // getItemById function
        getItemById: function(id) {
            let found = null;
            // loop through items
            data.items.forEach(function(item) {
                if (item.id === id) {
                    found = item;
                }
            });
            return found;
        },

        // updateItem function
        updateItem: function(name, calories) {
            // parse calories to number
            calories = parseInt(calories);

            let found = null;
            // loop through items
            data.items.forEach(function(item) {
                if (item.id === data.currentItem.id) {
                    item.name = name;
                    item.calories = calories;
                    found = item;
                }
            });
            return found;
        },

        // setCurrentItem function
        setCurrentItem: function(item) {
            data.currentItem = item
        },

        // getCurrentItem function
        getCurrentItem: function() {
            return data.currentItem;
        },

        // getTotalCalories function
        getTotalCalories: function() {
            let total = 0;
            // loop through the items to get the value of each calorie
            data.items.forEach(function(item) {
                total += item.calories;
            });
            // set the attribute 'totalCalories' in data to hold the value of total
            data.totalCalories = total;

            // return toal
            return data.totalCalories;
        },

        // show the hard coded data
        logData: function() {
            return data;
        }
    }
})();

//  UI controller
const UICtrl = (function() {
    // stores all the UI selectors in one place, so incase a selector is changed, 
    // we only need to change it here rather than changing it everywhere it appears
    const UISelectors = {
        itemList: 'item-list',
        addBtn: '.add-btn',
        updateBtn: '.update-btn',
        deleteBtn: '.delete-btn',
        backBtn: '.back-btn',
        itemNameInput: '#item-name',
        itemCaloriesInput: '#item-calories',
        mainForm: 'form',
        totalCalories: '.total-calories',
        listItems: '#item-list li',
    }

    // public methods
    return {
        populateItemList: function(items) {
            let html = '';

            items.forEach(function(item) {
                html += `
                <li class="collection-item" id="item-${item.id}">
                    <strong>${item.name}: </strong> <em>${item.calories}</em>
                    <a href="#" class="secondary-content">
                        <i class="edit-item fa fa-pencil"></i>
                    </a>
                </li>`;
            });

            // add item to DO
            document.getElementById(UISelectors.itemList).innerHTML = html;
        },

        getItemInput: function() {
            return {
                name: document.querySelector(UISelectors.itemNameInput).value,
                calories: document.querySelector(UISelectors.itemCaloriesInput).value,
            }
        },

        // add newItem to UI list
        addListItem: function(item) {
            // show the list because its hidden initialially if the length of the list is 0
            document.getElementById(UISelectors.itemList).style.display = 'block';

            // create li element
            const li = document.createElement('li');
            // add class name
            li.className = 'collection-item';
            // add the dynamic id
            li.id = `item-${item.id}`;
            // add HTML
            li.innerHTML = `
            <strong>${item.name}: </strong> <em>${item.calories}</em>
            <a href="#" class="secondary-content">
                <i class="edit-item fa fa-pencil"></i>
            </a>`
                // insert li to DOM
            document.getElementById(UISelectors.itemList).insertAdjacentElement('beforeend', li);
        },

        // updateListItem function
        updateListItem: function(item) {
            // get all list items and returns a nodelist
            let listItems = document.querySelectorAll(UISelectors.listItems);

            // convert nodelist into an array
            listItems = Array.from(listItems);

            // loop through items
            listItems.forEach(function(listItem) {
                const itemID = listItem.getAttribute('id');

                if (itemID === `item-${item.id}`) {
                    document.querySelector(`#${itemID}`).innerHTML = `
                    <strong>${item.name}: </strong> <em>${item.calories}</em>
                    <a href="#" class="secondary-content">
                        <i class="edit-item fa fa-pencil"></i>
                    </a>`
                }
            });
        },

        //  clearinputfields function
        clearInputFields: function() {
            // document.querySelector(UISelectors.itemNameInput).value = '';
            // document.querySelector(UISelectors.itemCaloriesInput).value = '';
            // reset form
            document.getElementById(UISelectors.mainForm).reset();
        },

        // addItemToForm function
        addItemToForm: function() {
            document.querySelector(UISelectors.itemNameInput).value = ItemCtrl.getCurrentItem().name;
            document.querySelector(UISelectors.itemCaloriesInput).value = ItemCtrl.getCurrentItem().calories;
            // hide all buttons except the updateBtn
            UICtrl.showEditState();
        },


        // hides item list if no item is in the list, this removes the line drawn by the <ul class"collection></ul>
        hideList: function() {
            document.getElementById(UISelectors.itemList).style.display = 'none';
        },

        // showTotalCalories function
        showTotalCalories: function(totalCalories) {
            document.querySelector(UISelectors.totalCalories).textContent = totalCalories;
        },

        // function clears the input fields, hides the updateBtn, deleteBtn, backBtn and shows the addBtn when app is loaded
        clearEditState: function() {
            UICtrl.clearInputFields();
            document.querySelector(UISelectors.updateBtn).style.display = 'none';
            document.querySelector(UISelectors.deleteBtn).style.display = 'none';
            document.querySelector(UISelectors.backBtn).style.display = 'none';
            document.querySelector(UISelectors.addBtn).style.display = 'inline';
        },

        // showEditState function: show only the updateBtn
        showEditState: function() {
            document.querySelector(UISelectors.updateBtn).style.display = 'inline';
            document.querySelector(UISelectors.deleteBtn).style.display = 'inline';
            document.querySelector(UISelectors.backBtn).style.display = 'inline';
            document.querySelector(UISelectors.addBtn).style.display = 'none';
        },

        // returns an object of DOM selectors
        getSelectors: function() {
            return UISelectors;
        }
    }
})();


// App controller
const AppCtrl = (function(ItemCtrl, UICtrl) {
    // load event listeners
    const loadEventListeners = function() {
        const UISelectors = UICtrl.getSelectors();

        // add item event
        document.querySelector(UISelectors.addBtn).addEventListener('click', itemAddSubmit);

        // disable enter key
        document.addEventListener('keypress', function(e) {
            // check which key was hit; 13 represents the enter key; keyCode for newer browsers and which for older browsers
            if (e.keyCode === 13 || e.which === 13) {
                e.preventDefault();
                return false;
            }
        });

        // edit item event
        document.getElementById(UISelectors.itemList).addEventListener('click', itemEditClick);

        // itemUpdateEvent
        document.querySelector(UISelectors.updateBtn).addEventListener('click', itemUpdateEvent);
    }

    // itemAddSubmit function
    const itemAddSubmit = function(e) {
        // get form input from UI controller
        const input = UICtrl.getItemInput();

        // check for name and calorie input
        if (input.name !== '' && input.calories !== '') {
            // add item 
            const newItem = ItemCtrl.addItem(input.name, input.calories);
            // add newItem to UI list
            UICtrl.addListItem(newItem);

            // get the total calories
            const totalCalories = ItemCtrl.getTotalCalories();

            // add totalCalories to the UI
            UICtrl.showTotalCalories(totalCalories);

            // after adding newItem, clear fields
            // UICtrl.getElementById(mainForm).reset(); // reset form
            UICtrl.clearInputFields();
        }

        e.preventDefault();

    }

    // itemEditClick function using event delegation because the list was added after the page loaded
    const itemEditClick = function(e) {
        if (e.target.classList.contains('edit-item')) {
            // get list item id (item-0, item-1)
            const listId = e.target.parentNode.parentNode.id; // ie <li class="collection-item" id="item-1">...</li>      

            // split on '-' into an array of 2 elements i.e item & 0
            const listIdArr = listId.split('-');
            const id = parseInt(listIdArr[1]);

            // get item to edit
            const itemToEdit = ItemCtrl.getItemById(id);

            // set currentItem to itemToEdit
            ItemCtrl.setCurrentItem(itemToEdit);

            // add current item to form i.e meal and calories field
            UICtrl.addItemToForm();
        } else {

        }

        e.preventDefault();
    }

    // itemUpdateEvent function
    const itemUpdateEvent = function(e) {
        // getItemInput
        const input = UICtrl.getItemInput();
        // update item
        const updatedItem = ItemCtrl.updateItem(input.name, input.calories);
        // update UI
        UICtrl.updateListItem(updatedItem);

        // get the total calories
        const totalCalories = ItemCtrl.getTotalCalories();

        // add totalCalories to the UI
        UICtrl.showTotalCalories(totalCalories);

        UICtrl.clearEditState();

        e.preventDefault();
    }

    // return public methods
    return {
        init: function() {
            // clearedit state/set initial set
            UICtrl.clearEditState();
            //  get items from data structure
            const items = ItemCtrl.getItems();

            // after the items have been fetched, hide the ul tag if items length is equal to 0
            if (items.length === 0) {
                UICtrl.hideList();
            } else {

                // populate list with items
                UICtrl.populateItemList(items);

                // get the total calories
                // const totalCalories = ItemCtrl.getTotalCalories();

                // // adde totalCalories to the UI
                // UICtrl.showTotalCalories(totalCalories);
            }

            // get the total calories
            const totalCalories = ItemCtrl.getTotalCalories();

            // adde totalCalories to the UI
            UICtrl.showTotalCalories(totalCalories);

            // load event listeners
            loadEventListeners();

        }
    }
})(ItemCtrl, UICtrl);


// initialise app
AppCtrl.init();