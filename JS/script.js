
let checkername = false;
let checker1 = false;
let checker2 = false;
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

function getGame(game){
  console.log(game)
  $.get('/get-game', {word:game }, function(){

  })
  location.href="http://localhost:3000/game-direct";
}

// function search(){
//   location.href="search.html";
// }

function loadFile(event){
  var output = document.getElementById('displaypic');
  output.src = URL.createObjectURL(event.target.files[0])
  let checker = false;
  var fileInput = document.getElementById('image1');   
  var filename = "Images/GAMES PHOTOS/" + fileInput.files[0].name;
  let formattedname = filename.slice(0,-4)
  console.log(formattedname);
  $.get('/checkgame',function(result){
    for(let counter = 0; counter < result.libgames.length; counter++){
      let fromDB1 = result.libgames[counter].image1;
      let fromDB2 = result.libgames[counter].image2;
      let formattedDB1 = fromDB1.slice(0,-4);
      let formattedDB2 = fromDB2.slice(0,-4);
      console.log(formattedDB1 + " " + formattedDB2);
      if (formattedname == formattedDB1 || formattedname == formattedDB2){
        checker = true;
        break
      }
    }
    if (checker == true){
      $('#error1').text("Image is not unique");
      $('#save').css('background-color', 'red')
      $('#save').prop('disabled', true);
    }
    else{
      $('#error1').text("");
      $('#save').css('background-color','#1ba099');
      $('#save').prop('disabled', false);
    }
  });
}
function loadFile2(event){
  var output = document.getElementById('coverpic');
  output.src = URL.createObjectURL(event.target.files[0])
  let checker = false;
  var fileInput = document.getElementById('image2');   
  var filename = "Images/GAMES PHOTOS/" + fileInput.files[0].name;
  let formattedname = filename.slice(0,-4)
  console.log(formattedname);
  $.get('/checkgame',function(result){
    for(let counter = 0; counter < result.libgames.length; counter++){
      let fromDB1 = result.libgames[counter].image1;
      let fromDB2 = result.libgames[counter].image2;
      let formattedDB1 = fromDB1.slice(0,-4);
      let formattedDB2 = fromDB2.slice(0,-4);
     
      if (formattedname == formattedDB1 || formattedname == formattedDB2){
        checker = true;
        break
      }
    }
    if (checker == true){
      $('#error2').text("Image is not unique");
      
    }
    else{
      $('#error2').text("");
    }
    
  });
}
