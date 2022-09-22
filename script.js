
var divnumber = 0;
var singledancing = true;
const urlParams = new URLSearchParams(window.location.search);
  var server = urlParams.get('server');
  if (!(server === null)) {
    server="ws://"+server+"/";
  }
  else
  {
    server="ws://localhost:8080/";
  }
  var multi = urlParams.get('multi');
  if (!(multi === null)) {
    singledancing = false;
  }

var ws = new WebSocket(server);
var weaponnumber = 0;


function connectws() {

  
  //check options - if we have first words:
  ws.onopen = function () {
    ws.send(JSON.stringify(
      {
        "request": "Subscribe",
        "events": {
          "Twitch": [
            "ChatMessage"
          ]
        },
        "id": "123"
      }
    ));


    ws.onmessage = function (event) {
      // grab message and parse JSON
      const msg = event.data;
      const wsdata = JSON.parse(msg);


      if (typeof wsdata.data != "undefined") {
        if (typeof wsdata.data.message != "undefined") {


          var lowermessage = wsdata.data.message.message.toLowerCase();

          if (lowermessage.startsWith("!join")) {
            addDancer(wsdata.data.message.displayName);

          };


        }
      }
    }
  }
}

function addDancer(user) {



  var username = user.toLowerCase();
  console.log("starting xmlhttp");
  var xhttp = new XMLHttpRequest();
  console.log("created xmlhttp object");
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      // get display image for the user
      console.log("got a response back");
      //save this to cache between sessions too.
      //check for user being added already (or if already dead and ignore)
      var addToFight = true;

     if (singledancing) {
      for (let i = 0; i < divnumber; i++) {
        checkUser = document.getElementById(i).getAttribute("user");
        if (user == checkUser) {

          addToFight = false;
        }
      }
    }
      if (addToFight) {
        var warp = document.getElementById("confetti-container"),
          innerWidth = window.innerWidth,
          innerHeight = window.innerHeight;

        // Load into page

        var Div = document.createElement('div');
        Div.id = divnumber;
        Div.setAttribute("user", user);
        Div.setAttribute("state", "alive");
        divnumber++;
        Div.style.background = 'url(' + xhttp.responseText + ')';
        Div.style.backgroundSize = '100% 100%';
        // pick a random location to put the dancer


        
        
        var random = Math.floor(Math.random() * 6) + 1;
        //random =6;
        var ypos=Randomizer(0,innerHeight-150);
        var scale=1.5*((ypos+innerHeight)/(2*innerHeight));
        switch (random) {
          case 1: 
            
            
            //Div.style.zIndex = -ypos;    
            TweenLite.set(Div, { className: 'falling-element', x: Randomizer(100,innerWidth-150), y:ypos, scale: scale, zIndex:ypos} );    
            dance_1(Div);
            break;
          case 2:
            
            //Div.style.zIndex = -ypos;
            TweenLite.set(Div, { className: 'falling-element', x: Randomizer(100,innerWidth-350), y:ypos , scale: scale, zIndex:ypos });
            dance_2(Div);
            break;
          case 3:
            
            //Div.style.zIndex = -ypos;
            TweenLite.set(Div, { className: 'falling-element', x: Randomizer(100,innerWidth-150), y:ypos , scale: scale, zIndex:ypos });
            dance_3(Div);
            break;
          case 4:
                    
            //Div.style.zIndex = -ypos;
            TweenLite.set(Div, { className: 'falling-element', x: Randomizer(100,innerWidth-250), y:ypos , scale: scale, zIndex:ypos });
            dance_4(Div);
            
            break;
          case 5:
            TweenLite.set(Div, { className: 'falling-element', x: Randomizer(100,innerWidth-350), rotation:-2 , y:ypos , scale: scale, zIndex:ypos });
            dance_5(Div);

            break;
          case 6:
            Div.style.borderBottomLeftRadius = "50% 40%";
            Div.style.borderBottomRightRadius = "50% 40%";
            Div.style.borderTopLeftRadius= "50% 60%";
            Div.style.borderTopRightRadius= "50% 60%";
            TweenLite.set(Div, { className: 'falling-element', x: Randomizer(100,innerWidth-150), rotation:-20 , y:ypos , scale: scale, zIndex:ypos });
            dance_6(Div);
            break;

          default:
            
            break;
        }

        warp.appendChild(Div);

        // Run animation

      }

    }
  };
  xhttp.open("GET", "https://decapi.me/twitch/avatar/" + username, true);
  xhttp.send();

}

function dance_1(element) {
  rotateamount=(Randomizer(5,10));
  rotateyamount=(Randomizer(5,30));
  
  TweenMax.to(element, 0.1, { rotation: -rotateamount, rotationY: -rotateyamount ,repeat: 0 });
  TweenMax.to(element, 0.3, { y:"+=20" , yoyo: true, repeat: 0, ease: Sine.easeInOut, delay: .1,repeat: -1 });
  TweenMax.to(element, 0.7, { rotation: (2*rotateamount), yoyo: true, repeat: 0, ease: Sine.easeInOut, delay: .2,repeat: -1 });
  TweenMax.to(element, 1.2, { rotationY: (2*rotateyamount), yoyo: true, repeat: 0, ease: Sine.easeInOut, delay: .2,repeat: -1 });
  //TweenMax.to(element, 0.5, { y: (innerHeight - 150), yoyo: true, repeat: 0, ease: Sine.easeInOut, delay: 1.5 });

}
function dance_2(element) {
  
  //TweenMax.to(element, 0.1, {  rotationY: -rotateyamount ,repeat: 0 });
  
  TweenMax.to(element, 0.8, { x:"+=180" , delay: 0,repeat: -1,repeatDelay:1.6 });
  TweenMax.to(element, 0.2, { x:"+=20" ,y:"-=20", rotation:25 ,rotationY:180, ease: Sine.easeInOut, delay: 0.9,repeat: -1,repeatDelay:2.2 });
  TweenMax.to(element, 0.2, { x:"-=20" , y:"+=20",rotation:0 ,rotationY:0, ease: Sine.easeInOut, delay: 1, repeat: -1,repeatDelay:2.2 });
  TweenMax.to(element, 0.8, { x:"-=180" , delay: 1.2,repeat: -1,repeatDelay:1.6 });
  TweenMax.to(element, 0.2, { x:"-=20" ,y:"-=20", rotation:335 ,rotationY:0, ease: Sine.easeInOut, delay: 2.0 ,repeat: -1,repeatDelay:2.2 });
  TweenMax.to(element, 0.2, { x:"+=20" , y:"+=20",rotation:0 ,rotationY:0, ease: Sine.easeInOut, delay: 2.2, repeat: -1,repeatDelay:2.2 });
}

function dance_3(element) {
  rotateamount=(Randomizer(15,40));
  rotateyamount=(Randomizer(5,30));
  
  TweenMax.to(element, 0.1, {  rotationY: -rotateyamount ,repeat: 0 });
  TweenMax.to(element, 0.3, { transformOrigin: "50% 100%", rotationX: (2*rotateamount), yoyo: true, repeat: 0, ease: Sine.easeInOut, delay: .2,repeat: -1 });
  TweenMax.to(element, 1.2, { rotationY: (2*rotateyamount), yoyo: true, repeat: 0, ease: Sine.easeInOut, delay: .2,repeat: -1 });
  //TweenMax.to(element, 0.5, { y: (innerHeight - 150), yoyo: true, repeat: 0, ease: Sine.easeInOut, delay: 1.5 });

}

function dance_4(element) {
  
  //TweenMax.to(element, 0.1, {  rotationY: -rotateyamount ,repeat: 0 });
  
  
  TweenMax.to(element, 0.5, { x:"+=50", y:"-=70" , ease: Sine.easeIn,  rotation:90, delay: 0,repeat: -1,repeatDelay:2.1 });
  TweenMax.to(element, 0.5, { x:"+=50", y:"+=70" , ease: Sine.easeOut,  rotation:180, delay: 0.5,repeat: -1,repeatDelay:2.1 });
  TweenMax.to(element, 0.4, { rotationY:360 , ease: Sine.easeOut, delay: 1.0 ,repeat: -1,repeatDelay:2.2 });
  
  TweenMax.to(element, 0.5, { x:"-=50", y:"-=70" , ease: Sine.easeIn,  rotation:90, delay: 1.4,repeat: -1,repeatDelay:2.1 });
  TweenMax.to(element, 0.5, { x:"-=50", y:"+=70" , ease: Sine.easeOut,  rotation:0, delay: 1.9,repeat: -1,repeatDelay:2.1 });
  
}

function dance_5(element) {
  
  TweenMax.to(element, 1.2, { x:"+=180" , delay: 0,repeat: -1,repeatDelay:1.2 });
  
  
  TweenMax.to(element, 0.1, { rotation:2 , ease: Sine.easeInOut, delay: 0 , yoyo: true, repeat: -1 });
  
  TweenMax.to(element, 1.2, { x:"-=180" , delay:1.2, repeat: -1,repeatDelay:1.2 });  
}
function dance_6(element) {
  
  TweenMax.to(element, 1, { rotation: 20 ,x:"+=40", yoyo: true, repeat: 0, ease: Sine.easeInOut, delay: 0,repeat: -1 });
}

// Randomizer
function Randomizer(min, max) { return min + Math.random() * (max - min); }

connectws();