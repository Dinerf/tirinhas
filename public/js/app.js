$(document).ready(function() {
  getFollowingPostsFromDB()
  getFollowingFromDB();  
  getPostsFromDB();
});

var database = firebase.database();
var USER_ID = window.location.search.match(/\?id=(.*)/)[1];
var userName;
var childKey;
var childData;
var userPhoto;
var newPost;
var commentKey;
getNameFromDB();

function buttonPost() {
  newPost = $('.newPost').val();
  var postFromDB = addPostToDB(newPost);
  createTemplate(newPost, postFromDB.key, userName)
  createPost(newPost, postFromDB.key)
}

function buttonFind() {
  $('.foundUser').remove();    
  var search = $('.search').val().toUpperCase(); 
  if((search).startsWith('#')) {

  } else {
    database.ref('users').once('value')
    .then(function(snapshot) {
      snapshot.forEach(function(childSnapshot) {
        var childKey = childSnapshot.key;
        var childData = childSnapshot.val();
        if (childKey !== USER_ID && childData.name.toUpperCase().startsWith(search)) {    
          findTemplate(childData.name, childKey, 'Seguir');
          $('#findList').prepend(findUserTemplate);
        }
        $(`button[data-follow=${childKey}]`).click(function(event) {
          var clickFollow = event.target.dataset.follow;
          var clickName = $(event.target).siblings('.m-2').html();
          var match = false;
          database.ref('users/' + USER_ID + '/following').once('value')
          .then(function(snapshot) {            
            snapshot.forEach(function(childSnapshot) {
              var newChildData = childSnapshot.val().followingID;
              
              if(clickFollow == newChildData) {
                match = true;
              }
            });
            if(match === false) {
              database.ref('users/' + USER_ID + '/following').push({
                followingID: clickFollow,
                followingName: clickName
              });
            }
          }); 
          
          match = false;
        })
      });
    });
  }
  $('.search').val('');
}

$('.search').click(function() {
  if($('#findModal').is(':visible')) {
    $('#findModal').toggleClass('d-none'); 
  }
});

$('.mainNavbar').click(function() {
  if($('#findModal').is(':visible')) {
    $('#findModal').toggleClass('d-none'); 
  }
});

function commentPost() {
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
  var name;
  database.ref('users/' + USER_ID).once('value')
  .then(function(snapshot) {
    name = snapshot.val().name;
  })
  .then(function() {
    database.ref('users/' + USER_ID + '/posts').once('value')
    .then(function(snapshot) {
      snapshot.forEach(function(childSnapshot) {
        childKey = childSnapshot.key;
        childData = childSnapshot.val();
        createTemplate(childData.text, childKey, userName, USER_ID)
        createPost(childData.text, childKey)
      });
    });
  }); 
}

function getFollowingPostsFromDB() {
  database.ref('users/' + USER_ID + '/following').once('value')
  .then(function(snapshot) {
    snapshot.forEach(function(childSnapshot) {
      var followUserID = childSnapshot.val().followingID;
      
      database.ref('users/' + followUserID).once('value')
      .then(function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
          childSnapshot.forEach(function(newChildSnapshot) {
            var followingName = snapshot.val().name;
            childKey = newChildSnapshot.key;
            childData = newChildSnapshot.val();
                        
            followTemplate(childData.text, childKey, followingName, followUserID);
            $('#feed').prepend(followingTemplate);
            if($('.postVisibility').hasClass('private')) {
              $(this).toggleClass('d-none');
            }

            $(`i[data-post-id=like${childKey}]`).click(function() {
              $(this).toggleClass('liked');
            });
            $('#profile').click(function() {
              $("[data-uid]").each(function() {
                var uid = $(this).data("uid");
                if (uid !== USER_ID) {
                  $(this).removeClass('d-flex').addClass('d-none');
                }
              });
              $('.filter').addClass('d-none');
            });
            $('#home').click(function() {
              $("[data-uid]").each(function() {
                  $(this).removeClass('d-none').addClass('d-flex');
              });
              $('.filter').removeClass('d-none')
            });
            $('#filterFollow').click(function() {
              $("[data-uid]").each(function() {
                var uid = $(this).data("uid");
                if (uid == USER_ID) {
                  $(this).removeClass('d-flex').addClass('d-none');
                }
              });
            });
            $('#filterAll').click(function() {
              $("[data-uid]").each(function() {
                  $(this).removeClass('d-none').addClass('d-flex');
              });
            });
          });
        });
      });


    });
  });
}

function getFollowingFromDB() {
  $('#followingList').children('.d-flex ').remove();
  database.ref('users/' + USER_ID + '/following').once('value')
  .then(function(snapshot) {
    snapshot.forEach(function(childSnapshot) {
      childKey = childSnapshot.key;
      childData = childSnapshot.val();
        findTemplate(childData.followingName, childKey, 'Excluir');
        $('#followingList').prepend(findUserTemplate);
        $(`button[data-follow="${childKey}"]`).click(function() {
          database.ref('users/' + USER_ID + '/following/' + childKey).remove();
          $(this).closest('.foundUser').remove();          
        });
    });
  });
}

function getNameFromDB() {
  database.ref('users/' + USER_ID).once('value')
  .then(function(snapshot) {
    userName = snapshot.val().name;
  }); 
}

function createPost(text, key) {
  $('#feed').prepend(postTemplate);
  
  $('.postVisibility').click(function() {
    $(this).toggleClass('private').toggleClass('public');
  });

  $(`p[data-post-id=del${key}]`).click(function() {
    database.ref('users/' + USER_ID + '/posts/' + key).remove();
    $(this).closest('.postConteiner').remove();
  });

  $(`p[data-post-id=edit${key}]`).click(function() {
    var thisPost = this;
    var editPost = $(thisPost).closest('.divConteiner').children('.postdiv').children('.ownPost').text();
    
    $('#textAreaEdit').val(editPost);
    $('#editModal').toggleClass('d-none');
    $('#editModalButton').click(function() {
      var editedPost = $('#textAreaEdit').val();
      $(thisPost).closest('.divConteiner').children('.postdiv').children('.ownPost').html(editedPost);
      $('#editModal').toggleClass('d-none');
      $('#textAreaComment').val('');
      database.ref('users/' + USER_ID + '/posts/' + key).set({
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
  $(`div[data-conteiner=${key}]`).prepend(postTemplate);

  $(`p[data-post-id=del${key}]`).click(function() {
    database.ref('users/' + USER_ID + '/posts/' + key).remove();
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
  //     database.ref('users/' + USER_ID + '/posts/' + key).set({
  //       text: editedPost
  //     });
  //   });
  // });
}

// Amigos
// database.ref('users/' + USER_ID).once('value')
//   .then(function(snapshot) {
//     var userInfo = snapshot.val();
//     $('.userName').text(userInfo.name);
//   })
