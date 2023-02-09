$(document).ready(function() {

  $(".enterbutton").click(
    () => {
      $(".loader").stop(true, false).animate({ opacity: 0 }, 400);

      setTimeout(
        function() {
          $(".loader").remove();
        }, 400
      );
      setTimeout(
        function() {
          $(".buttons").animate({ opacity: 1 })
        }, 400
      );

    }
  )
})