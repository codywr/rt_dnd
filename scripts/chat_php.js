// jQuery Document

// TODO: should all functions be nested under '$(document).ready();'?

$(document).ready(function() {

    //If user wants to end session
    $("#exit").click(function() {
        var exit = confirm("Are you sure you want to end the session?");
        if(exit==true) {
            window.location = 'chat.php?logout=true';
        }
    });

    //If user sends a chat msg
    $("#submitmsg").click(function() { //User clicked 'send'
        var clientmsg = $("#usermsg").val(); //Grab msg
        $.post("post.php", {text: clientmsg}); //Send msg
        $("#usermsg").attr("value", ""); //Clear msg
        return false;
    });

    //Load the file containing the chat log
    function loadLog() {
        var oldscrollHeight = $("#chatbox").attr("scrollHeight") - 20; //Scroll height before the request
        $.ajax({
            url: "chat_log.html",
            cache: false, //Want a fresh chat history
            success: function(html) {
                $("#chatbox").html(html); //Insert chat log into the #chatbox div
                //Auto-scroll
                var newscrollHeight = $("#chatbox").attr("scrollHeight") - 20; //Scroll height after the request
                if(newscrollHeight > oldscrollHeight) {
                    $("#chatbox").animate({ scrollTop: newscrollHeight }, 'normal'); //Autoscroll to bottom of div
                }
            },
        });
    }

    //Reload chat history every 1 seconds
    setInterval (loadLog, 1000);

});


