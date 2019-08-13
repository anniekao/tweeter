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



// Previous solution that did not completely use jquery...

// $(document).ready(function() {

//   $('textarea').keyup(function() {
//     const span = this.closest("form").children[3];
//     let val = $('textarea').val().length;;
//     const charsRemaining = 140 - val;

//     span.innerText = charsRemaining;

//     if (charsRemaining < 0) {
//       //span.style.color = "red";
//     } else {
//       //span.style.color = "#545149";
//     }
//   });

// });