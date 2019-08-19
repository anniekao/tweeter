// Current jquery improved code

$(document).ready(function() {
  $('textarea').keyup(function() {
    const length = $(this).val().length;
    const charsRemaining = 140 - length;

    $('.counter').text(charsRemaining);

    // // add or remove class depending on counter value
    if (charsRemaining < 0) {
      $('.counter').addClass("warning");
    } else {
      $('.counter').removeClass("warning");
    }
  });
});