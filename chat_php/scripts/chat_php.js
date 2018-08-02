// jQuery Document

// TODO: should all functions be nested under '$(document).ready();'?

$(document).ready(() => {
  // If user wants to end session
  $('#exit').click(() => {
    const exit = window.confirm('Are you sure you want to end the session?');
    if (exit === true) {
      window.location = 'chat.php?logout=true';
    }
  });

  // If user sends a chat msg
  $('#submitmsg').click(() => { // User clicked 'send'
    const clientmsg = $('#usermsg').val(); // Grab msg
    $.post('post.php', { text: clientmsg }); // Send msg
    $('#usermsg').attr('value', ''); // Clear msg
    return false;
  });

  // Load the file containing the chat log
  function loadLog() {
    const oldscrollHeight = $('#chatbox').attr('scrollHeight') - 20; // Scroll height before the request
    $.ajax({
      url: 'chat_log.html',
      cache: false, // Want a fresh chat history
      success(html) {
        $('#chatbox').html(html); // Insert chat log into the #chatbox div
        // Auto-scroll
        const newscrollHeight = $('#chatbox').attr('scrollHeight') - 20; // Scroll height after the request
        if (newscrollHeight > oldscrollHeight) {
          $('#chatbox').animate({ scrollTop: newscrollHeight }, 'normal'); // Autoscroll to bottom of div
        }
      },
    });
  }

  // Reload chat history every 1 seconds
  setInterval(loadLog, 1000);
});
