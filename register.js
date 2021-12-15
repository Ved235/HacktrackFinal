function createAccount(){
    user_name = document.getElementById("user_name").value;
    password = document.getElementById("password").value;
    if(user_name == ""){
        alert("Please fill all fields. All fields are compulsory");
    } else if(password == ""){
        alert("Please fill all fields. All fields are compulsory");
    } else{
        createUser();
        user_name = document.getElementById("user_name").value = "";
        password = document.getElementById("password").value = "";
        console.log("data sent to firebase");
        alert("Account successfully created");
        window.location = "kwitter.js";
    }
}

function createUser(){
    firebase.database().ref("/").child(user_name).update({
        purpose: "added user"
    })
    firebase.database().ref(user_name).push({
        user_id:user_name,
        password:password
    });
}