var name;

$(document).ready(function() {
  $('.signUpBtn').click(function(event) {
    event.preventDefault();

    var email = $('.userEmail').val();
    var password = $('.userPassword').val();
    name = $('.userName').val();

    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(function(response) {
        var userId = response.user.uid;
        database.ref('users/' + userId).set({
          name: name,
          email: email
        });
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

    var email = $('.userEmail').val();
    var password = $('.userPassword').val();
    
    firebase.auth().signInWithEmailAndPassword(email, password)
    .then(function(response) {
      window.location = 'index.html?id=' + response.user.uid;      
    })
    .catch(function(error) {
    
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log(errorMessage);
    });  
  });
});

// 
