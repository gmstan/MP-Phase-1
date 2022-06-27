

/* Set the width of the side navigation to 250px */
function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
  }
  
  /* Set the width of the side navigation to 0 */
  function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
  }

  function login(){
    //still to be added here if user entered correct password and username
    window.location.href="../HTML/home.html";
  }
  function loginPage(){
    //still to be added here if user entered correct password and username
    window.location.href="../HTML/views/index.ejs";
  }
  function logout(){
    $.get('/log-out',function(result){

    });
  }
  function checker(event){
    var result = confirm('Are you sure? This cannot be undone');
    if(result == false){
      event.preventDefault();
    }
    else{
        location.href = "http://localhost:3000/delete-profile";
    }
  }
 
  function register(){
    window.location.href="../HTML/views/registration.ejs";
  }
function openProfile(){
  window.location.href="../HTML/pfps/tempo.html";
}

function editProfile(){
  window.location.href="../HTML/pfps/editchaoszerker.html";
}

function finishRegis(){
  window.location.href="../HTML/index.html";
}
function goHomeFromGame(){
  location.href = "http://localhost:3000/home";
}
function goHomeFromPfp(){
  $.get("/home", function(){

  });
}
function logout(){
  $.get("/log-out", function(){

  });
}
function viewprof(){
  $.get("/view-profile", function(){

  });
}
function goHomeFromSearch(){
  window.location.href="../home.html";
}
function search(){
  window.location.href="../HTML/SearchPages/search.html";
}
function getGame(){
  console.log("CLICK");
  // $.get("/get-game", {word : game}, function(){

  // });
  location.href = "http://localhost:3000/view-game";
}

function searchByGenre(){
  window.location.href="genre.html";
}

function searchByRating(){
  window.location.href="rating.html";
}

function searchByName(){
  window.location.href="search.html";
}
function loadFile(event){
  var output = document.getElementById('displaypic');
  output.src = URL.createObjectURL(event.target.files[0])
}
