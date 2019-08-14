/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const calculateDaysBetween = (dateCreated) => {
  const dateThen = dateCreated;
  const dateNow = new Date();

  const differenceInTime = dateNow.getTime() - dateThen.getTime();

  // divide differenceInTime by milliseconds in a day
  const differenceInDays = Math.round(differenceInTime / (1000 * 60 * 60 * 24));


  return differenceInDays === 1 ? '1 day ago' : `${differenceInDays} days ago`;
};

const createTweetElement = (tweet) => {
   // escapes text by making use of .createTextNode() to avoid
  // cross-site-scripting (XSS)
  const escape = str => {
    let div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  const $tweet = $("<article>").addClass("tweet").append(`
     <header>
      <img src= ${tweet.user.avatars}>
      <span class="userName">${tweet.user.name}</span>
      <span class="userHandle">${tweet.user.handle}</span>
    </header>

    <main>
    
      <div class="tweet-text">${escape(tweet.content.text)}</div>
    </main>

    <footer>
      <div class="date">
        <span class="days">${calculateDaysBetween(new Date(tweet.created_at))}</span>
        <span class="fullDate">Created on ${new Date(tweet.created_at).toLocaleDateString("en-US")}</span>
      </div>
      
      
      <div id="icons">         
        <img src="./images/flag.png" />
        <img src="./images/share.png" />
        <img src="./images/like.png" />
      </div>
    </footer>
  `);
  
  return $tweet;

};

const renderTweets = (tweetArr) => {
  for (let tweet of tweetArr) {
    $('#tweets-container').append(createTweetElement(tweet));
  }
};

const loadTweets = () => {
  $.ajax('/tweets', {
    method:'GET',
  }).then(function(res) {
    renderTweets(res);
  });
};



$(function() {
  loadTweets();

  $('#tweet-form').hide();

  // Toggles the visibility of the tweet textarea/form 
  $('#double-chevron').click(function() {
    $('#tweet-form').slideToggle();
  });

  const $form = $("#tweet-form");

  // Form validation using jquery-validation plugin
  $form.validate({
    rules: {
      text: {
        required: true,
        minlength: 2,
        maxlength: 140
      }
    },
    messages: {
      text: {
        required: `<div class="err">Please enter a tweet </div>`,
        minlength: `<div class="err">Your tweet is too short!</div>`,
        maxlength: `<div class="err">Your tweet is too long!</div>`
      }
    },
    submitHandler: function(form) {
      // AJAX call after form has been validated
      $.ajax({
        url: "/tweets",
        type: "POST",
        data: $form.serialize(),
        success: function() {
          loadTweets();
        },
        error: function() {
          alert("Tweet is too short!");
        }
      });
      $("textarea").val("");
      return false;
    }
  });

  // When user scrolls down 30px from top then the scroll up button appears
  const $scrollUpBtn = $("#scrollUpBtn");
  $scrollUpBtn.hide();
  
  window.onscroll = () => {
    scrollFunc();
  };

  const scrollFunc = () => {
    const position = $(window).scrollTop();

    if (position > 900) {
      $("#scrollUpBtn").show();
    } else {
      $("#scrollUpBtn").hide();
    }
  };

  // Used to scroll back up when  scroll up button is clicked
  $scrollUpBtn.click(function() {
    $(window).scrollTop({ top: 0, behavior: 'smooth'});
  });
});
