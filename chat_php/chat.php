<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
    <head>
        <title>PHP Chat PHP</title>
        <link type="text/css" rel="stylesheet" href="styles/chat_php.css" />
    </head>
    <body>

<?php
    session_start();

    function loginForm() {
        echo'
            <div id="loginform">
                <form action="chat.php" method="post">
                    <p>Please enter your name to continue:</p>
                    <label for="name">Name:</label>
                    <input type="text" name="name" id="name" />
                    <input type="submit" name="enter" id="enter" value="Enter" />
                </form>
            </div>
        ';
    }

    if(isset($_POST['enter'])) {
        if($_POST['name'] != "") {
            $_SESSION['name'] = stripslashes(htmlspecialchars($_POST['name']));
        } else {
            echo '<span class="error">Please type in a name</span>';
        }
    }

    if(!isset($_SESSION['name'])) {
        loginForm(); //hasn't logged in, prompt for name
    } else { //start else (chat branch)
        echo '

        <div id="wrapper">
            <div id="menu">
                <p class="welcome">Welcome, <b>' . $_SESSION["name"] . '</b></p>
                <p class="logout"><a id="exit" href="#">Exit Chat</a></p>
                <div style="clear:both"></div>
            </div>

            <div id="chatbox">
        ';
        //Populate chat box with message
        if(file_exists("chat_log.html") && filesize("chat_log.html") > 0) {
            $handle = fopen("chat_log.html", "r");
            $contents = fread($handle, filesize("chat_log.html"));
            fclose($handle);
            echo $contents;
        }

        echo'
            </div>
            <form name="message" action="">
                <input name="usermsg" type="text" id="usermsg" size="63" />
                <input name="submitmsg" type="submit" id="submitmsg" value="Send" />
            </form>
        </div>
        ';

        //JavaScript not needed in login prompt
        echo '<script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.3/jquery.min.js"></script>';
        echo '<script type="text/javascript" src="scripts/chat_php.js"></script>';


    } //end else (chat branch)

    if(isset($_GET['logout'])) {
        //Add a user logout message to the chat log
        $fp = fopen("chat_log.html", 'a');
        fwrite($fp, "<div class='msgln'>(".date("g:i A").") <i>User ". $_SESSION['name'] ." has left the chat session.</i><br></div>");
        fclose($fp);

        session_destroy(); //Logout by cleaning up the session
        header("Location: chat.php"); //Redirect the user
    }
?>

    </body>
</html>

