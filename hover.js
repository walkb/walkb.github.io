var lastPage = [];
var newGroup = [];

$(document).ready(function() {

  var clicked = false;

  $(".button").hover(
    function() {
      const audio = new Audio('hovernoise.mp3');
      audio.play();
      $(this).stop(true, false).animate({ marginLeft: "16vw" }, 200);
    },
    function() {
      // console.log("unhover");
      $(this).stop(true, false).animate({ marginLeft: "20vw" });
    }
  )

  $(".profilesection").hover(
    function() {
      const audio = new Audio('hovernoise.mp3');
      audio.play();
      $(this).stop(true, false).animate({ marginTop: "5px" }, 200);
    },
    function() {
      // console.log("unhover");
      $(this).stop(true, false).animate({ marginTop: "0px" });
    }
  )



  $(".button").click(
    function() {
      // test();
      // $(".buttons").animate({ marginLeft: "100vw" });
      if (newGroup.length == 0) {
        hideGroup("buttons");
      } else {
        hideGroup(newGroup[newGroup.length - 1]);
      }
      lastPage.push($(".toptext").text());
      $(".toptext").text($(this).attr("id"));
      $(".backbutton").animate({ left: "0px" })
      clicked = false;
      newGroup.push($(this).attr("id"));
      // console.log(newGroup);
      showGroup(newGroup[newGroup.length - 1]);
    }
  )

  $(".backbutton").click(
    function() {
      // test();
      clicked = true;
      hideGroup(newGroup.pop());
      // if we're only 1 page away from menu
      if (newGroup.length == 0) {
        showGroup("buttons");
        $(".backbutton").animate({ left: "-150px" })
      }
      // we're deeper than that!
      else {
        showGroup(newGroup[newGroup.length - 1]);
      }
      $(".toptext").text(lastPage.pop());
    }
  )

  $(".backbutton").hover(
    function() {
      const audio = new Audio('hovernoise.mp3');
      audio.play();
      $(this).stop(true, false).animate({ left: "5px" }, 200);
    },
    function() {
      // console.log("unhover");
      if (!clicked) {
        $(this).stop(true, false).animate({ left: "0" });
      }
    }
  )
}
)

function showGroup(id) {
  console.log(id);
  var name = "." + id;
  //$(name).show();
  $(name).css("display", "flex");
  $(name).animate({ marginLeft: "0vw" });
}

function hideGroup(id) {
  var name = "." + id;
  $(name).animate({ marginLeft: "100vw" });
  setTimeout(function() {
    $(name).hide();
  }, 200)
}

function test() {
  for (var i = 0; i < lastPage.length; i++) {
    console.log(i + ": " + lastPage[i] + "\n");
  }
  for (var i = 0; i < newGroup.length; i++) {
    console.log(i + ": " + newGroup[i] + "\n");
  }
}