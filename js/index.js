var database = firebase.database();
var USER_ID = window.location.search.match(/\?id=(.*)/)[1];

$(document).ready(function() {
<<<<<<< HEAD
  $('.navbar-opt').click(function(event) {
    $('.collapse-opt').collapse('hide');
    $(event.target).collapse('show');
  });
  
  database.ref('toDo/' + USER_ID).once('value')
  .then(function(snapshot) {
    snapshot.forEach(function(childSnapshot) {
      var childKey = childSnapshot.key;
      var childData = childSnapshot.val();
      $('.toDoList').append(`
        <li>
          <input type='checkbox' data-toDoID=${childKey}/>
          <span>${childData.text}</span>
        </li>
      `);

      $(`input[data-toDoID='${childKey}']`).click(function() {
        database.ref('toDo/' + USER_ID + '/' + childKey).remove();
        $(this).parent().remove();      
      });
    });
  });
    
  $('.addItem').click(function(event) {
    event.preventDefault();
    var newItem = $('.toDoInput').val();
    var itemDB = database.ref('toDo/' + USER_ID).push({
      text: newItem
    });
    
    $('.toDoList').append(`
      <li>
        <input type='checkbox' data-toDoID=${itemDB.key} />
        <span>${newItem}</span>
      </li>
    `);

    $(`input[data-toDoID='${itemDB.key}']`).click(function() {
      database.ref('toDo/' + USER_ID + '/' + itemDB.key).remove();
      $(this).parent().remove();      
    });

  }); 
  
=======
  getPostsFromDB();
  $(".addPost").click(buttonPost);
>>>>>>> 94233c212342e8798adef052f858868209098105
});

function buttonPost(event) {
  event.preventDefault();

  var newPost = $(".postText").val();
  var postFromDB = addPostToDB(newPost);

  createPost(newPost, postFromDB.key)
}

function addPostToDB(text) {
  return database.ref("posts/" + USER_ID).push({
    text: text
  });
}

function getPostsFromDB() {
  database.ref("posts/" + USER_ID).once('value')
    .then(function(snapshot) {
      snapshot.forEach(function(childSnapshot) {
        var childKey = childSnapshot.key;
        var childData = childSnapshot.val();
        createPost(childData.text, childKey)
      });
    });
}

function createPost(text, key) {
  $(".posted").append(`
    <li>
      <input type="checkbox" data-post-id=${key} />
      <span>${text}</span>
    </li>`);

  $(`input[data-post-id="${key}"]`).click(function() {
    database.ref("posts/" + USER_ID + "/" + key).remove();
    $(this).parent().remove();
  });
}





