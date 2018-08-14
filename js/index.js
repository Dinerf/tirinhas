var database = firebase.database();
var USER_ID = window.location.search.match(/\?id=(.*)/)[1];

$(document).ready(function() {
  getPostsFromDB();
  $(".addPost").click(buttonPost);
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





