let final_transcript = '';
let recognizing = false;

if ('webkitSpeechRecognition' in window) {
    let recognition = new webkitSpeechRecognition();

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

    recognition.onresult = function(event) {
        let interim_transcript = '';
        for (let i = event.resultIndex; i < event.results.length; ++i) {
            if (event.results[i].isFinal) {
                final_transcript += event.results[i][0].transcript;
            } else {
                interim_transcript += event.results[i][0].transcript;
            }
        }
        final_transcript = capitalize(final_transcript);
        final_span.innerHTML = linebreak(final_transcript);
        interim_span.innerHTML = linebreak(interim_transcript);
    };
}

let two_line = /\n\n/g;
let one_line = /\n/g;

function linebreak(s) {
    return s.replace(two_line, '<p></p>').replace(one_line, '<br>');
}

function capitalize(s) {
    return s.replace(s.substr(0, 1), function(m) {
        return m.toUpperCase();
    });
}

function startDictation(event) {
    if (recognizing) {
        recognition.stop();
        return;
    }
    final_transcript = '';
    recognition.lang = 'en-US';
    recognition.start();
    final_span.innerHTML = '';
    interim_span.innerHTML = '';
}
