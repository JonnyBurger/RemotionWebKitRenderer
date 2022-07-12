"use strict";
(this["webpackChunk_remotion_example"] = this["webpackChunk_remotion_example"] || []).push([[915],{

/***/ 9915:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var remotion__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4815);
/* harmony import */ var remotion__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(remotion__WEBPACK_IMPORTED_MODULE_0__);


const AudioTesting = () => {
  return /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement(remotion__WEBPACK_IMPORTED_MODULE_0__.Sequence, {
    from: 100,
    durationInFrames: 100
  }, /* @__PURE__ */ React.createElement(remotion__WEBPACK_IMPORTED_MODULE_0__.Audio, {
    startFrom: 100,
    endAt: 200,
    src: (0,remotion__WEBPACK_IMPORTED_MODULE_0__.staticFile)("music.mp3"),
    volume: (f) => (0,remotion__WEBPACK_IMPORTED_MODULE_0__.interpolate)(f, [0, 50, 100], [0, 1, 0], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp"
    })
  })));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (AudioTesting);


/***/ })

}]);
//# sourceMappingURL=915.bundle.js.map