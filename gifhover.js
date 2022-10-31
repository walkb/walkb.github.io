$(document).ready(function()
  {
    $(".gif").hover(
      function() {
        var new_src = $(this).attr("src");  
        $(this).attr("src", new_src.replace("jpg", "gif"));
        console.log(new_src);
      },
      function() {
        var new_src = $(this).attr("src");  
        $(this).attr("src", new_src.replace("gif", "jpg"));
        console.log(new_src);
      }
    )
  }
)
