$(document).ready(function() {
  function updateCounter(value)  {
    const counterElement = $('#tweet-character-limit');
    const remainingTextLength = 140 - value;

    console.log(`Updating counter: ${remainingTextLength}`);
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
    console.log(element);
    updateCounter(element.value.length)
  }
  

  getTweetInputElement().on('input', function(event) {
    console.log(event);
    const element = event.target;
    if (!element) {
      return;
    }
    updateCounter(element.value.length)  
  });
  
});
