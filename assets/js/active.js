var activeSelect = document.getElementById("active");
chrome.storage.sync.get("active", function(data) {
  console.log(typeof data.active)
  if(typeof data.active != 'undefined'){
  activeSelect.value = data.active;
}else{
  activeSelect.value = "on";
}
});

activeSelect.addEventListener("change", function() {
  var flag = document.getElementById('active').value;
  chrome.storage.sync.set({
    active: flag
  });
});
