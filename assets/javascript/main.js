var topics = [];



    // gets gifs
    function getThoseGIFs() {
        var topic = $(this).attr("data-topic");
        // var topic = "birb";
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + topic + "&api_key=XDTOMC5BSoG18nIRy3wzapB9Mw2UxhWF&limit=10";

        $.ajax({
            url: queryURL,
            method: "GET"

        }).then(function(response) {
            console.log(queryURL);
            console.log(response);
            
            var reply = response.data;

            for (var i = 0; i < reply.length; i++) {
                var topicDiv = $("<div>");
                
                var r = $("<p>").text("Rating: " + reply[i].rating);

                var topicImage = $("<img>");
                topicImage.attr("src", reply[i].images.fixed_height_still.url);
                topicImage.attr("data-still", reply[i].images.fixed_height_still.url);
                topicImage.attr("data-animate", reply[i].images.fixed_height.url);
                topicImage.attr("data-state", "still");            
                topicImage.addClass("image");
                topicImage.addClass("gif");

               
                
                

                topicDiv.append(r);
                topicDiv.append(topicImage);

                $("#gifs").prepend(topicDiv);
            }
        })

    }

    // Play/pause functionality
    $(document).on("click", ".gif", function() {
        console.log("clicked");
        var state = $(this).attr("data-state");
        if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
        } else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
        }
    });
    
    // Ceating buttons 
    function mkButtons () {
        $("#buttons").empty();

        for (var i = 0; i < topics.length; i++) {
            var leButton = $("<button>");

            leButton.addClass("topic-btn");
            leButton.attr("data-topic", topics[i]);
            leButton.text(topics[i]);
            $("#buttons").append(leButton);
        }
    }

    // Click event for creating buttons
    $("#add-topic").on("click", function(event) {
        console.log("clicked");
        // Should prevent form from submitting
        event.preventDefault();
        var topic = $("#topic-input").val().trim();
        console.log(topic);
        topics.push(topic);
        console.log(topics);
        mkButtons();
        
    });

    $(document).on("click", ".topic-btn", getThoseGIFs);


    