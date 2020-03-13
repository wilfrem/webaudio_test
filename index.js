"use strict";

window.addEventListener("load", function() {
    window.AudioContext = window.AudioContext||window.webkitAudioContext;
    context = new AudioContext();
    let sourcePCM = null;
    let sourceADPCM = null;
    loadBuffer("./pcm/se_maoudamashii_onepoint16.wav")
        .then(function(buffer) {
            sourcePCM = createBufferSource(buffer);
        });
    loadBuffer("./adpcm/se_maoudamashii_onepoint16.wav")
        .then(function(buffer) {
            sourceADPCM = createBufferSource(buffer);
        });
    const playPCM = this.document.getElementById("playPCM");
    playPCM.addEventListener("click", function() {
        if (sourcePCM) {
            sourcePCM.start(0);
        }
    })
    const playADPCM = this.document.getElementById("playADPCM");
    playADPCM.addEventListener("click", function() {
        if (sourceADPCM) {
            sourceADPCM.start(0);
        }
    })

    function loadBuffer(url) {
        return new Promise(function(resolve, reject) {

            var request = new XMLHttpRequest();
            request.open('GET', url, true);
            request.responseType = 'arraybuffer';
        
            // Decode asynchronously
            request.onload = function() {
                context.decodeAudioData(request.response, function(buffer) {
                    resolve(buffer);
                }, reject);
            }
            request.send();
        });
    }
    function createBufferSource(buffer) {
        const source = context.createBufferSource();
        source.buffer = buffer;
        source.connect(context.destination);
        return source;
    }
})