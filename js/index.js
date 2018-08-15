$(document).ready(function() {
  getPostsFromDB();
});

var database = firebase.database();
var USER_ID = window.location.search.match(/\?id=(.*)/)[1];
var childKey;
var childData;
var userPhoto;
var userName;
var newPost;
var commentKey;

function buttonPost(event) {
  newPost = $('.newPost').val();
  var postFromDB = addPostToDB(newPost);
  createTemplate(newPost, postFromDB.key)
  createPost(newPost, postFromDB.key)
}

function commentPost(event) {
  newPost = $('#textAreaComment').val();
  var postFromDB = addCommentToDB(newPost);
  createTemplate(newPost, postFromDB.key)
  createComment(newPost, postFromDB.key)
}

function addPostToDB(text) {
  return database.ref('users/' + USER_ID + '/posts').push({
    text: text
  });
}

function addCommentToDB(text) {
  return database.ref('users/' + USER_ID + '/posts/' + commentKey + '/comments').push({
    text: text
  });
}

function getPostsFromDB() {
  database.ref(USER_ID + '/posts').once('value')
    .then(function(snapshot) {
      snapshot.forEach(function(childSnapshot) {
        childKey = childSnapshot.key;
        childData = childSnapshot.val();
        createTemplate(childData.text, childKey)
        createPost(childData.text, childKey)
      });
    });
}

function createPost(text, key) {
  $('#feed').append(postTemplate);

  $(`p[data-post-id=del${key}]`).click(function() {
    database.ref(USER_ID + '/posts/' + key).remove();
    $(this).closest('.postConteiner').remove();
  });

  $(`p[data-post-id=edit${key}]`).click(function() {
    var thisPost = this;
    var editPost = $(thisPost).closest('.divConteiner').children('.ownPost').text();
    $('#textAreaEdit').val(editPost);
    $('#editModal').toggleClass('d-none');
    $('#editModalButton').click(function() {
      var editedPost = $('#textAreaEdit').val();
      $(thisPost).closest('.divConteiner').children('.ownPost').html(editedPost);
      $('#editModal').toggleClass('d-none');
      $('#textAreaComment').val('');
      database.ref(USER_ID + '/posts/' + key).set({
        text: editedPost
      });
    });
  });

  $(`i[data-post-id=like${key}]`).click(function() {
    $(this).toggleClass('liked');
  });

  $(`i[data-post-id=comment${key}]`).click(function(event) {
    commentKey = key;
    $('#commentModal').toggleClass('d-none');
  });
  $('#commentModalButton').click(function() {
    commentPost();
  $('#commentModal').toggleClass('d-none');
  $('#textAreaComment').val('');
  });
}

function createComment(text, key) {
  $(`div[data-conteiner=${key}]`).append(postTemplate);
  console.log(postTemplate);
  
  $(`p[data-post-id=del${key}]`).click(function() {
    database.ref(USER_ID + '/posts/' + key).remove();
    $(this).closest('.postConteiner').remove();
  });

  // $(`p[data-post-id=edit${key}]`).click(function() {
  //   var thisPost = this;
  //   var editPost = $(thisPost).closest('.divConteiner').children('.ownPost').text();
  //   $('#textAreaEdit').val(editPost);
  //   $('#editModal').toggleClass('d-none');
  //   $('#editModalButton').click(function() {
  //     var editedPost = $('#textAreaEdit').val();
  //     $(thisPost).closest('.divConteiner').children('.ownPost').html(editedPost);
  //     $('#editModal').toggleClass('d-none');
  //     $('#textAreaComment').val('');
  //     database.ref(USER_ID + '/posts/' + key).set({
  //       text: editedPost
  //     });
  //   });
  // });
}

// Amigos
database.ref("users/" + USER_ID).once("value")
  .then(function(snapshot) {
    var userInfo = snapshot.val();
    $('.userName').text(userInfo.name);
  })

database.ref('users').once('value')
  .then(function(snapshot) {
    snapshot.forEach(function(childSnapshot) {
      var childKey = childSnapshot.key;
      var childData = childSnapshot.val();
      createUsers(childData.name, childKey);
    });
  })

function createUsers(name, key) {
  if (key !== USER_ID) {
    $(".user-name").append(`
      <li>
        <span>${name}</span>
        <button data-user-id="${key}">Seguir</button>
      </li>
    `);
  }

  $(`button[data-user-id=${key}]`).click(function() {
    database.ref('friendship/' + USER_ID).push({
      friendId: key
    });
  })
}

$('.signUpBtn').click(function() {
  getUser($('.userName').val());
});

function getUser(name) {
  var data = {
    name: name
  }

  return firebase.database().ref('users').push(data); 
  // return firebase.database().ref().child('users').push(data);
  // return database.ref('users/' + USER_ID).push({
  //   name: name
  // });
};
