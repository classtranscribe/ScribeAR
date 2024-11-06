import React, { useEffect, useRef, useState, } from 'react'
import { RootState } from '../../../store';
import { DisplayStatus, ControlStatus } from '../../../react-redux&middleware/redux/typesImports';
import { useSelector } from 'react-redux';

import './canvasFonts.css';

let audioContext; // reusable; only initialize it once
let analyser; // an AnylyserNode : provide real-time frequency and time-domain analysis information
let dataArray;
let source;
let rafId;
let canvas;
let canvasCtx;

let color;
let showLabels : boolean;

const font = 'Orbitron';

export const LoungeVisual = (props) => {
    const [sLabel, setSLabel] = useState(false);
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    const theme = useSelector((state: RootState) => {
        return state.DisplayReducer as DisplayStatus;
    });

    // const control = useSelector((state: RootState) => {
    //     return state.ControlReducer as ControlStatus;
    // });

    color = theme.textColor;
    // showLabels = control.showLabels;
    showLabels = sLabel;

    const setSource = async () => {
        const newMediaStream = await navigator.mediaDevices.getUserMedia({
            audio: true,
            video: false
        })
    
        await (source = audioContext.createMediaStreamSource(newMediaStream))
        await (source.connect(analyser))
    };

    /**
     * @description
     * Render audio author and title.
     */
    // const renderText = () => {
    //     let cx = canvas.width / 2;
    //     let cy = canvas.height / 2;
    //     let correction = 10;
    
    //     let title = ""
    //     let author = "Unamed"
    //     let font = ['12px', 'Helvetica']
    
    //     canvasCtx.fillStyle = color;
    
    //     canvasCtx.textBaseline = 'top';
    //     canvasCtx.fillText(author, cx + correction, cy);
    //     canvasCtx.font = parseInt(font[0], 10) + 8 + 'px ' + font[1];
    //     canvasCtx.textBaseline = 'bottom';
    //     canvasCtx.fillText(title, cx + correction, cy);
    //     canvasCtx.font = font.join(' ');
    // };
    
    /**
     * @description
     * Render audio time.
     */
    // const renderTime = () => {
    //     // let time = this.minutes + ':' + this.seconds;
    //     // canvasCtx.fillText(time, canvas.width / 2 + 10, canvas.height / 2 + 40);
    // };
    
    /**
     * @description
     * Render frame by style type.
     *
     * @return {Function}
     */
    const renderByStyleType = () => {

        // return this[TYPE[this.style]]();

        renderLounge();
    };
    
    /**
     * @description
     * Render lounge style type.
     */
    const renderLounge = () => {
        // let barWidth = 2;
        // let barHeight = 2;
        // let barSpacing = 4;
    
        let cx = canvas.width / 2;
        let cy = canvas.height / 2;
        let radius = Math.min(canvas.width, canvas.height) / 2.5; // determined by the smaller of width or height
        // let maxBarNum = Math.floor((2 * Math.PI * radius) / (barWidth + barSpacing)); // control max (total possible) number of bars: circumference / (width + spacing)
        // let barNum = maxBarNum * 0.75; // controls how much frequency bars are shown
        // const freqArrIdxJump = (dataArray.length / maxBarNum); // gap of index (of frequency array) for each bar 
        // let eachDataFreq = audioContext.sampleRate / 2 / dataArray.length; // Nyquist Rate Theroem: 2x the range of sampling rate to capture the range.
        // // console.log('sampleRate: ', audioContext.sampleRate, '; dataArray.length: ', dataArray.length, '; eachDataFreq: ', eachDataFreq);
        // // console.log([barNum, barNum * eachDataFreq * freqArrIdxJump], [maxBarNum, maxBarNum * eachDataFreq * freqArrIdxJump], freqArrIdxJump, audioContext.sampleRate / 2);


        // changing frequency range: 0Hz ~ 15kHz; fixed bar barSpacing;
        // fixed barNum, freqArrIdxJump...
        const barNum = 128;
        const maxBarNum = 128 / 0.75;

        // const barSpacing = (2 * Math.PI * radius) - barWidth;
        let barHeight = 2;
        let barSpacing = 4;
        const barWidth = (1 / maxBarNum) * (2 * Math.PI * radius) / 2;
        const freqArrIdxJump = 2;
        const eachDataFreq = audioContext.sampleRate / 2 / dataArray.length; // Nyquist Rate Theroem: 2x the range of sampling rate to capture the range.
        // console.log('sampleRate: ', audioContext.sampleRate, '; dataArray.length: ', dataArray.length, '; eachDataFreq: ', eachDataFreq);
        // console.log([barNum, barNum * eachDataFreq * freqArrIdxJump], [maxBarNum, maxBarNum * eachDataFreq * freqArrIdxJump], freqArrIdxJump, audioContext.sampleRate / 2);
        



        const hypotenuseLength = (canvas.width / 4);

        canvasCtx.font = `${canvas.width / 10}px ${font}`;
        canvasCtx.textAlign = 'center';
        canvasCtx.textBaseline = 'middle';
        if (showLabels) {
            canvasCtx.fillText('kHz', cx, cy + hypotenuseLength)
            // canvasCtx.fillText(`${fonts[fontsIdx]}`, cx, cy + 1.5 * hypotenuseLength)
        }

        canvasCtx.fillStyle = color;
        for (let i = 0; i <= barNum; i++) {
            let amplitude = dataArray[Math.floor(i * freqArrIdxJump)]; // Db data for each frequency
            let alfa = (2 * Math.PI * i) / maxBarNum; // (2 pi i) / (2 pi r / width) => (i * width) / r
            let beta = (3 * 45 - barWidth) * Math.PI / 180; // pi * 0.75
            // let beta = Math.PI * 0.75;
            let x = 0;
            // let y = 1 - radius - (amplitude / 6 - barHeight); // flipped
            // let y = (amplitude / 6 - barHeight) - radius; // inverted
            let y = 1 - radius - (amplitude / 6 - barHeight);
            let w = barWidth;
            let h = amplitude / 3 + barHeight;
            // Possible Relationship: 2 * 6 = 12

    
            canvasCtx.save();
            canvasCtx.translate(cx, cy); // doesn't need to + barSpacing

            // canvasCtx.fillRect(-hypotenuseLength, 0, 2 * hypotenuseLength, 1);
            // canvasCtx.fillRect(0, -hypotenuseLength, 1, 2 * hypotenuseLength);

            canvasCtx.save(); // right before rotation
            const rotate = (alfa - beta) * 1;
            canvasCtx.rotate(rotate); // controls starting bar (how much to rotate)
            canvasCtx.fillRect(x, y, w, h);
            // console.log(showLabels);

            if (showLabels) {
                // canvasCtx.fillRect(0, 0, w, hypotenuseLength);
                if (i % 16 == 0) {
                    canvasCtx.fillRect(0, -1.2 * hypotenuseLength, w, -0.2 * hypotenuseLength); // 1.3 comes from (0.25 + (0.4 - 0.25)/2) / 0.25 = (0.25 + 0.075) / 0.25 = 0.325 / 0.25 = 1.3
                    // canvasCtx.fillRect(0, -radius, w, -0.1 * hypotenuseLength); // 1.3 comes from (0.25 + (0.4 - 0.25)/2) / 0.25 = (0.25 + 0.075) / 0.25 = 0.325 / 0.25 = 1.3
                    // canvasCtx.fillRect(0, 0, w, -1 * hypotenuseLength);

                    canvasCtx.restore(); // rotate back so that text can be displayed normally

                    const roundFreq = Math.round(eachDataFreq * Math.floor(i  * freqArrIdxJump) / 100) * 100; // round to nearest 100
                    const freqText = `${roundFreq >= 1000 ? `${roundFreq/1000}` : roundFreq}`;
                    const canvasRotateAngle = rotate;
                    let angle = -1 * canvasRotateAngle;
                    const textX = Math.sin(angle) * hypotenuseLength;
                    const textY = Math.cos(angle) * hypotenuseLength;

                    canvasCtx.font = `${canvas.width / 18}px ${font}`;
                    // Maybe: left side should be align left; vice versa
                    canvasCtx.fillText(freqText, -textX, -textY); // the x and y might should be determined by cavnas width and height
                } else {
                    canvasCtx.restore();
                }
            } else {
                canvasCtx.restore();
            }
            canvasCtx.restore();
        }
    };

    useEffect(() => {
        // audioContext = new (window.AudioContext || window.webkitAudioContext)();
        audioContext = new (window.AudioContext || window.webkitAudioContext)({
            latencyHint: 'interactive',
            // sampleRate: 51200 // change to 51200 so that eachDataFreq will be 50
            // sampleRate: 38400 // 19200 max
            // sampleRate: 40960 // 20480 max
            // sampleRate: 32000 // 16000 max
        });
        let analyserOptions : AnalyserOptions = { // visual largely affected by fftSize and minDecibels. Roughly direct relationship 
            "fftSize": 512, // fftSize / 2 is the length of the dataArray. Less: Data are Crunched: Large: the Opposite
            "maxDecibels": -30,
            "minDecibels": -70, // lowest volume to pick up
            "smoothingTimeConstant": 0.8, // lower: less smooth
        };
        // analyser = audioContext.createAnalyser();
        analyser = new AnalyserNode(audioContext, analyserOptions); // for AnalyserOptions

        dataArray = new Uint8Array(analyser.frequencyBinCount); // get data for visualization. frequencyBinCount = fftSize / 2

        // connect the source to be analysed
        setSource();
        rafId = requestAnimationFrame(draw); // draw is called before each repaint; // rafId : unique id for the callback funciton draw()

        // setup canvas
        canvas = canvasRef.current;
        if (!canvas) {
            return;
        }
        canvasCtx = canvas.getContext('2d')

        return () => { // clean up funciton
            cancelAnimationFrame(rafId);
            analyser.disconnect();
            source.disconnect();
        }
    }, [])

    const draw = () => { // the draw function
        rafId = requestAnimationFrame(draw);

        // get data into dataArray
        analyser.getByteFrequencyData(dataArray);
        // if (flag == true) {
        //     dispatch(volume)
        //     flag false
        //     restart timer
        // }

        canvasCtx.clearRect(0, 0, canvas.width, canvas.height);
        // renderTime();
        // renderText();
        renderByStyleType();
    }
    
    return <canvas onClick={() => {setSLabel(!sLabel);}} width={props.visualWidth} height={props.visualHeight} ref={canvasRef} />
    // return <canvas onMouseEnter={() => {fontsIdx = (fontsIdx + 1) % fonts.length}} width={props.visualWidth} height={props.visualHeight} ref={canvasRef} />
}
