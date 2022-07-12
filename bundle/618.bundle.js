"use strict";
(this["webpackChunk_remotion_example"] = this["webpackChunk_remotion_example"] || []).push([[618],{

/***/ 8905:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.audioBufferToWav = void 0;
function audioBufferToWav(buffer, opt) {
  const numChannels = buffer.numberOfChannels;
  const { sampleRate } = buffer;
  const format = opt.float32 ? 3 : 1;
  const bitDepth = format === 3 ? 32 : 16;
  let result;
  if (numChannels === 2) {
    result = interleave(buffer.getChannelData(0), buffer.getChannelData(1));
  } else {
    result = buffer.getChannelData(0);
  }
  return encodeWAV({
    samples: result,
    format,
    sampleRate,
    numChannels,
    bitDepth
  });
}
exports.audioBufferToWav = audioBufferToWav;
function encodeWAV({ samples, format, sampleRate, numChannels, bitDepth }) {
  const bytesPerSample = bitDepth / 8;
  const blockAlign = numChannels * bytesPerSample;
  const buffer = new ArrayBuffer(44 + samples.length * bytesPerSample);
  const view = new DataView(buffer);
  writeString(view, 0, "RIFF");
  view.setUint32(4, 36 + samples.length * bytesPerSample, true);
  writeString(view, 8, "WAVE");
  writeString(view, 12, "fmt ");
  view.setUint32(16, 16, true);
  view.setUint16(20, format, true);
  view.setUint16(22, numChannels, true);
  view.setUint32(24, sampleRate, true);
  view.setUint32(28, sampleRate * blockAlign, true);
  view.setUint16(32, blockAlign, true);
  view.setUint16(34, bitDepth, true);
  writeString(view, 36, "data");
  view.setUint32(40, samples.length * bytesPerSample, true);
  if (format === 1) {
    floatTo16BitPCM(view, 44, samples);
  } else {
    writeFloat32(view, 44, samples);
  }
  return buffer;
}
function interleave(inputL, inputR) {
  const length = inputL.length + inputR.length;
  const result = new Float32Array(length);
  let index = 0;
  let inputIndex = 0;
  while (index < length) {
    result[index++] = inputL[inputIndex];
    result[index++] = inputR[inputIndex];
    inputIndex++;
  }
  return result;
}
function writeFloat32(output, offset, input) {
  for (let i = 0; i < input.length; i++, offset += 4) {
    output.setFloat32(offset, input[i], true);
  }
}
function floatTo16BitPCM(output, offset, input) {
  for (let i = 0; i < input.length; i++, offset += 2) {
    const s = Math.max(-1, Math.min(1, input[i]));
    output.setInt16(offset, s < 0 ? s * 32768 : s * 32767, true);
  }
}
function writeString(view, offset, string) {
  for (let i = 0; i < string.length; i++) {
    view.setUint8(offset + i, string.charCodeAt(i));
  }
}


/***/ }),

/***/ 5503:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.audioBufferToDataUrl = void 0;
const audio_buffer_to_wav_1 = __webpack_require__(8905);
const audioBufferToDataUrl = (buffer) => {
  const wavAsArrayBuffer = (0, audio_buffer_to_wav_1.audioBufferToWav)(buffer, {
    float32: true
  });
  let binary = "";
  const bytes = new Uint8Array(wavAsArrayBuffer);
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return "data:audio/wav;base64," + window.btoa(binary);
};
exports.audioBufferToDataUrl = audioBufferToDataUrl;


/***/ }),

/***/ 799:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.complexMagnitude = exports.complexMultiply = exports.complexSubtract = exports.complexAdd = void 0;
const complexAdd = function(a, b) {
  return [a[0] + b[0], a[1] + b[1]];
};
exports.complexAdd = complexAdd;
const complexSubtract = function(a, b) {
  return [a[0] - b[0], a[1] - b[1]];
};
exports.complexSubtract = complexSubtract;
const complexMultiply = function(a, b) {
  return [a[0] * b[0] - a[1] * b[1], a[0] * b[1] + a[1] * b[0]];
};
exports.complexMultiply = complexMultiply;
const complexMagnitude = function(c) {
  return Math.sqrt(c[0] * c[0] + c[1] * c[1]);
};
exports.complexMagnitude = complexMagnitude;


/***/ }),

/***/ 5464:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.exponent = void 0;
const mapExponent = {};
const exponent = function(k, N) {
  const x = -2 * Math.PI * (k / N);
  mapExponent[N] = mapExponent[N] || {};
  mapExponent[N][k] = mapExponent[N][k] || [Math.cos(x), Math.sin(x)];
  return mapExponent[N][k];
};
exports.exponent = exponent;


/***/ }),

/***/ 9726:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.fft = void 0;
const complex_1 = __webpack_require__(799);
const exponent_1 = __webpack_require__(5464);
const fft = function(vector) {
  const X = [];
  const N = vector.length;
  if (N === 1) {
    if (Array.isArray(vector[0])) {
      return [[vector[0][0], vector[0][1]]];
    }
    return [[vector[0], 0]];
  }
  const X_evens = (0, exports.fft)(vector.filter((_, ix) => ix % 2 === 0));
  const X_odds = (0, exports.fft)(vector.filter((__, ix) => ix % 2 === 1));
  for (let k = 0; k < N / 2; k++) {
    const t = X_evens[k];
    const e = (0, complex_1.complexMultiply)((0, exponent_1.exponent)(k, N), X_odds[k]);
    X[k] = (0, complex_1.complexAdd)(t, e);
    X[k + N / 2] = (0, complex_1.complexSubtract)(t, e);
  }
  return X;
};
exports.fft = fft;


/***/ }),

/***/ 5864:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getVisualization = void 0;
const fft_1 = __webpack_require__(9726);
const mag_1 = __webpack_require__(5575);
const smoothing_1 = __webpack_require__(8726);
const to_int_16_1 = __webpack_require__(117);
const getVisualization = ({ sampleSize, data, sampleRate, frame, fps, maxInt }) => {
  const isPowerOfTwo = sampleSize > 0 && (sampleSize & sampleSize - 1) === 0;
  if (!isPowerOfTwo) {
    throw new TypeError(`The argument "bars" must be a power of two. For example: 64, 128. Got instead: ${sampleSize}`);
  }
  if (!fps) {
    throw new TypeError('The argument "fps" was not provided');
  }
  if (data.length < sampleSize) {
    throw new TypeError("Audio data is not big enough to provide " + sampleSize + " bars.");
  }
  const start = Math.floor(frame / fps * sampleRate);
  const actualStart = Math.max(0, start - sampleSize / 2);
  const ints = new Int16Array({
    length: sampleSize
  });
  ints.set(data.subarray(actualStart, actualStart + sampleSize).map((x) => (0, to_int_16_1.toInt16)(x)));
  const phasors = (0, fft_1.fft)(ints);
  const magnitudes = (0, mag_1.fftMag)(phasors).map((p) => p);
  return (0, smoothing_1.smoothen)(magnitudes).map((m) => m / (sampleSize / 2) / maxInt);
};
exports.getVisualization = getVisualization;


/***/ }),

/***/ 5575:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.fftMag = void 0;
const complex_1 = __webpack_require__(799);
const fftMag = function(fftBins) {
  const ret = fftBins.map((f) => (0, complex_1.complexMagnitude)(f));
  return ret.slice(0, ret.length / 2);
};
exports.fftMag = fftMag;


/***/ }),

/***/ 5542:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getMaxPossibleMagnitude = void 0;
const to_int_16_1 = __webpack_require__(117);
const getMax = (array) => {
  let max = 0;
  for (let i = 0; i < array.length; i++) {
    const val = array[i];
    if (val > max) {
      max = val;
    }
  }
  return max;
};
const cache = {};
const getMaxPossibleMagnitude = (metadata) => {
  if (cache[metadata.resultId]) {
    return cache[metadata.resultId];
  }
  const result = (0, to_int_16_1.toInt16)(getMax(metadata.channelWaveforms[0]));
  cache[metadata.resultId] = result;
  return result;
};
exports.getMaxPossibleMagnitude = getMaxPossibleMagnitude;


/***/ }),

/***/ 8726:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.smoothen = void 0;
const smoothingPasses = 3;
const smoothingPoints = 3;
const smoothen = function(array) {
  let lastArray = array;
  const newArr = [];
  for (let pass = 0; pass < smoothingPasses; pass++) {
    const sidePoints = Math.floor(smoothingPoints / 2);
    const cn = 1 / (2 * sidePoints + 1);
    for (let i = 0; i < sidePoints; i++) {
      newArr[i] = lastArray[i];
      newArr[lastArray.length - i - 1] = lastArray[lastArray.length - i - 1];
    }
    for (let i = sidePoints; i < lastArray.length - sidePoints; i++) {
      let sum = 0;
      for (let n = -sidePoints; n <= sidePoints; n++) {
        sum += cn * lastArray[i + n] + n;
      }
      newArr[i] = sum;
    }
    lastArray = newArr;
  }
  return newArr;
};
exports.smoothen = smoothen;


/***/ }),

/***/ 117:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.toInt16 = void 0;
const toInt16 = (x) => x > 0 ? x * 32767 : x * 32768;
exports.toInt16 = toInt16;


/***/ }),

/***/ 9670:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getAudioData = void 0;
const is_remote_asset_1 = __webpack_require__(3499);
const p_limit_1 = __webpack_require__(2269);
const metadataCache = {};
const limit = (0, p_limit_1.pLimit)(3);
const fetchWithCorsCatch = async (src) => {
  try {
    const response = await fetch(src);
    return response;
  } catch (err) {
    const error = err;
    if (error.message.includes("Failed to fetch") || error.message.includes("Load failed") || error.message.includes("NetworkError when attempting to fetch resource")) {
      throw new TypeError(`Failed to read from ${src}: ${error.message}. Does the resource support CORS?`);
    }
    throw err;
  }
};
const fn = async (src) => {
  if (metadataCache[src]) {
    return metadataCache[src];
  }
  if (typeof document === "undefined") {
    throw new Error("getAudioData() is only available in the browser.");
  }
  const audioContext = new AudioContext();
  const response = await fetchWithCorsCatch(src);
  const arrayBuffer = await response.arrayBuffer();
  const wave = await audioContext.decodeAudioData(arrayBuffer);
  const channelWaveforms = new Array(wave.numberOfChannels).fill(true).map((_, channel) => {
    return wave.getChannelData(channel);
  });
  const metadata = {
    channelWaveforms,
    sampleRate: audioContext.sampleRate,
    durationInSeconds: wave.duration,
    numberOfChannels: wave.numberOfChannels,
    resultId: String(Math.random()),
    isRemote: (0, is_remote_asset_1.isRemoteAsset)(src)
  };
  metadataCache[src] = metadata;
  return metadata;
};
const getAudioData = (src) => {
  return limit(fn, src);
};
exports.getAudioData = getAudioData;


/***/ }),

/***/ 6259:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getAudioDuration = exports.getAudioDurationInSeconds = void 0;
const p_limit_1 = __webpack_require__(2269);
const limit = (0, p_limit_1.pLimit)(3);
const metadataCache = {};
const fn = (src) => {
  if (metadataCache[src]) {
    return Promise.resolve(metadataCache[src]);
  }
  if (typeof document === "undefined") {
    throw new Error("getAudioDuration() is only available in the browser.");
  }
  const audio = document.createElement("audio");
  audio.src = src;
  return new Promise((resolve, reject) => {
    const onError = () => {
      reject(audio.error);
      cleanup();
    };
    const onLoadedMetadata = () => {
      metadataCache[src] = audio.duration;
      resolve(audio.duration);
      cleanup();
    };
    const cleanup = () => {
      audio.removeEventListener("loadedmetadata", onLoadedMetadata);
      audio.removeEventListener("error", onError);
      audio.remove();
    };
    audio.addEventListener("loadedmetadata", onLoadedMetadata, { once: true });
    audio.addEventListener("error", onError, { once: true });
  });
};
const getAudioDurationInSeconds = (src) => {
  return limit(fn, src);
};
exports.getAudioDurationInSeconds = getAudioDurationInSeconds;
const getAudioDuration = (src) => (0, exports.getAudioDurationInSeconds)(src);
exports.getAudioDuration = getAudioDuration;


/***/ }),

/***/ 7059:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getVideoMetadata = void 0;
const is_remote_asset_1 = __webpack_require__(3499);
const p_limit_1 = __webpack_require__(2269);
const cache = {};
const limit = (0, p_limit_1.pLimit)(3);
const fn = (src) => {
  if (cache[src]) {
    return Promise.resolve(cache[src]);
  }
  if (typeof document === "undefined") {
    throw new Error("getVideoMetadata() is only available in the browser.");
  }
  const video = document.createElement("video");
  video.src = src;
  return new Promise((resolve, reject) => {
    const onError = () => {
      reject(video.error);
      cleanup();
    };
    const onLoadedMetadata = () => {
      const pixels = video.videoHeight * video.videoWidth;
      if (pixels === 0) {
        reject(new Error("Unable to determine video metadata"));
        return;
      }
      const metadata = {
        durationInSeconds: video.duration,
        width: video.videoWidth,
        height: video.videoHeight,
        aspectRatio: video.videoWidth / video.videoHeight,
        isRemote: (0, is_remote_asset_1.isRemoteAsset)(src)
      };
      resolve(metadata);
      cache[src] = metadata;
      cleanup();
    };
    const cleanup = () => {
      video.removeEventListener("loadedmetadata", onLoadedMetadata);
      video.removeEventListener("error", onError);
      video.remove();
    };
    video.addEventListener("loadedmetadata", onLoadedMetadata, { once: true });
    video.addEventListener("error", onError, { once: true });
  });
};
const getVideoMetadata = (src) => {
  return limit(fn, src);
};
exports.getVideoMetadata = getVideoMetadata;


/***/ }),

/***/ 2191:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getWaveformSamples = void 0;
const filterData = (audioBuffer, samples) => {
  const blockSize = Math.floor(audioBuffer.length / samples);
  if (blockSize === 0) {
    return [];
  }
  const filteredData = [];
  for (let i = 0; i < samples; i++) {
    const blockStart = blockSize * i;
    let sum = 0;
    for (let j = 0; j < blockSize; j++) {
      sum += Math.abs(audioBuffer[blockStart + j]);
    }
    filteredData.push(sum / blockSize);
  }
  return filteredData;
};
const normalizeData = (filteredData) => {
  const multiplier = Math.max(...filteredData) ** -1;
  return filteredData.map((n) => n * multiplier);
};
const getWaveformSamples = (waveform, sampleAmount) => {
  return normalizeData(filterData(waveform, sampleAmount));
};
exports.getWaveformSamples = getWaveformSamples;


/***/ }),

/***/ 8347:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getWaveformPortion = void 0;
const get_wave_form_samples_1 = __webpack_require__(2191);
const getWaveformPortion = ({ audioData, startTimeInSeconds, durationInSeconds, numberOfSamples }) => {
  const startSample = Math.floor(startTimeInSeconds / audioData.durationInSeconds * audioData.channelWaveforms[0].length);
  const endSample = Math.floor((startTimeInSeconds + durationInSeconds) / audioData.durationInSeconds * audioData.channelWaveforms[0].length);
  return (0, get_wave_form_samples_1.getWaveformSamples)(audioData.channelWaveforms[0].slice(startSample, endSample), numberOfSamples).map((w, i) => {
    return {
      index: i,
      amplitude: w
    };
  });
};
exports.getWaveformPortion = getWaveformPortion;


/***/ }),

/***/ 2618:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = this && this.__createBinding || (Object.create ? function(o, m, k, k2) {
  if (k2 === void 0)
    k2 = k;
  var desc = Object.getOwnPropertyDescriptor(m, k);
  if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
    desc = { enumerable: true, get: function() {
      return m[k];
    } };
  }
  Object.defineProperty(o, k2, desc);
} : function(o, m, k, k2) {
  if (k2 === void 0)
    k2 = k;
  o[k2] = m[k];
});
var __exportStar = this && this.__exportStar || function(m, exports2) {
  for (var p in m)
    if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports2, p))
      __createBinding(exports2, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.visualizeAudio = exports.useAudioData = exports.getWaveformPortion = exports.getVideoMetadata = exports.getAudioDurationInSeconds = exports.getAudioDuration = exports.getAudioData = exports.audioBufferToDataUrl = void 0;
var audio_url_helpers_1 = __webpack_require__(5503);
Object.defineProperty(exports, "audioBufferToDataUrl", ({ enumerable: true, get: function() {
  return audio_url_helpers_1.audioBufferToDataUrl;
} }));
var get_audio_data_1 = __webpack_require__(9670);
Object.defineProperty(exports, "getAudioData", ({ enumerable: true, get: function() {
  return get_audio_data_1.getAudioData;
} }));
var get_audio_duration_in_seconds_1 = __webpack_require__(6259);
Object.defineProperty(exports, "getAudioDuration", ({ enumerable: true, get: function() {
  return get_audio_duration_in_seconds_1.getAudioDuration;
} }));
Object.defineProperty(exports, "getAudioDurationInSeconds", ({ enumerable: true, get: function() {
  return get_audio_duration_in_seconds_1.getAudioDurationInSeconds;
} }));
var get_video_metadata_1 = __webpack_require__(7059);
Object.defineProperty(exports, "getVideoMetadata", ({ enumerable: true, get: function() {
  return get_video_metadata_1.getVideoMetadata;
} }));
var get_waveform_portion_1 = __webpack_require__(8347);
Object.defineProperty(exports, "getWaveformPortion", ({ enumerable: true, get: function() {
  return get_waveform_portion_1.getWaveformPortion;
} }));
__exportStar(__webpack_require__(6800), exports);
var use_audio_data_1 = __webpack_require__(5377);
Object.defineProperty(exports, "useAudioData", ({ enumerable: true, get: function() {
  return use_audio_data_1.useAudioData;
} }));
var visualize_audio_1 = __webpack_require__(9452);
Object.defineProperty(exports, "visualizeAudio", ({ enumerable: true, get: function() {
  return visualize_audio_1.visualizeAudio;
} }));


/***/ }),

/***/ 3499:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.isRemoteAsset = void 0;
const isRemoteAsset = (asset) => !asset.startsWith(window.location.origin) && !asset.startsWith("data");
exports.isRemoteAsset = isRemoteAsset;


/***/ }),

/***/ 2269:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.pLimit = void 0;
const pLimit = (concurrency) => {
  const queue = [];
  let activeCount = 0;
  const next = () => {
    var _a;
    activeCount--;
    if (queue.length > 0) {
      (_a = queue.shift()) === null || _a === void 0 ? void 0 : _a();
    }
  };
  const run = async (fn, resolve, ...args) => {
    activeCount++;
    const result = (async () => fn(...args))();
    resolve(result);
    try {
      await result;
    } catch (_a) {
    }
    next();
  };
  const enqueue = (fn, resolve, ...args) => {
    queue.push(() => run(fn, resolve, ...args));
    (async () => {
      var _a;
      await Promise.resolve();
      if (activeCount < concurrency && queue.length > 0) {
        (_a = queue.shift()) === null || _a === void 0 ? void 0 : _a();
      }
    })();
  };
  const generator = (fn, ...args) => new Promise((resolve) => {
    enqueue(fn, resolve, ...args);
  });
  Object.defineProperties(generator, {
    activeCount: {
      get: () => activeCount
    },
    pendingCount: {
      get: () => queue.length
    },
    clearQueue: {
      value: () => {
        queue.length = 0;
      }
    }
  });
  return generator;
};
exports.pLimit = pLimit;


/***/ }),

/***/ 6800:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),

/***/ 5377:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.useAudioData = void 0;
const react_1 = __webpack_require__(6248);
const remotion_1 = __webpack_require__(4815);
const get_audio_data_1 = __webpack_require__(9670);
const useAudioData = (src) => {
  if (!src) {
    throw new TypeError("useAudioData requires a 'src' parameter");
  }
  const mountState = (0, react_1.useRef)({ isMounted: true });
  (0, react_1.useEffect)(() => {
    const { current } = mountState;
    current.isMounted = true;
    return () => {
      current.isMounted = false;
    };
  }, []);
  const [metadata, setMetadata] = (0, react_1.useState)(null);
  const fetchMetadata = (0, react_1.useCallback)(async () => {
    const handle = (0, remotion_1.delayRender)(`Waiting for audio metadata with src="${src}" to be loaded`);
    const data = await (0, get_audio_data_1.getAudioData)(src);
    if (mountState.current.isMounted) {
      setMetadata(data);
    }
    (0, remotion_1.continueRender)(handle);
  }, [src]);
  (0, react_1.useEffect)(() => {
    fetchMetadata();
  }, [fetchMetadata]);
  return metadata;
};
exports.useAudioData = useAudioData;


/***/ }),

/***/ 9452:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
var __objRest = (source, exclude) => {
  var target = {};
  for (var prop in source)
    if (__hasOwnProp.call(source, prop) && exclude.indexOf(prop) < 0)
      target[prop] = source[prop];
  if (source != null && __getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(source)) {
      if (exclude.indexOf(prop) < 0 && __propIsEnum.call(source, prop))
        target[prop] = source[prop];
    }
  return target;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.visualizeAudio = void 0;
const get_visualization_1 = __webpack_require__(5864);
const max_value_cached_1 = __webpack_require__(5542);
const cache = {};
const visualizeAudioFrame = ({ audioData: metadata, frame, fps, numberOfSamples }) => {
  const cacheKey = metadata.resultId + frame + fps + numberOfSamples;
  if (cache[cacheKey]) {
    return cache[cacheKey];
  }
  const maxInt = (0, max_value_cached_1.getMaxPossibleMagnitude)(metadata);
  return (0, get_visualization_1.getVisualization)({
    sampleSize: numberOfSamples * 2,
    data: metadata.channelWaveforms[0],
    frame,
    fps,
    sampleRate: metadata.sampleRate,
    maxInt
  });
};
const visualizeAudio = (_a) => {
  var _b = _a, { smoothing = true } = _b, parameters = __objRest(_b, ["smoothing"]);
  if (!smoothing) {
    return visualizeAudioFrame(parameters);
  }
  const toSmooth = [
    parameters.frame - 1,
    parameters.frame,
    parameters.frame + 1
  ];
  const all = toSmooth.map((s) => {
    return visualizeAudioFrame(__spreadProps(__spreadValues({}, parameters), { frame: s }));
  });
  return new Array(parameters.numberOfSamples).fill(true).map((_x, i) => {
    return new Array(toSmooth.length).fill(true).map((_, j) => {
      return all[j][i];
    }).reduce((a, b) => a + b, 0) / toSmooth.length;
  });
};
exports.visualizeAudio = visualizeAudio;


/***/ })

}]);
//# sourceMappingURL=618.bundle.js.map