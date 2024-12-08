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

    }

    logOut() {

    }

    createAccount() {

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

    }

    createLevel() {

    }

    editCirriculum() {

    }

    editLearningObjectives() {

    }
}

class Student extends User {
    constructor(firstName, lastName, email, birthday, userName, skillLevel, coins, inventory) {
        super(firstName, lastName, email, birthday);
        this.userName = userName;
        this.skillLevel = skillLevel;
        this.coins = coins;
        this.inventory = inventory;
    }

    setSkillLevel() {

    }
}

class LevelMap {
    constructor(levels, levelsCompleted, levelsUnlocked, levelsLocked) {
        this.levels = levels;
        this.levelsCompleted = levelsCompleted;
        this.levelsUnlocked = levelsUnlocked;
        this.levelsLocked = levelsLocked;
    }

    selectLevel(level) {
        const ce = new CodingEnvironment(level, "javascript", level.levelCode);
        window.location.href = `level.html?levelNum=${encodeURIComponent(level.levelNumber)}&levelName=${encodeURIComponent(level.levleName)}&levelCode=${encodeURIComponent(level.levelCode)}&levelSolution=${encodeURIComponent(level.levelCodeSolution)}`

        // const levelName = document.createElement('h1');
        // const codingBox = document.createElement('textarea');
        // const testBtn = document.createElement('button');

        // levelName.textContent = level.levelName;
        // testBtn.textContent = "Test Code";

        // const levelContainerDiv = document.getElementById('levelContainer');
        // levelContainerDiv.appendChild(levelName);
    }

    resetProgress() {

    }

    unlockLevel() {

    }

    openMap(levelMapDiv) {
        levelMapDiv.innerHTML = "";
        this.levels.forEach((level) => {
            const levelBtn = document.createElement("button");
            levelBtn.textContent = level.challengeDescription;

            if(!level.levelUnlocked) {
                levelBtn.style.backgroundColor = '#ffbbbb'
                levelBtn.disabled = true;
            }
    
            levelBtn.addEventListener("click", () => {
                console.log(`Selected level: ${level.levelNumber}`);
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

    testCode() {
        if (this.currentCode === this.level.levelCodeSolution) {
            console.log("test passed");
        } else {
            console.log("test failed");
        }
    }

    submitCode() {
        window.location.href = 'home.html'
    }
}

class Shop {
    constructor(itemsForSale) {
        this.itemsForSale = itemsForSale;
    }

    exitShop() {
        window.location.href = 'home.html'
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
        if (item && item.inStock) { // if it exists and is in stock then purchase it
            console.log("Purchased: ", item.name);
            user.inventory.push(item); // add to user inventory
            item.inStock = false; // set it as out of stock
        } else {
            console.log("Item not available for purchase.");
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

const test_user = new Student("John", "Smith", "johnsmith@gmail.com", "1 January 2000", "JohnSmith123", "Beginner", 100, []);

const levelCodeSolutions = [
    `
        function helloWorld() {
            console.log("Hello World");
        }
        `,
    `
        function variableTest() {
            var x = 10;
            console.log(x);
        }
        `
]

const levels = [
    new Level(`function helloWorld() { \n\n}`, 0, true, levelCodeSolutions[0], "learn how to print to the console"),
    new Level(`function variableTest() { \n\n}`, 1, false, levelCodeSolutions[1], "learn how to create and print variables")
]

const levelMap = new LevelMap(levels, [], levels[0], levels.slice(1));

// I just had these auto-generated because im too lazy to come up with item ideas. Will change later
const shop_items = [
    new Item(1, "Sword", "A basic sword for beginners", 10, "Weapon", true),
    new Item(2, "Shield", "A basic shield for defense", 15, "Armor", false),
    new Item(3, "Potion", "A health-restoring potion", 5, "Consumable", true),
    new Item(4, "Leather Boots", "Basic footwear for protection", 20, "Armor", true),
    new Item(5, "Map", "A map to help navigate the world", 10, "Tool", false)
];

const shop = new Shop(shop_items);

const shopButton = document.getElementById("shopBtn");
const itemIdField = document.getElementById("itemIdField");
const purchaseItemBtn = document.getElementById("purchaseItemBtn");
const submitButton = document.getElementById('submitButton');
const levelMapBtn = document.getElementById("levelMapBtn");
const showLvlBtn = document.getElementById("showLvlBtn");

function Main() {
    // open up the shop
    // prints the list of items in the shop
    // should display each item eventually\
    if (shopButton) {
        shopButton.addEventListener("click", () => {
            shop.openShop();
        });
    }

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

    if (levelMapBtn) {
        levelMapBtn.addEventListener("click", () => {
            //window.location.href = 'levelMap.html'
            window.location.href = 'levelMap.html'
        })
    }

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
