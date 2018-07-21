<?php
    session_start();
    if(isset($_SESSION['name'])){
        $text = $_POST['text']; //Grab the msg
        $fp = fopen("chat_log.html", 'a'); //Append to the msg log
        //Put the msg in the msgln <div> along with name and date
        fwrite($fp, "<div class='msgln'>(".date("g:i A").") <b>".$_SESSION['name']."</b>: ".stripslashes(htmlspecialchars($text))."<br></div>");
        fclose($fp);
    }
?>

