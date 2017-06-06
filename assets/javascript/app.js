$(document).ready(function() { 

  

      // array of artists
      var topics = ["Beyonce", "Justin Bieber", "Prince", "Maroon 5", "Kelly Rowland", "The Fray", "Adele", "John Legend", "New Edition", "Justin Timberlake", "Destiny's Child", "Usher",];

      // function for capturing the artist name from the data-attribute
      function displayArtist() {
        var artists = $(this).attr("data-name");
        var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + artist + "&api_key=dc6zaTOxFJmzC&limit10";

        // Create AJAX call for the specific artist button being clicked
        $.ajax({
          url: queryURL,
          method: "GET"
        }).done(function(response) {

          console.log(response);

          // Create a div to hold the artist gif
          var artistDiv = $("<div class='artist'>");
          // rating will be stored here
          var rating = response.Rated;

          // Rating will be displayed in a paragraph element.  This creates the element.
          var p1 = $("<p>").text("Rating: " + rating);

          // Div for displaying the rating
          artistDiv.append(p1);

          // Putting the newest artist above the previous artist
          $("#artist-view").prepend(artistDiv);  

      })

      // Function for displaying artist data
      function renderButtons() {

        // Deletes the previous artist's in area where buttons will be located before adding new artists or groups
        $("#artists-view").empty();

        // Looping through the array of artists
        for (var i = 0; i < topics.length; i++) {

          // This will generate buttons for each artist in the array
          var artistButton = $("<button>");
          // Adding a class
          artistButton.addClass("artist");
          // Added a data-attribute
          artistButton.attr("data-name", movies[i]);
          // Provided the initial button text
          artistButton.text(movies[i]);
          // Added the button to the HTML
          $("#artist-view").append(artistButton);
        }
      }

      $("#add-artist").on("click", function(event) {
        event.preventDefault();
        // This line grabs the input from the textbox
        var movie = $("#artist-input").val().trim();

        // Adding artist from the textbox to artist array
        artists.push(artist);

        // Calling renderButtons which handles the processing artist array
        renderButtons();
      });
      // this will clear the input field once button is created
        var artist = $("#artist-input").val()
};
