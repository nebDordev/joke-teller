const button = document.getElementById('button');
const audioElement = document.getElementById('audio');

// function show_image(src, width, height, alt) {
//     var img = document.createElement("img");
//     img.src = src;
//     img.width = width;
//     img.height = height;
//     img.alt = alt;

//     // This next line will just add it to the <body> tag
//     document.body.appendChild(img);
// }

// Disable/enable Button
function toggleButton() {
    button.disabled = !button.disabled;
}

// Smiley
function myClick() {
    document.getElementById("new_img").style.display = "block";
}

function toggleSmiley() {
    document.getElementById("new_img").style.display = "none";
}

// Passing joke to voiceRSS API
function tellMe(joke) {
    console.log('tell me: ', joke);
    VoiceRSS.speech({
        key: 'cc4408b6329a4cc6938f9462ded5f4f3',
        src: joke,
        hl: 'en-us',
        v: 'Linda',
        r: 0,
        c: 'mp3',
        f: '44khz_16bit_stereo',
        ssml: false
    });
}

async function getJokes() {
    let joke = '';
    const apiUrl = 'https://sv443.net/jokeapi/v2/joke/Any?blacklistFlags=nsfw,religious,political,racist,sexist';
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        if (data.setup) {
            joke = `${data.setup} ... ${data.delivery}`;
        } else {
            joke = data.joke;
        }
        // text to speech
        tellMe(joke);
        // disable button
        toggleButton();
    } catch (error) {
        console.log('error');
    }
}

// Instead of just getJokes();
button.addEventListener('click', getJokes);
// Waits until the joke is done
audioElement.addEventListener('ended', toggleButton);
audioElement.addEventListener('ended', toggleSmiley);