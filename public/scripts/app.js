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