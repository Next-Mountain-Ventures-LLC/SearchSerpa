// Script to force Bloom.io button to be blue
(function() {
  // Function to apply blue styling to Bloom elements
  function forceBlueBloomButton() {
    // Find all elements that might be the Bloom button
    var bloomButtons = document.querySelectorAll(
      '[class*="bloom"][class*="button"],[class*="bloom"][class*="Button"],[class*="bloom-launcher"],div[class*="bloom"] > button,#bloom-container button,.bloom-widget button,.bloom-launcher,.bloom-chat-button,.bloom-launcher-button'
    );
    
    // Apply blue color to all matching elements
    for (var i = 0; i < bloomButtons.length; i++) {
      bloomButtons[i].style.setProperty('background-color', 'hsl(199 89% 30%)', 'important');
      bloomButtons[i].style.setProperty('border-color', 'hsl(199 89% 30%)', 'important');
      
      // Also try direct attribute setting for maximum compatibility
      bloomButtons[i].setAttribute('style', bloomButtons[i].getAttribute('style') + ';background-color:hsl(199 89% 30%) !important;border-color:hsl(199 89% 30%) !important;');
    }
  }
  
  // Apply immediately
  forceBlueBloomButton();
  
  // Apply every second to catch delayed loading
  setInterval(forceBlueBloomButton, 1000);
  
  // Create an observer to watch for when the Bloom button is added to the DOM
  var observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
      if (mutation.addedNodes && mutation.addedNodes.length > 0) {
        forceBlueBloomButton();
      }
    });
  });
  
  // Start observing the document body for changes
  observer.observe(document.body, {
    childList: true,
    subtree: true
  });
})();