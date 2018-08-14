// var database = firebase.database();
// var USER_ID = window.location.search.match(/\?id=(.*)/);

$(document).ready(function() {
  // database.ref('profile/' + USER_ID).once('value')
  
  $('.deletePost').click(function() {
    $(this).closest('.postConteiner').remove(); 
  });
  $('.editPost').click(function() {
    var thisPost = this;
    var editPost = $(thisPost).closest('.divConteiner').children('.ownPost').html();
    $('#textAreaEdit').val(editPost);
    $('#editModal').toggleClass('d-none');
    $('#editModalButton').click(function() {
      var editedPost = $('#textAreaEdit').val();
      $(thisPost).closest('.divConteiner').children('.ownPost').html(editedPost);
      $('#editModal').toggleClass('d-none');
      $('#textAreaComment').val('');
    });
  });
  $('#like').click(function() {
    $(this).toggleClass('liked');
  });
  $('#comment').click(function() {
    $('#commentModal').toggleClass('d-none');
  });
  $('#commentModalButton').click(function() {
    newPost = $('#textAreaComment').val();
    $('<div>').attr('class', 'postConteiner border m-2 d-flex').html(textPosted).appendTo('#feed');
    $('#commentModal').toggleClass('d-none');
    $('#textAreaComment').val('');
  });
});

