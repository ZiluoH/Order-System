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
var orderRef = firebase.database().ref('order');

// Get today's date
var d = new Date();
var month = d.getMonth() + 1;
var date = d.getDate();
var openDate = month + "/" + date;


// Listen fro form submit
document.getElementById('orderForm').addEventListener('submit', submitForm);

// submit form
function submitForm(e) {
 e.preventDefault();
 // get value
 var total = document.getElementById('total').value;
 console.log(total);

 // save order
 saveOrder(total,openDate);

 // reset form
 document.getElementById('orderForm').reset();
}

// Save message to firebase
function saveOrder(total,openDate){
 var newOrderRef = orderRef.push();
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





// function for topping
var toppingArray = []
function topping(type,price) {
	this.type = type
	this.price = price
	toppingArray.push(this)
}

var notopping = new topping('No topping', 0)
var poppingboba = new topping('Popping Boba(lychee)', 0.6)
var redbean = new topping('Red Bean', 0.6)
var aloevera = new topping('Aloe Vera', 0.6)
var eggpudding = new topping('Egg Pudding', 0.5)
var basilseeds = new topping('Basil Seeds', 0.5)
var pineapplejelly = new topping('Pineapple Jelly', 0.5)
var mangojelly = new topping('Mango Jelly', 0.5)
var greenapplejelly = new topping('Greenapple Jelly', 0.5)
var lycheejelly = new topping('Lychee Jelly', 0.5)
var rainbowjelly = new topping('Rainbow Jelly', 0.5)
var grassjelly = new topping('Grass Jelly', 0.5)
var boba = new topping('Boba', 0)


for (var i = toppingArray.length - 1; i >= 0; i--) {
	var toppingLabel = document.createElement('label')
	var toppingInput = document.createElement('input')

	toppingLabel.className = 'btn btn-info'
  toppingLabel.innerHTML = toppingArray[i].type

	toppingInput.type = 'checkbox'
	toppingInput.name = 'topping'
	toppingInput.value = toppingArray[i].type
	toppingInput.setAttribute('price', toppingArray[i].price)

	toppingLabel.appendChild(toppingInput)

	document.getElementById('make_drinks_topping').appendChild(toppingLabel)
}



// JS for frontend
function addItem() {
	// get size
	var make_drinks_size = document.querySelector('input[name="size"]:checked').value;
	// get tea base
	var make_drinks_tea_base = document.querySelector('input[name="tea_base"]:checked').value;
	// get flavor
	var make_drinks_flavor = document.querySelector('input[name="flavor"]:checked').value;
	// get topping price
	var make_drinks_topping_price = []
	$('input:checkbox[name="topping"]:checked').each(function(){
		make_drinks_topping_price.push($(this).attr("price"));
	})
	var make_drinks_topping_total_price = make_drinks_topping_price.map(Number).reduce(add, 0).toFixed(2)
	// get topping type
	var make_drinks_topping_type = []
	$('input:checkbox[name="topping"]:checked').each(function(){
		make_drinks_topping_type.push($(this).val());
	})
	// get sweet level
	var make_drinks_sweet = document.querySelector('input[name="sweet_level"]:checked').value;
	// get ice level
	var make_drinks_ice = document.querySelector('input[name="ice_level"]:checked').value
	//make drinks
	var make_drinks_final = make_drinks_size + " " + make_drinks_tea_base + " " + make_drinks_flavor + " flavor with " + 
			make_drinks_topping_type + " " +  make_drinks_sweet + " sweet and " + make_drinks_ice	
	
	console.log(make_drinks_topping_total_price)

	// add drinks
	var items_list = document.getElementById('items_list')
	items_list.innerHTML += '<li class="list-group-item"><div class="remove_item"><i class="fa fa-trash-o" aria-hidden="true"></i></div><p>' + make_drinks_final + '</p></li>';
 	
	// remove item
 	$(document).ready(function () {
		$('.remove_item').click(function(){
			$(this).closest('li').remove();
		})
	})
}

function add(a, b){
	return a + b;
}


