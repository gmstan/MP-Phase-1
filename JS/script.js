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
  function logout(){
    //still to be added here if user entered correct password and username
    window.location.href="../HTML/index.html";
    
  }

  function register(){
    window.location.href="../HTML/registration.html";
  }
function openProfile(){
  window.location.href="../HTML/pfp.html";
}

function editProfile(){
  window.location.href="../HTML/editprofile.html";
}