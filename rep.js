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

function logout(){
    localStorage.removeItem("userName");
    localStorage.removeItem("OpenedRep");
    window.location = "index.html";
}


var room_name = localStorage.getItem("OpenedRep");
var user_name = localStorage.getItem("userName");

document.getElementById("output2").innerHTML = room_name;

proffession = localStorage.getItem("Prof");

function messages(){
    firebase.database().ref("/").child(room_name).update({
        purpose: "adding room name"
    })
    msg = document.getElementById("msg").value;
          firebase.database().ref(room_name).push({
                name:user_name,
                message:msg,
                //like:0,
                writtenBy: proffession,
                image: false
          });

          document.getElementById("msg").value = "";
}



var imageURL;
	var reader;
	var files = [];
	var user_name = localStorage.getItem("userName");
	var imgName;
	var imageCounter = 0;

	document.getElementById("select").onclick = function(e){
		var input = document.createElement('input');
		input.type = 'file';
		input.onchange = e => {
			files = e.target.files;
			reader = new FileReader();
			reader.onload = function(){
				document.getElementById("myImg").src = reader.result;
			}
			reader.readAsDataURL(files[0]);
		}
		input.click();
	}
    function Call(){
		imgName = user_name + imageCounter;
		imageCounter = imageCounter + 1;
		var uploadTask = firebase.storage().ref('/Images'+imgName+".png").put(files[0]);

		uploadTask.on('state_changed', function(snapshot){
			var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
			console.log(progress);
		},

		function(error){
			alert("error in saving image" + error);
		},
		
		function(){
			uploadTask.snapshot.ref.getDownloadURL().then(function(url){
				imageURL = url;
			console.log(imageURL);

            firebase.database().ref(room_name).push({
                Name: imgName,
                name: user_name,
				Link: imageURL,
                image: true
          });
			console.log("Image saved");
		}
		);
	});
	}

function getData() { firebase.database().ref("/"+room_name).on('value', function(snapshot) { document.getElementById("output10").innerHTML = ""; snapshot.forEach(function(childSnapshot) { childKey  = childSnapshot.key; childData = childSnapshot.val(); if(childKey != "purpose") {
    firebase_message_id = childKey;
    message_data = childData;
//Start code
 console.log(firebase_message_id);
 console.log(message_data);
 name = message_data['name'];
 message = message_data['message'];
 images = message_data['image'];
 wrote = message_data['writtenBy'];
 console.log("mesasge"+message);
 //like = message_data['like'];
 name_with_tag = "<h4>" + name + "</h4>";
 //like_button = "<button class='btn btn-warning' id=" + firebase_message_id + " value=" + like + " onclick='updateLike(this.id)'>";
 //span_with_tag = "<span class='glyphicon glyphicon-thumbs-up'>Like: " + like + "</span></button><hr>";

 if(wrote == "teacher"){
    message_with_tag = "<h4 class='message_h4_bold'>" + message + "</h4>";
} else{
    message_with_tag = "<h4 class='message_h4'>" + message + "</h4>";
}

if(images == true){
    image_url = message_data['Link'];
    image_display = "<img onclick='preview(this.src)' class='imagenew' style='width: auto; height: 100px; border: 2px solid black;' src=" + image_url + ">";
    row = "<div class='newdiv'>"+name_with_tag + image_display +"<hr>"+"</div>";
} else{
    row = name_with_tag + message_with_tag +"<hr>";
}

 console.log(room_name);
 answer = room_name;
 document.getElementById("output2").innerHTML = answer;
 document.getElementById("output10").innerHTML += row;
 document.getElementById("myImg").src = "";
//End code
 } });  }); }
getData();

/*function updateLike(message_id){
 console.log("clicked on button - " + message_id);
 button_id = message_id;
 //likes = document.getElementById(button_id).value;
 //updated_likes = Number(likes) + 1;
 //console.log(updated_likes);

 firebase.database().ref(room_name).child(message_id).update({
       like: updated_likes
 });
}*/

function home(){
    localStorage.removeItem("OpenedRep");
    window.location = "home_page.html";
}
function preview(src){
    link = src;
    window.open(link, '_blank');
}


function canvasSave(url){
    var img_url = url;

    imgName = user_name + imageCounter;
    imageCounter = imageCounter + 1;

            firebase.database().ref(room_name).push({
                Name: imgName,
                name: user_name,
				Link: img_url,
                image: true
          });
			console.log("Image saved");
		}
		



/////////////////////////////////////////////////////////////////////////////////////////////////////////


function start(){
    		// Variables for referencing the canvas and 2dcanvas context
		var canvas,ctx;

		// Variables to keep track of the mouse position and left-button status
		var mouseX,mouseY,moving, mouseDown=0;

		// Variables to keep track of the touch position
		var touchX,touchY;

		var userDrawnPixels = [];

		// Get the touch position relative to the top-left of the canvas
		// When we get the raw values of pageX and pageY below, they take into account the scrolling on the page
		// but not the position relative to our target div. We'll adjust them using "target.offsetLeft" and
		// "target.offsetTop" to get the correct values in relation to the top left of the canvas.
		function getTouchPos(e) {
				if (!e)
				    var e = event;

				if(e.touches) {
				    if (e.touches.length == 1) { // Only deal with one finger
				        var touch = e.touches[0]; // Get the information for finger #1
				        touchX=touch.pageX-touch.target.offsetLeft;
				        touchY=touch.pageY-touch.target.offsetTop;
				    }
				}
		}

		// Set-up the canvas and add our event handlers after the page has loaded
		function init() {
				// Get the specific canvas element from the HTML document
				canvas = document.getElementById('myCanvas');

				canvas.focus();

				canvas.width  = (window.innerWidth > 400) ? 400 : window.innerWidth;
				canvas.height = (window.innerHeight > 400) ? 400 : window.innerHeight;

				// If the browser supports the canvas tag, get the 2d drawing context for this canvas
				if (canvas.getContext)
				    ctx = canvas.getContext('2d');

				// Check that we have a valid context to draw on/with before adding event handlers
				if (ctx) {
				    // React to mouse events on the canvas, and mouseup on the entire document
				    canvas.addEventListener('mousedown', sketchpad_mouseDown, false);
				    canvas.addEventListener('mousemove', sketchpad_mouseMove, false);
				    canvas.addEventListener('mouseup', mouseOrTouchUp, false);

				    // React to touch events on the canvas
				    canvas.addEventListener('touchstart', sketchpad_touchStart, false);
				    canvas.addEventListener('touchmove', sketchpad_touchMove, false);
				    canvas.addEventListener('touchend', mouseOrTouchUp, false);
				}
		}

		// Draws a dot at a specific position on the supplied canvas name
		// Parameters are: A canvas context, the x position, the y position, the size of the dot
		function drawLine(ctx, x, y, size) {
				ctx.fillStyle = "lightgrey";
				ctx.beginPath();

				var n = userDrawnPixels.length;
				var point = userDrawnPixels[n-1];

				if ((n>1) && moving) {
				    var prevPoint = userDrawnPixels[n-2];
				    ctx.moveTo(prevPoint[0],prevPoint[1]);
				    ctx.lineTo(point[0], point[1]);
				} else {
				    //ctx.moveTo(point[0],point[0]);
				    //ctx.lineTo(point[0], point[1]);
				}

				ctx.lineCap = "round";
				ctx.lineJoin = "round";
				ctx.lineWidth = size;
				ctx.stroke();
				ctx.closePath();
				ctx.fill();
		}


		function drawDot(ctx, x, y, size) {
				ctx.fillStyle = "lightgrey";

				// Draw a filled circle
				ctx.beginPath();
				ctx.arc(x, y, size, 0, Math.PI*2, true);
				ctx.closePath();
				ctx.fill();
		}

				// Keep track of the mouse button being pressed and draw a dot at current location
		function sketchpad_mouseDown() {

				userDrawnPixels.push([mouseX, mouseY]);
				drawDot(ctx,mouseX,mouseY,3);

				mouseDown=1;
		}


		function mouseOrTouchUp() {
				mouseDown=0;
				moving=0;
		}

		function sketchpad_mouseMove(e) {
				// Update the mouse co-ordinates when moved
				getMousePos(e);

				// Draw a dot if the mouse button is currently being pressed
				if (mouseDown==1) {
				    drawLine(ctx,mouseX,mouseY,6);
				    userDrawnPixels.push([mouseX, mouseY]);
				    moving=1;
				}
		}

		// Get the current mouse position relative to the top-left of the canvas
		function getMousePos(e) {
				if (!e)
				    var e = event;

				if (e.offsetX) {
				    mouseX = e.offsetX;
				    mouseY = e.offsetY;
				}
				else if (e.layerX) {
				    mouseX = e.layerX;
				    mouseY = e.layerY;
				}
		}

		// Draw something when a touch start is detected
		function sketchpad_touchStart() {
				getTouchPos();
				userDrawnPixels.push([touchX, touchY]);
				drawDot(ctx,touchX,touchY,3);

				// Prevent a scrolling action as a result of this touchmove triggering.
				event.preventDefault();

				moving=1;
		}

		function sketchpad_touchMove(e) {
				getTouchPos(e);
				userDrawnPixels.push([touchX, touchY]);
				drawLine(ctx,touchX,touchY,6);

				// Prevent a scrolling action as a result of this touchmove triggering.
				e.preventDefault();
		}

        function clearArea(){
            ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        }

		document.getElementById("clear").addEventListener("click", function(){
			clearArea();
		});

		init();
}
/////