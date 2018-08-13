$(document).ready(function() {
  $('.signUpBtn').click(function(event) {
    event.preventDefault();

    var email = $('.signUpEmail').val();
    var password = $('.signUpPassword').val();

    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(function(response) {
        window.location = 'index.html?id=' + response.user.uid;
        console.log(response);
      })
      .catch(function(error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorMessage);
      
    });    
  });

  $('.signInBtn').click(function(event) {
    event.preventDefault();

    var email = $('.signInEmail').val();
    var password = $('.signInPassword').val();

    
    firebase.auth().signInWithEmailAndPassword(email, password)
    .then(function(response) {
      window.location = 'index.html?id=' + response.user.uid;
      // console.log(response.uid);
      
    })
    .catch(function(error) {
    
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log(errorMessage);
    });  
  });
});