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
    console.log(time)



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
    var time = snapshot.val().time
    console.log(time)

    var timeConverted = moment(time, "HH:mm").subtract(1, "years")
    console.log(timeConverted)

    var currentTime = moment()
    console.log("current time " + moment(currentTime).format("HH:mm"))

    var timeDifference = currentTime.diff(timeConverted, "minutes")
    console.log("time difference " + timeDifference)

    var remainder = timeDifference % frequency
    console.log(remainder)

    var minutesAway = frequency - remainder;
    console.log("minutes away " + minutesAway)

    var nextArrival = currentTime.add(minutesAway, "minutes")
    console.log("next arrival: " + moment(nextArrival).format("HH:mm"));

    var displayRow = $("<tr><td>" + name + "</td><td>" + destination + "</td><td>" + frequency + "</td><td>" + nextArrival.format("HH:mm") + "</td><td>" + minutesAway + "</td></tr>")
    $("#tbody").append(displayRow)


}, function (errorObjects) {
})

