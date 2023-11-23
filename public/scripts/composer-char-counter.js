$(document).ready(function() {
  function updateCounter(value)  {
    const counterElement = $('#tweet-character-limit');
    const remainingTextLength = 140 - value;

    counterElement.html(remainingTextLength);
    if (remainingTextLength < 0) {
      counterElement.addClass('error');
    } else {
      counterElement.removeClass('error');
    }
  }

  function getTweetInputElement() {
    return $("#new-tweet__inputs__text");  
  }

  const element = getTweetInputElement()[0];
  if (element) {
    updateCounter(element.value.length)
  }
  

  getTweetInputElement().on('input', function(event) {
    const element = event.target;
    if (!element) {
      return;
    }
    updateCounter(element.value.length)  
  });
  
});
