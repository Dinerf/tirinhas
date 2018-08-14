






















































































































// Amigos
var usersList = $('.usersList');
var userName = $('.userName');

$('.userBtn').click(function() {
  getUser(userName.val());
});

function getUser(name) {
  var data = {
    name: name
  }

  return firebase.database().ref().child('users').push(data);
  // return database.ref('users/' + USER_ID).push({
  //   name: name
  // });
};

firebase.database().ref('users').on('value', function(snapshot) {
  usersList.innerHTML = '';
  
  snapshot.forEach(function(item) {
    var li = document.createElement('li');
    li.appendChild(document.createTextNode(item.val().name));
    usersList.appendChild(li);
  });
});




















