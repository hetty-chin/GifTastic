window.onload = function() {
    // ----------
    // --- global variables ---
    // ----------
    // initial array of strings
    var topics = ["centaur", "unicorn", "dragon", "goblin", "elf", "ogre" ]

    // create buttons for each string in the array
    var i;
    for (i = 0; i < topics.length; i++) {
        var btn = document.createElement("BUTTON");
        btn.innerHTML = topics[i];
        btn.setAttribute("id", topics[i]);
        document.getElementById("gif-buttons").appendChild(btn);
    };

    // when the user clicks a button the page should grab 10 static non-animated gifs and place them on the page
    // Event listener for all button elements
    document.querySelector(".container").addEventListener("click", function(event) {
        if (event.target.tagName === "button".toUpperCase()) {
            console.log(event);
          
            // In this case, the "this" keyword refers to the button that was clicked -- FIX!!!
            var magicCreature = event.target.getAttribute("id");

            // the url to query the database
            var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=ssj9ZRSJeEAQjhKSydsq6jNcSCJYKzhc" + "&q=" + magicCreature + "&limit=10&lang=en";

            // run AJAX for GIPHY API
            fetch(queryURL, {
                method: "GET"
            })
            // after data comes back from API
            .then(function(response) {
                return response.json();
            })
            .then(function(response) {
                // store array of results in results variable
                var results = response.data
                // loop each result item
                for (let item of results) {
                    // create a div for the gif
                    var gifDiv = document.createElement("div");
                    // store the rating
                    var rating = item.rating;
                    // p tag for each rating
                    var ratingParagraphTag = document.createElement("p")
                    ratingParagraphTag.innerText = "Rating: " + rating;
                    // image tags
                    var gifImage = document.createElement("img");
                    // the src attr to the image tag
                    gifImage.setAttribute("src", item.images.fixed_height_still.url)
                    // append image and rating to the gifDiv
                    gifDiv.appendChild(gifImage);gifDiv.appendChild(ratingParagraphTag);
                    // add the still and the animated state
                    gifImage.setAttribute("gif-still", item.images.fixed_height_still.url)
                    gifImage.setAttribute("gif-animate", item.images.fixed_height.url)
                    gifImage.setAttribute("gif-state", "still")
                    // add a gif class to be called when animating the gif
                    gifImage.setAttribute("class", "is-a-gif")
                    // prepend the gifDiv to the designated area in HTML
                    let gifsContainer = document.querySelector("#gifs-display");
                    gifsContainer.insertBefore(gifDiv, gifsContainer.firstChild);

                }
            })                     
        } else if (event.target.className = "is-a-gif") {
            console.log("I just clicked a gif");
            // change the state from still to animate and vice versa 
            var state = event.target.getAttribute("gif-state");
            if (state === "still") {
                event.target.setAttribute("src", event.target.getAttribute("gif-animate"));
                event.target.setAttribute("gif-state", "animate");
            } else {
                event.target.setAttribute("src", event.target.getAttribute("gif-still"));
                event.target.setAttribute("gif-state", "still");
            }

        }
    })
}