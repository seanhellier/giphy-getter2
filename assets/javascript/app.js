// ### Instructions

// 1. Before you can make any part of your site work, you need to create an array of strings, each one related to a topic that interests you. Save it to a variable called `topics`.
//    * We chose animals for our theme, but you can make a list to your own liking.

// 2. Your app should take the topics in this array and create buttons in your HTML.
//    * Try using a loop that appends a button for each string in the array.

// 3. When the user clicks on a button, the page should grab 10 static, non-animated gif images from the GIPHY API and place them on the page.

// 4. When the user clicks one of the still GIPHY images, the gif should animate. If the user clicks the gif again, it should stop playing.

// 5. Under every gif, display its rating (PG, G, so on).
//    * This data is provided by the GIPHY API.
//    * Only once you get images displaying with button presses should you move on to the next step.

// 6. Add a form to your page that takes a value from a user input box and adds it to your `topics` array. Then make a function call that takes each topic in the array and remakes the buttons on the page.


// ### Bonus Goals

// 1. Ensure your app is fully mobile responsive.

// 2. Allow users to request additional gifs to be added to the page.
//    * Each request should ADD 10 gifs to the page, NOT overwrite the existing gifs.

// 3. List additional metadata (title, tags, etc) for each gif in a clean and readable format.

// 4. Integrate this search with additional APIs such as OMDB, or Bands in Town. Be creative and build something you are proud to showcase in your portfolio

// 5. Allow users to add their favorite gifs to a `favorites` section.
//    * This should persist even when they select or add a new topic.
//    * If you are looking for a major challenge, look into making this section persist even when the page is reloaded(via localStorage or cookies).

$( document ).ready(function() {
    // Giphy thingy button input array
    var actions = ["Surfing", "Skydiving", "BASE Jumping", "Flying", "Diving"];
    
    function dispBttn(){
    // clear button display div to prevent duplicate buttons from the array.
        $("#bttnDiv").empty(); 
    
        for (var i = 0; i < actions.length; i++){
            var bttnDiv = $("<button>");
            bttnDiv.addClass("action");
            bttnDiv.addClass("btn btn-primary")
            bttnDiv.attr("data-name", actions[i]);
            bttnDiv.text(actions[i]);
            $("#bttnDiv").append(bttnDiv);
        }
    }
    // Function to add a new action button
    function addNewButton(){
        $("#addGif").on("click", function(){
        var action = $("#action-input").val().trim();
        if (action == ""){
          return false;
        }
        actions.push(action);
    
        dispBttn();
        return false;
        });
    }
    
    function removeLastButton(){
        $("removeGif").on("click", function(){
        actions.pop(action);
        dispBttn();
        return false;
        });
    }
    // Function that displays the gifs
    function displayGifs(){
        var action = $(this).attr("data-name");
        var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + action + "&api_key=00IrDsXH8cqG2XVQLoEsQi7EuM8cO3Ud&limit=10";
    
        $.ajax({
            url: queryURL,
            method: 'GET'
        })
        .done(function(response) {
    //  set buttons displayed to null to avoid duplications
       $("#gifHolder").empty();
            var results = response.data;
            for (var i=0; i<results.length; i++){
                // setup divs to hold result gifs and attributes such as ratings
                var gifDiv = $("<div>");
                gifDiv.addClass("gifDiv");
                var gifRating = $("<p>").text("Rating: " + results[i].rating);
                gifDiv.append(gifRating);
                var gifAttrs = $("<img>");
                gifAttrs.attr("src", results[i].images.fixed_height_small_still.url); 
                gifAttrs.attr("data-still",results[i].images.fixed_height_small_still.url);
                gifAttrs.attr("data-animate",results[i].images.fixed_height_small.url);
                gifAttrs.attr("data-state", "still");
                gifAttrs.addClass("image");
                gifDiv.append(gifAttrs);
        
                // add divs to HTML div
                $("#gifHolder").prepend(gifDiv);
            }
        });
    }
    dispBttn();
    addNewButton();
    removeLastButton();
    $(document).on("click", ".action", displayGifs);
    $(document).on("click", ".image", function(){
        var state = $(this).attr('data-state');
        if ( state == 'still'){
            $(this).attr('src', $(this).data('animate'));
            $(this).attr('data-state', 'animate');
        }else{
            $(this).attr('src', $(this).data('still'));
            $(this).attr('data-state', 'still');
        }
    });
    });
    