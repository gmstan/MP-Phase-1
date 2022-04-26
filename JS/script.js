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
    window.location.href="home.html";
  }
  function logout(){
    //still to be added here if user entered correct password and username
    window.location.href="index.html";
    
  }

  function register(){
    window.location.href="register.html";
  }
function openProfile(){
  window.location.href="pfp.html";
}

function editProfile(){
  window.location.href="editprofile.html";
}