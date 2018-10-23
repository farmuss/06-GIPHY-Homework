$(document).ready(function () {

  var heros = [
    "Reinhardt",
    "Roadhog",
    "Winston",
    "Zarya",
    "Bastion",
    "Genji",
    "Hanzo",
    "Junkrat",
    "McCree",
    "Pharah",
    "Reaper",
    "Symmetra",
    "Tracer",
    "Widowmaker",
    "Mercy",
    "Zenyatta",
    "Ana",
    "Sombra",
    "Orisa",
    "Doomfist",
    "Moira",
    "Brigitte",
  ];

  // function to make buttons and add to page
  function populateButtons(arrayToUse, classToAdd, areaToAddTo) {
    $(areaToAddTo).empty();

    for (var i = 0; i < arrayToUse.length; i++) {
      var a = $("<button>");
      a.addClass(classToAdd);
      a.attr("data-type", arrayToUse[i]);
      a.text(arrayToUse[i]);
      $(areaToAddTo).append(a);
    }

  }

  $(document).on("click", ".hero-button", function () {
    $("#heros").empty();
    $(".hero-button").removeClass("active");
    $(this).addClass("active");

    var type = $(this).attr("data-type");
    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + type + "&api_key=dc6zaTOxFJmzC&limit=10";

    $.ajax({
      url: queryURL,
      method: "GET"
    })
      .then(function (response) {
        var results = response.data;

        for (var i = 0; i < results.length; i++) {
          var heroDiv = $("<div class=\"hero-item\">");

          var rating = results[i].rating;

          var p = $("<p>").text("Rating: " + rating);

          var animated = results[i].images.fixed_height.url;
          var still = results[i].images.fixed_height_still.url;

          var heroImage = $("<img>");
          heroImage.attr("src", still);
          heroImage.attr("data-still", still);
          heroImage.attr("data-animate", animated);
          heroImage.attr("data-state", "still");
          heroImage.addClass("hero-image");

          heroDiv.append(p);
          heroDiv.append(heroImage);

          $("#heros").append(heroDiv);
        }
      });
  });

  $(document).on("click", ".hero-image", function () {

    var state = $(this).attr("data-state");

    if (state === "still") {
      $(this).attr("src", $(this).attr("data-animate"));
      $(this).attr("data-state", "animate");
    }
    else {
      $(this).attr("src", $(this).attr("data-still"));
      $(this).attr("data-state", "still");
    }
  });

  $("#add-hero").on("click", function (event) {
    event.preventDefault();
    var newhero = $("input").eq(0).val();

    if (newhero.length > 2) {
      heros.push(newhero);
    }

    populateButtons(heros, "hero-button", "#hero-buttons");

  });

  populateButtons(heros, "hero-button", "#hero-buttons");
});
