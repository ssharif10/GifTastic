$(document).ready(function() { 

  

      // array of artists
      var topics = ["Beyonce", "Justin Bieber", "Prince", "Maroon 5", "Kelly Rowland", "Adele", "John Legend", "New Edition", "Justin Timberlake", "Destiny's Child"];

      

      // Function for creating buttons from array
      function renderButtons() {

        // Deletes the previous artists in area where buttons will be located before adding new artists or groups
        $("#artists-view").empty();

        // Looping through the array of artists
        for (var i = 0; i < topics.length; i++) {

          // This will generate buttons for each artist in the array
          var artistButton = $("<button>");
          // Adding a class
          artistButton.addClass("artist");
          // Added a data-attribute
          artistButton.attr("data-name", topics[i]);
          // Provided the initial button text
          artistButton.text(topics[i]);
          // Added the button to the HTML
          $("#artists-view").append(artistButton);

        }
      }

      $("#add-artist").on("click", function(event) {
        event.preventDefault();
        // This line grabs the input from the textbox
        var artists = $("#artist-input").val().trim();

        // Adding artist from the textbox to artist array
        topics.push(artists);

        // Calling renderButtons which handles the processing artist array
        renderButtons();
      });

      // this step will bring in gifs

      function displayArtistInfo() {

        var category = $(this).attr("data-name");
        var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + category + "&api_key=dc6zaTOxFJmzC&limit10";

        // Create AJAX call for the specific artist button being clicked
        $.ajax({
          url: queryURL,
          method: "GET"
        }).done(function(response) {
          var results = response.data;
         
          //console.log(response);
          $("#gifs-here").empty();

            // Looping over every returned results item
          for (var i = 0; i < results.length; i++) {

            // will only bring in gifs will pg rating
            if (results[i].rating !== "r" && results[i].rating !== "pg-13") {

            //stores the resulting item's rating
            var rating = results[i].rating;

            //creates a paragraph tag that will hold the resulting item's rating in text
            var p = $("<p>").text("Rating: " + rating);

            var gifArea = $("<div class='item'>");
            
            // Creating an image tag for gif
              var gifImage = $("<img>");

            // Giving the image tag and attributes of a property pulled off the
              // result item
              gifImage.attr("src", results[i].images.fixed_height.url);
              //still version of gif
              gifImage.attr("data-still", results[i].images.fixed_height_still)
              //animated version of gif
              gifImage.attr("data-animate", results[i].images.fixed_height_still)


              // Appending the paragraph and gifImage we created to the "gifDiv" div we created
              gifArea.append(p);
              gifArea.append(gifImage);

            // Prepending the gifArea div to the "#gif-area" div in the HTML
              $("#gif-area").prepend(gifArea);
              }
            }
          })

        }

        // Adding a click event listener to all elements with a class of "artist"
      $(document).on("click", ".artist", displayArtistInfo);

      // Calling the renderButtons function to display the intial buttons
      renderButtons();
});



