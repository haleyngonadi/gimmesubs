chrome.storage.sync.get("active", function(data) {
  if(typeof data.active == 'undefined' || data.active=='on'){
      //removeElementsByClass('centeres')
      
      var player = document.getElementsByClassName("player-processed")[0];

      console.log(player);

}
});


