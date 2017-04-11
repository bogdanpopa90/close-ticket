var recognizing = false;

if ('webkitSpeechRecognition' in window) {

    var recognition = new webkitSpeechRecognition();

    recognition.lang = 'en-US';
    recognition.continuous = true;
    recognition.interimResults = true;

    recognition.onstart = function() {
        recognizing = true;
    };

    recognition.onerror = function(event) {
        console.log(event.error);
    };

    recognition.onend = function() {
        recognizing = false;
    };

    recognition.onresult = function() {

        if(window.location.href.indexOf("https://secure.helpscout.net/conversation/") > -1) {

            var current_url = window.location.href;
                api_key = '3435efa830f1910236573a1431ada14b52fae9a9',
                api_auth = 'Basic ' + Base64.encode(api_key + ':X'),
                show_stuff = function (data) {
                    console.log(data);
                    console.log('Response from Help Scout received.');
                };

            var current_url_ids = current_url.replace('https://secure.helpscout.net/conversation/',''),
                current_url_2 = current_url_ids.split('/'),
                conversation_id = current_url_2[0];


            console.log(conversation_id);

            // Our commands
             var commands = {
             'close ticket': function() {

                 $.ajax({
                     url: "https://api.helpscout.net/v1/conversations/"+conversation_id+".json",
                     type: 'PUT',
                     data: JSON.stringify({
                         'status': 'closed'
                     }),
                     headers: {
                         'Authorization': api_auth,
                         'Content-Type': 'application/json'
                     },
                     error: function (xhr, ajaxOptions, thrownError) {
                         alert(xhr.status);
                         alert(thrownError);

                     },
                     success: function (r) {
                         show_stuff(r);
                     }
                 });

             }

             };

            // Add commands
            annyang.addCommands(commands);

            // Start listening
            annyang.start();

        }

    };

    startDictation();
}


function startDictation() {
    if (recognizing) {
        recognition.stop();
        return;
    }
    recognition.start();
}