$(document).ready(function(){
  var stop_execution = false;
  
  $(".start-btn").click(function(e){
    $('.start-btn:input[type="submit"]').prop('disabled', true);
    $('.stop-btn:input[type="submit"]').prop('disabled', false);

    var load = true;
    var count = 1;
    var cells = [];

    $('.col-item.active').each(function(){
      var col = parseInt($(this).attr('col'));
      var row = parseInt($(this).attr('row'));
      cells.push([row,col]);
    });

    (function loop() {
      e.preventDefault();
      if (stop_execution == true) {
        stop_execution = false;
        return false;
      }

      $.ajax({
        url: "/game/start",
        method: "POST",
        data: {load: load, cells: cells},
        type: "script"
      });

      $(".loop-count").removeClass("hidden");
      $(".loop-count span").text(count);
      count ++;
      setTimeout(function(){
        load = false;
        loop();
      }, 1000); 
    }());
  });

  $(".stop-btn").click(function(){
    $('.start-btn:input[type="submit"]').prop('disabled', false);
    $('.stop-btn:input[type="submit"]').prop('disabled', true);
    stop_execution = true;
  });

  $(".clear-btn").click(function(){
    stop_execution = true;
    $(".loop-count").addClass("hidden");
    $(".loop-count span").text(0);
    $(':input[type="submit"]').prop('disabled', true);
    $.ajax({
      url: "/game/clear",
      method: "POST",
      type: "script"
    });
  });
});

$(document).on("click", ".col-item", function(){
  $('.start-btn:input[type="submit"], .clear-btn:input[type="submit"]').prop('disabled', false);
  if($(this).hasClass("active")){
    $(this).removeClass("active");
  }else{
    $(this).addClass("active");
  }
});