const firebaseConfig = {
    apiKey: "AIzaSyCiCjNo7h8SBeIpy54_x5Fp9K4u2rYU68o",
    authDomain: "repcard-68a86.firebaseapp.com",
    databaseURL: "https://repcard-68a86-default-rtdb.firebaseio.com",
    projectId: "repcard-68a86",
    storageBucket: "repcard-68a86.appspot.com",
    messagingSenderId: "268606048540",
    appId: "1:268606048540:web:9fc7a08a01bc124f2e92d9"
  };

  firebase.initializeApp(firebaseConfig);

function redirectToRoomName(name){
	console.log("Name is"+name);
    var newstr = name.replace(/-/g, " ");
	localStorage.setItem("OpenedRep", newstr);
	console.log("Success");
	window.location = "question.html";
}

function addRoomss(){
    room_name = document.getElementById("room_name").value;

    firebase.database().ref("/").child(room_name).update({
        purpose: "adding room name"
    })
    localStorage.setItem("room_name", room_name);
    window.location="kwitter_room.html";
}
