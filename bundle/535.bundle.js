"use strict";
(this["webpackChunk_remotion_example"] = this["webpackChunk_remotion_example"] || []).push([[535],{

/***/ 8535:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "OfflineAudioBufferExample": () => (/* binding */ OfflineAudioBufferExample),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var remotion__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4815);
/* harmony import */ var remotion__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(remotion__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6248);
/* harmony import */ var _remotion_media_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(2618);
/* harmony import */ var _remotion_media_utils__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_remotion_media_utils__WEBPACK_IMPORTED_MODULE_2__);




const C4_FREQUENCY = 261.63;
const sampleRate = 44100;
const OfflineAudioBufferExample = () => {
  const [handle] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(() => (0,remotion__WEBPACK_IMPORTED_MODULE_1__.delayRender)());
  const [audioBuffer, setAudioBuffer] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null);
  const { fps, durationInFrames } = (0,remotion__WEBPACK_IMPORTED_MODULE_1__.useVideoConfig)();
  const lengthInSeconds = durationInFrames / fps;
  const renderAudio = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(async () => {
    const offlineContext = new OfflineAudioContext({
      numberOfChannels: 2,
      length: sampleRate * lengthInSeconds,
      sampleRate
    });
    const oscillatorNode = offlineContext.createOscillator();
    const gainNode = offlineContext.createGain();
    oscillatorNode.connect(gainNode);
    gainNode.connect(offlineContext.destination);
    gainNode.gain.setValueAtTime(0.5, offlineContext.currentTime);
    oscillatorNode.type = "sine";
    oscillatorNode.frequency.value = C4_FREQUENCY;
    const { currentTime } = offlineContext;
    oscillatorNode.start(currentTime);
    oscillatorNode.stop(currentTime + lengthInSeconds);
    const buffer = await offlineContext.startRendering();
    setAudioBuffer((0,_remotion_media_utils__WEBPACK_IMPORTED_MODULE_2__.audioBufferToDataUrl)(buffer));
    (0,remotion__WEBPACK_IMPORTED_MODULE_1__.continueRender)(handle);
  }, [handle, lengthInSeconds]);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    renderAudio();
  }, [renderAudio]);
  return /* @__PURE__ */ React.createElement(remotion__WEBPACK_IMPORTED_MODULE_1__.AbsoluteFill, null, audioBuffer && /* @__PURE__ */ React.createElement(remotion__WEBPACK_IMPORTED_MODULE_1__.Audio, {
    src: audioBuffer,
    startFrom: 0,
    endAt: 100,
    volume: (f) => (0,remotion__WEBPACK_IMPORTED_MODULE_1__.interpolate)(f, [0, 50, 100], [0, 1, 0], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp"
    })
  }), /* @__PURE__ */ React.createElement(remotion__WEBPACK_IMPORTED_MODULE_1__.AbsoluteFill, {
    style: {
      fontFamily: "Helvetica, Arial",
      fontSize: 50,
      color: "white",
      justifyContent: "center",
      textAlign: "center"
    }
  }, "Render sound from offline audio buffer"));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (OfflineAudioBufferExample);


/***/ })

}]);
//# sourceMappingURL=535.bundle.js.map