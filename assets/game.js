// function to end the entire game
var endGame = function () {
	window.alert("The game has now ended. Let's see how you did!");

	// check localStorage for high score, if it's not there, use 0
	var highScore = localStorage.getItem("highscore");
	if (highScore === null) {
		highScore = 0;
	}
	// if player have more money than the high score, player has new high score!
	if (playerInfo.money > highScore) {
		localStorage.setItem("highscore", playerInfo.money);
		localStorage.setItem("name", playerInfo.name);

		alert(playerInfo.name + " now has the high score of " + playerInfo.money + "!");
	}
	else {
		alert(playerInfo.name + " did not beat the high score of " + highScore + ". Maybe next time!");
	}

	// ask player if they'd like to play again
	var playAgainConfirm = window.confirm("Would you like to play again?");

	if (playAgainConfirm) {
		startGame();
	}
	else {
		window.alert("Thank you for playing Battlebots! Come back soon!");
	}
};

// function to shop for more health
var shop = function () {
	// ask player what they'd like to do
	var shopOptionPrompt = window.prompt("Would you like to REFILL your health, UPGRADE your attack, or LEAVE the store? Please enter one 1 for REFILL, 2 for UPGRADE, or 3 for LEAVE.");

	// use switch to carry out action
	shopOptionPrompt = parseInt(shopOptionPrompt);
	switch (shopOptionPrompt) {
		case 1:
			playerInfo.refillHealth();
			break;
		case 2:
			playerInfo.upgradeAttack();
			break;
		case 3:
			window.alert("Leaving the store.");
			break;
		default:
			window.alert("You did not pick a valid option. Try again.");
			shop();
			break;
	}
};

// function to generate a random numeric value
var randomNumber = function (min, max) {
	var value = Math.floor(Math.random() * (max - min + 1) + min);
	return value;
};

var fightOrSkip = function () {
	// ask user if they'd like to fight or skip using  function
	var promptFight = window.prompt('Would you like FIGHT or SKIP this battle? Enter "FIGHT" or "SKIP" to choose.');

	// Conditional Recursive Function Call
	if (promptFight === "" || promptFight === null) {
		window.alert("You need to provide a valid answer! Please try again.");
		return fightOrSkip();
	}

	// if user picks "skip" confirm and then stop the loop
	promptFight = promptFight.toLowerCase();

	if (promptFight === "skip") {
		// confirm user wants to skip
		var confirmSkip = window.confirm("Are you sure you'd like to quit?");

		// if yes (true), leave fight
		if (confirmSkip) {
			window.alert(playerInfo.name + " has decided to skip this fight. Goodbye!");
			// subtract money from playerMoney for skipping
			playerInfo.money = Math.max(0, playerInfo.money - 10);

			// return true if user wants to leave
			return true;
		}
	}
}

// this is where the fight function is happening
var fight = function (enemy) {
	// keep track of who goes first
	var isPlayerTurn = true;

	// randomly change turn order
	if (Math.random() > 0.5) {
		isPlayerTurn = false;
	}

	while (playerInfo.health > 0 && enemy.health > 0) {
		if (isPlayerTurn) {
			// ask user if they'd like to fight or skip using fightOrSkip function
			if (fightOrSkip()) {
				// if true, leave fight by breaking loop
				break;
			}
			var damage = randomNumber(playerInfo.attack - 3, playerInfo.attack);

			// remove enemy's health by subtracting the amount we set in the damage variable
			enemy.health = Math.max(0, enemy.health - damage);
			console.log(
				playerInfo.name +
				" attacked " +
				enemy.name +
				". " +
				enemy.name +
				" now has " +
				enemy.health +
				" health remaining."
			);

			// check enemy's health
			if (enemy.health <= 0) {
				window.alert(enemy.name + " has died!");

				// award player money for winning
				playerInfo.money = playerInfo.money + 20;

				// leave while() loop since enemy is dead
				break;
			} else {
				window.alert(enemy.name + " still has " + enemy.health + " health left.");
			}
			// player gets attacked first
		} else {
			var damage = randomNumber(enemy.attack - 3, enemy.attack);

			// remove enemy's health by subtracting the amount we set in the damage variable
			playerInfo.health = Math.max(0, playerInfo.health - damage);
			console.log(
				enemy.name +
				" attacked " +
				playerInfo.name +
				". " +
				playerInfo.name +
				" now has " +
				playerInfo.health +
				" health remaining."
			);

			// check player's health
			if (playerInfo.health <= 0) {
				window.alert(playerInfo.name + " has died!");
				// leave while() loop if player is dead
				break;
			} else {
				window.alert(playerInfo.name + " still has " + playerInfo.health + " health left.");
			}
		}
		// switch turn order for next round
		isPlayerTurn = !isPlayerTurn;
	}

};

// function to start a new game
var startGame = function () {
	// reset player stats
	playerInfo.reset();

	for (var i = 0; i < enemyInfo.length; i++) {
		// if health > 0  welcome the battle  i++
		if (playerInfo.health > 0 && i < enemyInfo.length - 1) {

			window.alert("Welcome to Robot Gladiators! Round " + (i + 1));
			// debugger;
			// pick new enemy to fight based on the index of the enemy.name array
			var pickedEnemyObj = enemyInfo[i];

			// reset enemy.health before starting new fight
			pickedEnemyObj.health = randomNumber(40, 60);

			// pass the pickedEnemyObj variable's value into the fight function, where it will assume the value of the enemyName parameter
			fight(pickedEnemyObj);
			// if we're not at the last enemy in the array
			if (i < enemyInfo.length - 1) {
				shop();
			}
		} else {
			//     window.alert("You have lost your robot in battle! Game Over!");
			break;
		}
	}

	// after the loop ends, player is either out of health or enemies to fight, so run the endGame function
	endGame();
};

// function to set name
var getPlayerName = function () {
	var name = "";

	while (name === "" || name === null) {
		name = prompt("What is your robot's name?");
	}

	console.log("Your robot's name is " + name);
	return name;
};

/* GAME INFORMATION / VARIABLES */
var playerInfo = {
	name: getPlayerName(),
	health: 100,
	attack: 10,
	money: 10,
	reset: function () {
		this.health = 100;
		this.money = 10;
		this.attack = 10;
	}, // comma!
	refillHealth: function () {
		if (this.money >= 7) {
			window.alert("Refilling player's health by 20 for 7 dollars.");
			this.health += 20;
			this.money -= 7;
		}
		else {
			window.alert("You don't have enough money!");
		}
	}, // comma!
	upgradeAttack: function () {
		if (this.money >= 7) {
			window.alert("Upgrading player's attack by 6 for 7 dollars.");
			this.attack += 6;
			this.money -= 7;
		}
		else {
			window.alert("You don't have enough money!");
		}
	}
};

var enemyInfo = [
	{
		name: "Song",
		attack: randomNumber(10, 14),
		shield: {
			type: "wood",
			strength: 10
		}
	},
	{
		name: "Baxter",
		attack: randomNumber(10, 14)
	},
	{
		name: "Jung",
		attack: randomNumber(10, 14)
	}
];

// start the game when the page loads
startGame();