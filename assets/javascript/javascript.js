var config = {
    apiKey: "AIzaSyA-_5Li-bg5s4dA_4CIub9tGtx1X-BPVIk",
    authDomain: "my-project-fc7ba.firebaseapp.com",
    databaseURL: "https://my-project-fc7ba.firebaseio.com",
    projectId: "my-project-fc7ba",
    storageBucket: "my-project-fc7ba.appspot.com",
    messagingSenderId: "955833041926"
};
firebase.initializeApp(config);

var database = firebase.database();

$("#submitButton").on("click", function (event) {
    event.preventDefault();

    var name = $("#name").val().trim()
    var destination = $("#destination").val().trim()
    var time = $("#time").val().trim()
    var frequency = $("#frequency").val().trim()

   

    $(".form-control").val("")

    database.ref().push({
        name: name,
        destination: destination,
        time: time,
        frequency: frequency
    });

});

database.ref().on("child_added", function (snapshot) {

    var name = snapshot.val().name
    var destination = snapshot.val().destination
    var frequency = snapshot.val().frequency

    var displayRow = $("<tr><td>" + name + "</td><td>" + destination + "</td><td>" + frequency + "</td></tr>")
    $("#tbody").append(displayRow)

}, function (errorObjects) {
})