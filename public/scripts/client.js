/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
const MAX_TWEET_LENGTH = 141;


const loadTweets = function() {

  $.get('/tweets',
    (tweets) => {
      renderTweets(tweets);
    }
  );
}

const renderTweets = function(tweets) {
  let tweetContainer = $("#tweets");
  tweetContainer.empty();
  tweets.forEach(element => {
    const tweet = createTweetElement(element);
    tweetContainer.prepend(tweet);
  });
}

const escape = function (str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

const  createTweetElement = function(data) {
  const dateLabel = timeago.format(data.created_at);
  return `
  <article class="tweet">
  <header class="tweet__header">
    <div class="header__user">

      <img class="user__avatar" src="${data.user.avatars}">
      <h2 class="user__name">
        ${data.user.name}
      </h2>
    </div>
    <h2 class="header_handle grey">
      ${data.user.handle}
    </h2>
  </header>
  <section class="tweet__body">
    ${escape(data.content.text)}
  </section>
  <footer class="tweet__footer">
    <p class="footer__date">
      ${dateLabel}
    </p>
    <div class="footer__controls">
      <i class="fa-solid fa-flag"></i>
      <i class="fa-solid fa-retweet"></i>
      <i class="fa-solid fa-heart"></i>
    </div>
  </footer>
</article>
  `;
}


const clearErrorMessage = function() {
  $('#errorMessage').slideUp();
}

const displayErrorMessage = function(error) {
  $("#errorMessage").text(`${error}`);
  $("#errorMessage").slideDown();
};




const sendTweet = function(form) {
  clearErrorMessage();
  const formData = form.serializeArray();
  if(formData.length === 0 || formData[0].value.length === 0) {
    displayErrorMessage("Empty tweet");
    return;
  }

  if(formData[0].value.length >= MAX_TWEET_LENGTH) {
    displayErrorMessage("Tweet is too long");
    return;
  }
  $.post("/tweets/", form.serializeArray(), (result) => {
    loadTweets();
  });
}

$(document).ready(function(form) {
  loadTweets();

  $('#new-tweet__form').on('submit', (event) => {
    event.preventDefault();
    const form = $(event.target);
    sendTweet(form);
  });
});
