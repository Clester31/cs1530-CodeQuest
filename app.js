function loadProfile(data) {
    // Display the submitted data in the profile section
    document.getElementById('profile-name').textContent = data.name || 'N/A';
    document.getElementById('profile-email').textContent = data.email || 'N/A';
    document.getElementById('profile-username').textContent = data.username || 'N/A';
} class User {
    constructor(firstName, lastName, email, birthday) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.birthday = birthday;
    }

    login() {
        //WIP
    }

    logOut() {
        //WIP
    }

    createAccount() {
        //WIP
    }
}

class Educator extends User {
    constructor(firstName, lastName, email, birthday, cirriculum, learningObjectives, levelMaps, levels) {
        super(firstName, lastName, email, birthday);
        this.cirriculum = cirriculum;
        this.learningObjectives = learningObjectives;
        this.levelMaps = levelMaps;
        this.levels = levels;
    }

    editLevel() {
        // WIP
    }

    // pushes new level to the level array
    createLevel(levelCode, levelNumber, levelUnlocked, levelCodeSolution, challengeDescription) {
        levels.push(new Level(levelCode, levelNumber, levelUnlocked, levelCodeSolution, challengeDescription));
    }

    editCirriculum() {
        // WIP
    }

    editLearningObjectives() {
        // WIP
    }
}

// subclass of User
class Student extends User {
    constructor(firstName, lastName, email, birthday, userName, skillLevel, coins, inventory) {
        super(firstName, lastName, email, birthday);
        this.userName = userName;
        this.skillLevel = skillLevel;
        this.coins = coins;
        this.inventory = inventory;
    }

    setSkillLevel(newSkillLevel) {
        this.skillLevel = newSkillLevel;
    }
}

class LevelMap {
    constructor(levels, levelsCompleted, levelsUnlocked, levelsLocked) {
        this.levels = levels;
        this.levelsCompleted = levelsCompleted;
        this.levelsUnlocked = levelsUnlocked;
        this.levelsLocked = levelsLocked;
    }

    // create a new coding environemnt and switch pages. Pass in some parameters in the URL string to be used to set up the level
    selectLevel(level) {
        const ce = new CodingEnvironment(level, "javascript", level.levelCode);
        window.location.href = `level.html?levelNum=${encodeURIComponent(ce.level.levelNumber)}&levelName=${encodeURIComponent(ce.level.challengeDescription)}&levelCode=${encodeURIComponent(ce.level.levelCode)}&levelSolution=${encodeURIComponent(ce.level.levelCodeSolution)}`
    }

    // locks every level except for the first one
    resetProgress() {
        for(let i = 0; i < levels.length; i++) {
            levels[i].levelUnlocked = false;
        }
    }

    unlockLevel() {
        // WIP
    }

    // opens the map. Displays all the levels and marks levels as unlocked if levelUnlocked is set to false
    openMap(levelMapDiv) {
        levelMapDiv.innerHTML = "";
        // loop through each level in the level array
        this.levels.forEach((level) => {
            // each level has a button to access the levle page
            const levelBtn = document.createElement("button");
            levelBtn.textContent = level.challengeDescription;

            // change style of locked level
            if(!level.levelUnlocked) {
                levelBtn.style.backgroundColor = '#ffbbbb'
                levelBtn.disabled = true;
            }
    
            // select the level and change page
            levelBtn.addEventListener("click", () => {
                //console.log(`Selected level: ${level.levelNumber}`);
                this.selectLevel(level);
            });
    
            levelMapDiv.appendChild(levelBtn);
        });
    }

    editMapLayout() {
        // WIP
    }
}

class Level {
    constructor(levelCode, levelNumber, levelUnlocked, levelCodeSolution, challengeDescription) {
        this.levelCode = levelCode;
        this.levelNumber = levelNumber;
        this.levelUnlocked = levelUnlocked;
        this.levelCodeSolution = levelCodeSolution;
        this.challengeDescription = challengeDescription;
    }

    rewardCoins() {
        test_user.coins += 10;
    }

    getHint() {
        console.log("HINT");
    }

    viewTutorial() {
        console.log("TUTORIAL");
    }
}

class CodingEnvironment {
    constructor(level, programmingLanguage, currentCode) {
        this.level = level;
        this.programmingLanguage = programmingLanguage;
        this.currentCode = currentCode;
    }

    updateCode() {
        this.level.levelCode = this.currentCode;
    }

    compileCode() {
        console.log("Compiling...")
    }

    // checks to make sure user code == correct code 
    testCode() {
        if (this.currentCode === this.level.levelCodeSolution) {
            console.log("test passed");
        } else {
            console.log("test failed");
        }
    }

    // simply changes window
    submitCode() {
        window.location.href = 'index.html'
    }
}

class Shop {
    constructor(itemsForSale) {
        this.itemsForSale = itemsForSale;
    }

    // change window back to home
    exitShop() {
        window.location.href = 'index.html'
    }

    openShop() {
        //take every item from the shop and display it here. 
        //Just console logging these to make sure they work
        window.location.href = 'shop.html';
        console.log("Shop Open");
        this.itemsForSale.forEach(item => {
            console.log(item.name + '\n' + item.description + '\nprice: ', item.price + '\n', item.inStock ? "In Stock" : "Sold Out");
        });
    }

    purchaseItem(itemId, user) {
        const item = this.itemsForSale.find(item => item.id == itemId); //search for the item we want based off its id
        if (item && item.inStock && user.coins >= item.price) { // if it exists and is in stock then purchase it
            user.coins -= item.price
            alert("Purchased item! You have " + user.coins + " coins remaining.");
            user.inventory.push(item); // add to user inventory
            item.inStock = false; // set it as out of stock
        } else if (item.inStock && test_user.coins < item.price) {
            alert("You don't have enough coins to purchase this item.");
        } else {
            alert("Item is out of stock")
        }
    }
}

class Item {
    constructor(id, name, description, price, type, inStock) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.price = price;
        this.type = type;
        this.inStock = inStock;
    }
}

// test user
const test_user = new Student("John", "Smith", "johnsmith@gmail.com", "1 January 2000", "JohnSmith123", "Beginner", 30, []);

// solutions for the levels
const levelCodeSolutions = [
    `function helloWorld() { \nconsole.log("hello world");\n}`,
    `function variableTest() {
    var x = 10;
    console.log(x);
}
    `
]

// test levels
const levels = [
    new Level(`function helloWorld() { \n\n}`, 0, true, levelCodeSolutions[0], "Print Statements"),
    new Level(`function variableTest() { \n\n}`, 1, false, levelCodeSolutions[1], "Variables")
]

// test level map
const levelMap = new LevelMap(levels, [], levels[0], levels.slice(1));

// test items
const shop_items = [
    new Item(1, "Sword", "An iron sword", 10, "Weapon", true),
    new Item(2, "Shield", "A Sturdy Shield", 15, "Armor", true),
    new Item(3, "Potion", "Restores Health", 5, "Consumable", true),
    new Item(4, "Leather Boots", "Makes you run faster", 20, "Armor", true),
    new Item(5, "Map", "Allows you to unlock any level you choose", 10, "Tool", true)
];

// test shop
const shop = new Shop(shop_items);

// get buttons
const shopButton = document.getElementById("shopBtn");
const itemIdField = document.getElementById("itemIdField");
const purchaseItemBtn = document.getElementById("purchaseItemBtn");
const submitButton = document.getElementById('submitButton');
const levelMapBtn = document.getElementById("levelMapBtn");
const showLvlBtn = document.getElementById("showLvlBtn");
const testCodeBtn = document.getElementById("testCodeBtn");

// main function
function Main() {
    // open up the shop
    // prints the list of items in the shop
    if (shopButton) {
        shopButton.addEventListener("click", () => {
            shop.openShop();
        });
    }

    // opens up the level map
    if (showLvlBtn) {
        showLvlBtn.addEventListener("click", () => {
            const levelMapDiv = document.getElementById("levelMapDiv"); 
            levelMap.openMap(levelMapDiv);
        });
    }

    //purchasing an item.
    if (purchaseItemBtn) {
        purchaseItemBtn.addEventListener("click", () => {
            const itemId = itemIdField.value;
            shop.purchaseItem(itemId, test_user);
        });
    }

    // acesses the level map
    if (levelMapBtn) {
        levelMapBtn.addEventListener("click", () => {
            //window.location.href = 'levelMap.html'
            window.location.href = 'levelMap.html'
        })
    }

    // button submit form for user login/account creation
    if (submitButton) {
        submitButton.addEventListener('click', () => {
            const form = document.getElementById('signUpForm');
            let formData = {};

            // Collect form data into an object
            new FormData(form).forEach((value, key) => {
                formData[key] = value;
            });

            // Store form data in localStorage
            localStorage.setItem('profileData', JSON.stringify(formData));

            // Redirect to the profile page
            window.location.href = 'profile.html';
        });
    }



}

Main();
