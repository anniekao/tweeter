$(document).ready(function() {
  let count = 0;

  $('textarea').keyup(function(event) {
    const span = this.closest("form").children[3];
    let val = this.value.length;

    if (count < 140 && event.keyCode === 8) {
      count++;
      span.innerText = count;
    } else {
      count = 140 - val;
      span.innerText = count;
    }

    if (count < 0) {
      span.style.color = "red";
    } else {
      span.style.color = "#545149";
    }
  });

});