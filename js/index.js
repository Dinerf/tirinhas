var database = firebase.database();
var USER_ID = window.location.search.match(/\?id=(.*)/);

$(document).ready(function() {
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
  
});








