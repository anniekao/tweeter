$(document).ready(function() {
  
  $('textarea').keyup(function(event) {
    let val = this.value.length;
    let count = 0;
    if (count < 140 && count > 0 && event.keyCode === 8) {
      count++;
      $(".counter").text(count);
    } else {
      count = 140 - val;
      $(".counter").text(count);
    }
  });

});