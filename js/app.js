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
            { id: 2, name: 'Cookies', calories: 400 },
            { id: 3, name: 'Chocolate cake', calories: 700 },
        ],
        currentItem: null,
        totalCalories: 0
    }

    // public
    return {
        getItems: function() {
            return data.items
        },

        addItem: function(name, calories) {
            let ID;

            // generate ID
            if (data.items.length > 0) {
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

            return newItem;

        },
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
        itemNameInput: '#item-name',
        itemCaloriesInput: '#item-calories'
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

            // add item to dom
            document.getElementById(UISelectors.itemList).innerHTML = html;
        },

        getItemInput: function() {
            return {
                name: document.querySelector(UISelectors.itemNameInput).value,
                calories: document.querySelector(UISelectors.itemCaloriesInput).value,
            }
        },

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
    }

    // itemAddSubmit function
    const itemAddSubmit = function(e) {
        e.preventDefault;

        // get form input from UI controller
        const input = UICtrl.getItemInput();

        // check for name and calorie input
        if (input.name !== '' && input.calories !== '') {
            // add item 
            const newItme = ItemCtrl.addItem(input.name, input.calories);
        }

    }

    // public methods
    return {
        init: function() {
            //  get items from data structure
            const items = ItemCtrl.getItems();

            // populate list with items
            UICtrl.populateItemList(items);

            // load event listeners
            loadEventListeners();

        }
    }
})(ItemCtrl, UICtrl);


// initialise app
AppCtrl.init();