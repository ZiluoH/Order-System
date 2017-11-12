// Initialize Firebase
  var config = {
    apiKey: "AIzaSyAylPscgiw8cn6AjFFB945LNaEnwKUcNpI",
    authDomain: "order-system-8f9e7.firebaseapp.com",
    databaseURL: "https://order-system-8f9e7.firebaseio.com",
    projectId: "order-system-8f9e7",
    storageBucket: "order-system-8f9e7.appspot.com",
    messagingSenderId: "979736843207"
  };
  firebase.initializeApp(config);

// Get a reference to the root of the Database
var rootRef = firebase.database().ref();

// Reference message collection
var orderRef = firebase.database().ref('order')

// Get today's date
var d = new Date()
var month = d.getMonth() + 1
var date = d.getDate()
var openDate = month + "/" + date


// Listen fro form submit
document.getElementById('orderForm').addEventListener('submit', submitForm);

// submit form
function submitForm(e) {
	e.preventDefault()

	// get value
	var total = document.getElementById('total').value
	console.log(total)

	// save order
	saveOrder(total,openDate)

	// reset form
	document.getElementById('orderForm').reset()
}

// Save message to firebase
function saveOrder(total,openDate){
	var newOrderRef = orderRef.push()
	newOrderRef.set({
		date:openDate,
		total:total
	})
}


var query = firebase.database().ref('order').orderByKey()
query.once('value')
	.then(function(snapshot){
		snapshot.forEach(function(childSnapshot){
			var childData = childSnapshot.val()
			// console.log(childData)
		})
	})



// JS for frontend
function addItem() {
	var fff = document.querySelector('input[name="size"]:checked').value;
	console.log(fff)
}

// function for topping
var toppingArray = []
function topping(type,price) {
	this.type = type
	this.price = price
	toppingArray.push(this)
}

var boba = new topping('Boba', 0)
var grassjelly = new topping('Grass Jelly', 0.5)
var rainbowjelly = new topping('Rainbow Jelly', 0.5)
var lycheejelly = new topping('Lychee Jelly', 0.5)
var greenapplejelly = new topping('Greenapple Jelly', 0.5)
var mangojelly = new topping('Mango Jelly', 0.5)
var pineapplejelly = new topping('Pineapple Jelly', 0.5)
var basilseeds = new topping('Basil Seeds', 0.5)
var eggpudding = new topping('Egg Pudding', 0.5)
var aloevera = new topping('Aloe Vera', 0.5)
var redbean = new topping('Red Bean', 0.5)
var poppingboba = new topping('Popping Boba(lychee)', 0.5)

for (var i = toppingArray.length - 1; i >= 0; i--) {
	var toppingLabel = document.createElement('label')
	var toppingInput = document.createElement('input')

	toppingLabel.className = 'btn btn-primary'
  toppingLabel.innerHTML = toppingArray[i].type

	toppingInput.type = 'checkbox'
	toppingInput.name = 'topping'
	toppingInput.value = toppingArray[i].type

	toppingLabel.appendChild(toppingInput)

	document.getElementById('make_drinks_topping').appendChild(toppingLabel)
}