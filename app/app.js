console.log("Sanity Check: JS is working!");

$(document).ready(function() {
  // code in here
  $.ajax({
    method: 'GET',
    url: 'http://localhost:6000/api/dogBreed',
    success: doThis,
    error: doThat
  });

  function doThis(json) {
    var dogBreed = json;
  //  dogBreed.forEach(function(dogs) {
      //var woof = '<p>' + tacos.name + '</p>';
      //$(".tacoInfo").append(guey);
      console.log(json);
    })
  }

  function doThat(xhr, status, errorThrown) {
    console.log('uh oh');
  }
