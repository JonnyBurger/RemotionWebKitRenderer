"use strict";
(this["webpackChunk_remotion_example"] = this["webpackChunk_remotion_example"] || []).push([[270],{

/***/ 8270:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6248);
/* harmony import */ var remotion__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4815);
/* harmony import */ var remotion__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(remotion__WEBPACK_IMPORTED_MODULE_1__);


const LoopedVideo = () => {
  return /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement(remotion__WEBPACK_IMPORTED_MODULE_1__.Loop, {
    durationInFrames: 50,
    times: 3,
    name: "MyLoop"
  }, /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement(Child, null));
};
const Child = () => {
  const frame = (0,remotion__WEBPACK_IMPORTED_MODULE_1__.useCurrentFrame)();
  return /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    style: {
      backgroundColor: "white",
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      display: "flex",
      fontSize: 50
    }
  }, frame);
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (LoopedVideo);


/***/ })

}]);
//# sourceMappingURL=270.bundle.js.map