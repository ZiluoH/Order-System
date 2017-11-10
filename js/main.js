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