$(document).ready(function() {
  $('.navbar-opt').click(function(event) {
    $('.collapse-opt').collapse('hide');
    $(event.target).collapse('show');
  });
  $('.nav-toggle').click(function(event) {
    if($('#navbarToggleExternalContent').is(':visible')) {
      $('.collapse-opt').collapse('hide');
    }
  })
  $('#home').click(function() {
    $('#header').removeClass('d-flex').addClass('d-none');
  });
  $('#follow').click(function() {
    getFollowingFromDB();
    $('#followingModal').toggleClass('d-none');
  });
  $('.closeButton').click(function () {
    $(this).parent().toggleClass('d-none');
  });
  $('#profile').click(function() {
    $('#header').addClass('d-flex').removeClass('d-none');
  });
  $('.textPostButton').click(function() {
    buttonPost();
    $('.newPost').val('');
  });
  $('.findButton').click(function() {
    buttonFind();
    $('#findModal').toggleClass('d-none');
  });
}); 