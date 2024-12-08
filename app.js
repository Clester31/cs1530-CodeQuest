document.getElementById('submitButton').addEventListener('click', () => {
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

function loadProfile(data) {
    // Display the submitted data in the profile section
    document.getElementById('profile-name').textContent = data.name || 'N/A';
    document.getElementById('profile-email').textContent = data.email || 'N/A';
    document.getElementById('profile-username').textContent = data.username || 'N/A';
}class User {
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
    constructor(levelsCompleted, levelsUnlocked, levelsLocked) {
        this.levelsCompleted = levelsCompleted;
        this.levelsUnlocked = levelsUnlocked;
        this.levelsLocked = levelsLocked;
    }

    selectLevel() {

    }

    resetProgress() {

    }

    unlockLevel() {

    }

    openMap() {

    }

    editMapLayout() {

    }
}

class Level {
    constructor(levelNumber, levelCompleted, levelCodeSolution, challengeDescription) {
        this.levelNumber = levelNumber;
        this.levelCompleted = levelCompleted;
        this.levelCodeSolution = levelCodeSolution;
        this.challengeDescription = challengeDescription;
    }

    rewardCoins() {

    }

    get getHint() {

    }

    viewTutorial() {

    }
}

class codingEnvironment {
    constructor(programmingLanguage, currentCode) {
        this.programmingLanguage = programmingLanguage;
        this.currentCode = currentCode;
    }

    updateCode() {

    }

    compileCode() {

    }

    testCode() {

    }

    submitCode() {

    }
}

class Shop {
    constructor(itemsForSale) {
        this.itemsForSale = itemsForSale;
    }

    exitShop() {

    }

    openShop() {
        //take every item from the shop and display it here. 
        //Just console logging these to make sure they work
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

function Main() {
    const openShopButton = document.getElementById("openShopBtn");
    const itemIdField = document.getElementById("itemIdField");
    const purchaseItemBtn = document.getElementById("purchaseItemBtn");

    const test_user = new Student("John", "Smith", "johnsmith@gmail.com", "1 January 2000", "JohnSmith123", "Beginner", 100, []);

    // I just had these auto-generated because im too lazy to come up with item ideas. Will change later
    const shop_items = [
        new Item(1, "Sword", "A basic sword for beginners", 10, "Weapon", true),
        new Item(2, "Shield", "A basic shield for defense", 15, "Armor", false),
        new Item(3, "Potion", "A health-restoring potion", 5, "Consumable", true),
        new Item(4, "Leather Boots", "Basic footwear for protection", 20, "Armor", true),
        new Item(5, "Map", "A map to help navigate the world", 10, "Tool", false)
    ];

    const shop = new Shop(shop_items);

    // open up the shop
    // prints the list of items in the shop
    // should display each item eventually
    openShopButton.addEventListener("click", () => {
        shop.openShop();
    });

    //purchasing an item.
    purchaseItemBtn.addEventListener("click", () => {
        const itemId = itemIdField.value;
        shop.purchaseItem(itemId, test_user);
    });
}

Main();
