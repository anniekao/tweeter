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


// Test / driver code (temporary). Eventually will get this from the server.
const tweetData = {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png",
        "handle": "@SirIsaac"
      },
    "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
    "created_at": 1461116232227
 }

const $tweet = createTweetElement(tweetData);

// Test / driver code (temporary)
console.log($tweet); // to see what it looks like

$(()=> {
  $("#tweets-container").append($tweet);
})