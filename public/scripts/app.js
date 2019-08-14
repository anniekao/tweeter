/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const createTweetElement = (tweet) => {
  const $tweet = $("<article>").addClass("tweet").append(`
     <header>
      <img src= ${tweet.user.avatars}>
      <span class="userName">${tweet.user.name}</span>
      <span class="userHandle">${tweet.user.handle}</span>
    </header>

    <main>
      <div class="tweet-text">${tweet.content.text}</div>
    </main>

    <footer>
      <h6>10 days ago</h6>
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

loadTweets();

$(function() {
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
});
