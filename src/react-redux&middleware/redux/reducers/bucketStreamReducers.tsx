import { 
    AudioEventBucket, 
    HTML5STTEventBucket, 
    AzureSTTEventBucket, 
    // UserActionEventBucket, 
    AudioStream, 
    HTML5STTStream, 
    AzureSTTStream, 
    MainStream, 
    MainStreamMap, 
} from "../types/bucketStreamTypes";

// ============================================== \\
/**
 * @summary Return a default MainStream that has all streams initialized to an empty array.
 * @returns {mainStream, curTime}
 */
const defaultMainStream = (curTime? : number) => {
    if (curTime == null) { // if not defined; get time
        curTime = Date.now();
    }

    const audioBucket : AudioEventBucket = {
        startTime: curTime,
        endTime: 0,
        volume: -1,
        // eventType: 'Audio', // "Audio" | "AzureSTT" | "HTML5STT" | "UserAction",
        typeOfData: '' // frequency or waveform
    }
    const html5Bucket : HTML5STTEventBucket = {
        startTime: curTime,
        endTime: 0,
        // eventType: 'Audio', // "Audio" | "AzureSTT" | "HTML5STT" | "UserAction",
        finalTranscript: [],
        notFinalTranscript: [],
    }
    const azureBucket : AzureSTTEventBucket = {
        startTime: curTime,
        endTime: 0,
        // eventType: 'Audio', // "Audio" | "AzureSTT" | "HTML5STT" | "UserAction",
    }
    // const userActionBucket : UserActionEventBucket = {
    //     startTime: curTime,
    //     endTime: 0,
    //     // eventType: 'Audio', // "Audio" | "AzureSTT" | "HTML5STT" | "UserAction",
    //     // targetElem: ,
    //     // action: ,
    // }

    // const initialAudioStream : AudioStream = Array<AudioEventBucket>();
    // const initialHTML5STTStream : HTML5STTStream = Array<HTML5STTEventBucket>();
    // const initialAzureSTTStream : AzureSTTStream = Array<AzureSTTEventBucket>();
    // const initialUserActionStream : UserActionStream = Array<UserActionEventBucket>();
    const audioStream : AudioStream = [audioBucket];
    const html5STTStream : HTML5STTStream = [html5Bucket];
    const azureSTTStream : AzureSTTStream = [azureBucket];
    //const userActionStream : UserActionStream = [userActionBucket];

    const mainStream : MainStream = {
        startTime: curTime,
        AudioStream: audioStream,
        HTML5STTStream: html5STTStream,
        AzureSTTStream: azureSTTStream,
        // UserActionStream: initialUserActionStream,
    }

    return {mainStream, curTime};
}
const defaultMainStreamMap = (timeInterval = 100000) => {
    const mainStreamTime = defaultMainStream();

    const mainStreamMap : MainStreamMap = {
        transcripts: [],
        curMSST: mainStreamTime.curTime,
        timeInterval: timeInterval, // 1000 seconds
        map: new Map([[mainStreamTime.curTime, mainStreamTime.mainStream]]),
    }

    return mainStreamMap;
}
// ============================================== \\

// /* Save to sessionStorage so that it is cleared when refreshed */
// const saveSessionly = (varName: string, value: any) => {
//     sessionStorage.setItem(varName, JSON.stringify(value));
//     // defaultMainStream();
// }

// const getSessionState = (varName: string) => {
//     let checkNull = sessionStorage.getItem(varName)
//     if (checkNull) {
//         return JSON.parse(checkNull);
//     } else {
//         if (varName === "streams") {
//             const mainStreamMap = defaultMainStreamMap();
//             saveSessionly("streams", mainStreamMap);
//             return mainStreamMap;
//         }
//     }
// };

// export const BucketStreamReducer = (state = getSessionState("streams"), action) => {
export const BucketStreamReducer = (state = defaultMainStreamMap(), action : {type: string; payload: any; newMainStream: boolean;}) => {
    let copyState : MainStreamMap = Object.assign({}, state);
    
    switch (action.type) {
        case 'APPEND_AUDIOSTREAM':
            // make a AudioEventBucket; append it to state.AudioStream
            let curAudioStream : AudioStream = copyState.map.get(state.curMSST)!.AudioStream!;

            if (curAudioStream.length === 0) throw new Error("AudioStream length 0!");
            curAudioStream[curAudioStream.length - 1]!.endTime = action.payload.curTime;
            curAudioStream[curAudioStream.length - 1]!.volume = action.payload.volume;
            curAudioStream[curAudioStream.length - 1]!.typeOfData = action.payload.typeOfData;
            
            if (action.newMainStream) { // add a new MainStream
                const time = action.payload.curTime;
                copyState.curMSST = time;
                copyState.map.set(time, defaultMainStream(time).mainStream);
                return copyState;
            } else if (!action.newMainStream) { // just add a bucket at the end
                // return [{
                //     ...state,
                // }]
                curAudioStream.push({
                    startTime: action.payload.curTime,
                    endTime: 0,
                    volume: -1,
                    typeOfData: '',
                });

                return copyState;
            }
            return state;
        case 'APPEND_HTML5_STT_STREAM':
            // console.log(53, "type: ", typeof action.payload, "; value: ", action.payload)
            let curHTML5Stream : HTML5STTStream = copyState.map.get(state.curMSST)!.HTML5STTStream!;

            // we first complete the last bucket in the current stream
            if (curHTML5Stream.length === 0) { throw new Error("HTML5Stream length 0!"); };
            curHTML5Stream[curHTML5Stream.length - 1]!.endTime = action.payload.curTime;
            curHTML5Stream[curHTML5Stream.length - 1]!.finalTranscript = action.payload.fArr;
            curHTML5Stream[curHTML5Stream.length - 1]!.notFinalTranscript = action.payload.nfArr;

            // check if need to add a new MainStream
            if (action.newMainStream) { // add a new MainStream
                const time = action.payload.curTime;
                copyState.curMSST = time;
                copyState.map.set(time, defaultMainStream(time).mainStream);
                return copyState;
            } else if (!action.newMainStream) { // just add a bucket at the end
                // return [{ ...state, }];
                curHTML5Stream.push({
                    startTime: action.payload.curTime,
                    endTime: 0,
                    finalTranscript: [],
                    notFinalTranscript: [],
                });

                return copyState;
            }
            return state;
        case 'APPEND_AZURE_STT_STREAM':
            // make a AzureTTEventBucket; append it to state.AzureSTTStream

            return
        case 'APPEND_USER_ACTION_STREAM':
            // make a UserActionStream; append it to state.UserActionStream

            return
        case 'RESET_STREAMS':
            return defaultMainStreamMap();
        default:
            return state;
    }
}