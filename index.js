"use strict";

window.addEventListener("load", function() {
    window.AudioContext = window.AudioContext||window.webkitAudioContext;
    const context = new AudioContext();
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
    const howlerPCM = new Howl({
        src: ["./pcm/se_maoudamashii_onepoint16.wav"]
    });
    const howlerADPCM = new Howl({
        src: ["./adpcm/se_maoudamashii_onepoint16.wav"],
        onloaderror: function(e) {
            console.error(e);
        }
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
    const playPCMHowler = this.document.getElementById("playPCMHowler");
    playPCMHowler.addEventListener("click", function() {
        howlerPCM.play();
    });
    const playADPCMHowler = this.document.getElementById("playADPCMHowler");
    playADPCMHowler.addEventListener("click", function() {
        howlerADPCM.play();
    });

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