
function showForm() {
  $("#addForm").css("display", "inline")
}
    
    function hideForm() {
  $("#addForm").css("display", "none")
}

function drop(){
  $(".dropmenuLinks").css("display", "inline-block")
}

window.onclick = function(event) {
  if (!event.target.matches('#menuTitle')) {
    $(".dropmenuLinks").css("display", "none")
  }
  else{
     $(".dropmenuLinks").css("display", "inline-block")
  }
}