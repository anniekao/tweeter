$(document).ready(function() {
  $('textarea').keyup(function(event) {
    let val = this.value.length;
    let count = 0;
    if (count < 140 && count > 0 && event.keyCode === 8) {
      count++;
    } else {
      count = 140 - val;
    }
  });

});