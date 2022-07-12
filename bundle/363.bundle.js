"use strict";
(this["webpackChunk_remotion_example"] = this["webpackChunk_remotion_example"] || []).push([[363,55],{

/***/ 2363:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _remotion_media_utils__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(2618);
/* harmony import */ var _remotion_media_utils__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_remotion_media_utils__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var polished__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(1579);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6248);
/* harmony import */ var remotion__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(4815);
/* harmony import */ var remotion__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(remotion__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(488);
/* harmony import */ var _DropDots_DropDots__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4055);
/* harmony import */ var _resources_sound1_mp3__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(5592);







const Background = (0,styled_components__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .ZP)(remotion__WEBPACK_IMPORTED_MODULE_4__.Img)`
	height: 100%;
	width: 120%;
	margin-left: -15%;
`;
const Blur = (0,styled_components__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .ZP)(remotion__WEBPACK_IMPORTED_MODULE_4__.AbsoluteFill)`
	backdrop-filter: blur(5px);
`;
const FullSize = (0,styled_components__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .ZP)(remotion__WEBPACK_IMPORTED_MODULE_4__.AbsoluteFill)`
	display: flex;
	justify-content: center;
	align-items: center;
`;
const Orb = styled_components__WEBPACK_IMPORTED_MODULE_3__/* ["default"].div */ .ZP.div`
	height: 400px;
	width: 400px;
	border-radius: 200px;
	display: flex;
	justify-content: center;
	align-items: center;
	font-size: 70px;
	font-family: --apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
		Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
	font-weight: bold;
	text-transform: lowercase;
	flex-direction: column;
`;
const Text = ({ color, transform, blur }) => {
  const frame = (0,remotion__WEBPACK_IMPORTED_MODULE_4__.useCurrentFrame)();
  const cool = (offset) => Math.sin((frame + offset) / 10);
  return /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement(remotion__WEBPACK_IMPORTED_MODULE_4__.AbsoluteFill, {
    style: {
      textAlign: "center",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      color,
      transform,
      filter: `blur(${blur}px)`
    }
  }, /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    style: {
      transform: `translateY(${cool(0) * 8}px)`
    }
  }, "Remotion"), /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    style: {
      transform: `translateY(${cool(5) * 8}px)`
    }
  }, "Nation"));
};
const AudioVisualization = () => {
  const frame = (0,remotion__WEBPACK_IMPORTED_MODULE_4__.useCurrentFrame)();
  const { width, height, fps } = (0,remotion__WEBPACK_IMPORTED_MODULE_4__.useVideoConfig)();
  const audioData = (0,_remotion_media_utils__WEBPACK_IMPORTED_MODULE_5__.useAudioData)(_resources_sound1_mp3__WEBPACK_IMPORTED_MODULE_2__);
  if (!audioData) {
    return null;
  }
  const visualization = (0,_remotion_media_utils__WEBPACK_IMPORTED_MODULE_5__.visualizeAudio)({
    fps,
    frame,
    audioData,
    numberOfSamples: 32
  });
  const scale = 1 + (0,remotion__WEBPACK_IMPORTED_MODULE_4__.interpolate)(visualization[1], [0.14, 1], [0, 0.6], {
    extrapolateLeft: "clamp"
  });
  const backgroundScale = 1 + (0,remotion__WEBPACK_IMPORTED_MODULE_4__.interpolate)(visualization[visualization.length - 1], [0, 0.7], [0, 1]);
  const circlesOut = visualization.slice(4);
  const rgbEffect = (0,remotion__WEBPACK_IMPORTED_MODULE_4__.interpolate)(visualization[Math.floor(visualization.length / 3)], [0, 0.5], [0, 30]);
  const dropStart = 1989;
  const dropEnd = 3310;
  const dayInterpolation = [dropStart - 5, dropStart, dropEnd, dropEnd + 5];
  const day = (0,remotion__WEBPACK_IMPORTED_MODULE_4__.interpolate)(frame, dayInterpolation, [1, 0, 0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp"
  });
  const night = (0,remotion__WEBPACK_IMPORTED_MODULE_4__.interpolate)(frame, dayInterpolation, [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp"
  });
  const orbRgb = Math.round((0,remotion__WEBPACK_IMPORTED_MODULE_4__.interpolate)(day, [0, 1], [30, 255]));
  const textRgb = Math.round((0,remotion__WEBPACK_IMPORTED_MODULE_4__.interpolate)(night, [0, 1], [0, 255]));
  const orbBackground = `rgb(${orbRgb}, ${orbRgb}, ${orbRgb})`;
  const textColor = `rgba(${textRgb}, ${textRgb}, ${textRgb}, 0.8)`;
  const onlySeconds = circlesOut.filter((_x, i) => i % 2 === 0);
  const circlesToUse = [...onlySeconds, ...onlySeconds];
  return /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    style: { flex: 1 }
  }, /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement(remotion__WEBPACK_IMPORTED_MODULE_4__.AbsoluteFill, null, /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement(remotion__WEBPACK_IMPORTED_MODULE_4__.AbsoluteFill, null, /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement(Background, {
    style: { transform: `scale(${backgroundScale})`, opacity: night },
    src: "https://fast-cdn.dynamicwallpaper.club/wallpapers%2Feq8ggec3apr%2Fthumbs%2F800%2F0.jpg?generation=1614257969409557&alt=media"
  })), /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement(remotion__WEBPACK_IMPORTED_MODULE_4__.AbsoluteFill, null, /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement(Background, {
    style: { transform: `scale(${backgroundScale})`, opacity: day },
    src: "https://fast-cdn.dynamicwallpaper.club/wallpapers%2Feq8ggec3apr%2Fthumbs%2F800%2F4.jpg?generation=1614257969529252&alt=media"
  }))), /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement(Blur, null), /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement(_DropDots_DropDots__WEBPACK_IMPORTED_MODULE_1__["default"], {
    opacity: night,
    volume: (0,remotion__WEBPACK_IMPORTED_MODULE_4__.interpolate)(visualization[1], [0, 0.24], [0, 1], {
      extrapolateLeft: "clamp"
    })
  }), /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement(remotion__WEBPACK_IMPORTED_MODULE_4__.Audio, {
    src: _resources_sound1_mp3__WEBPACK_IMPORTED_MODULE_2__
  }), /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement(FullSize, null, circlesToUse.map((v, i) => {
    const leftNeighbour = i === circlesToUse.length - 1 ? circlesToUse[0] : circlesToUse[i + 1];
    const rightNeighbour = i === 0 ? circlesToUse[circlesToUse.length - 1] : circlesToUse[i - 1];
    const a = i / circlesToUse.length * Math.PI * 2;
    const offset = (300 + Math.log((0,remotion__WEBPACK_IMPORTED_MODULE_4__.interpolate)((v + leftNeighbour + rightNeighbour) / 3, [0, 1], [0, 1], {
      extrapolateLeft: "clamp"
    }) * 600) * 6) * day;
    const x = Math.sin(a) * offset;
    const y = Math.cos(a) * offset;
    return /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
      style: {
        backgroundColor: "white",
        height: 20,
        width: 20,
        borderRadius: 10,
        position: "absolute",
        left: x + width / 2,
        top: y + height / 2
      }
    });
  }), /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement(Orb, {
    style: {
      transform: `scale(${scale})`,
      backgroundColor: orbBackground,
      boxShadow: `0 0 50px ${(0,polished__WEBPACK_IMPORTED_MODULE_6__/* .transparentize */ .DZ)(0.5, textColor)}`
    }
  }, /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement(Text, {
    blur: 2,
    color: "rgba(255, 0, 0, 0.3)",
    transform: `translateY(${-rgbEffect}px) translateX(${rgbEffect * 2}px)`
  }), /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement(Text, {
    blur: 2,
    color: "rgba(0, 255, 0, 0.3)",
    transform: `translateX(${rgbEffect * 3}px) translateY(${rgbEffect * 3}px)`
  }), /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement(Text, {
    blur: 2,
    color: "rgba(0, 0, 255, 0.3)",
    transform: `translateX(${-rgbEffect * 3}px)`
  }), /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement(Text, {
    blur: 0,
    color: textColor,
    transform: `translateY(${rgbEffect}px)`
  }))));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (AudioVisualization);


/***/ }),

/***/ 4055:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var polished__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1579);
/* harmony import */ var remotion__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4815);
/* harmony import */ var remotion__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(remotion__WEBPACK_IMPORTED_MODULE_0__);
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


const gradients = [
  ["#845ec2", "#ff5e78"],
  ["rgb(40, 150, 114)", "#e6dd3b"],
  ["#e48900", "#be0000"],
  ["#fff600", "#f48b2a"],
  ["#23689b", "#487e95"],
  ["#9d0391", "#120078"]
];
const DropDots = ({ opacity, volume }) => {
  const frame = (0,remotion__WEBPACK_IMPORTED_MODULE_0__.useCurrentFrame)();
  const cycle = 15;
  const iteration = Math.floor(frame / cycle);
  const { height, width } = (0,remotion__WEBPACK_IMPORTED_MODULE_0__.useVideoConfig)();
  const dots = new Array( false ? 0 : 45).fill(true).map((_x, i) => {
    const startX = (0,remotion__WEBPACK_IMPORTED_MODULE_0__.random)(`x-${i}-${iteration}`) * width;
    const startY = (0,remotion__WEBPACK_IMPORTED_MODULE_0__.random)(`y-${i}-${iteration}`) * height;
    const startRotation = (0,remotion__WEBPACK_IMPORTED_MODULE_0__.random)(`rotation-${i}-${iteration}`) * 360;
    return {
      startX,
      endX: startX + (0,remotion__WEBPACK_IMPORTED_MODULE_0__.interpolate)((0,remotion__WEBPACK_IMPORTED_MODULE_0__.random)(`x-end-${i}-${iteration}`), [0, 1], [-600, 600]),
      startY,
      endY: startY + (0,remotion__WEBPACK_IMPORTED_MODULE_0__.interpolate)((0,remotion__WEBPACK_IMPORTED_MODULE_0__.random)(`y-end-${i}-${iteration}`), [0, 1], [-600, 600]),
      startRotation,
      endRotation: startRotation + (0,remotion__WEBPACK_IMPORTED_MODULE_0__.interpolate)((0,remotion__WEBPACK_IMPORTED_MODULE_0__.random)(`rotatad-${i}`), [0, 1], [-180, 180]),
      size: (0,remotion__WEBPACK_IMPORTED_MODULE_0__.interpolate)((0,remotion__WEBPACK_IMPORTED_MODULE_0__.random)(`size-${i}-${iteration}`), [0, 0.9, 0.901, 1], [40, 40, 160, 160]),
      background: gradients[Math.floor((0,remotion__WEBPACK_IMPORTED_MODULE_0__.random)(`color-${i}-${iteration}`) * gradients.length)],
      opacity: (0,remotion__WEBPACK_IMPORTED_MODULE_0__.interpolate)((0,remotion__WEBPACK_IMPORTED_MODULE_0__.random)(`opacity-${i}-${iteration}`), [0, 1], [0.83, 0.95]),
      gradId: (0,remotion__WEBPACK_IMPORTED_MODULE_0__.random)(`gradient-${i}-${iteration}`),
      hasShine: (0,remotion__WEBPACK_IMPORTED_MODULE_0__.random)(`shine-${i}`) > 0.6,
      shineOpacity: (0,remotion__WEBPACK_IMPORTED_MODULE_0__.random)(`shine-opacity-${i}-${iteration}`) * 0.7
    };
  });
  const progress = (0,remotion__WEBPACK_IMPORTED_MODULE_0__.interpolate)(frame % cycle, [0, cycle], [0, 1]);
  return /* @__PURE__ */ React.createElement("div", {
    style: { width, height, opacity }
  }, dots.map((d) => {
    const left = (0,remotion__WEBPACK_IMPORTED_MODULE_0__.interpolate)(progress, [0, 1], [d.startX, d.endX]);
    const top = (0,remotion__WEBPACK_IMPORTED_MODULE_0__.interpolate)(progress, [0, 1], [d.startY, d.endY]);
    const rotate = (0,remotion__WEBPACK_IMPORTED_MODULE_0__.interpolate)(progress, [0, 1], [d.startRotation, d.endRotation]);
    return /* @__PURE__ */ React.createElement("div", {
      style: {
        position: "absolute",
        left,
        top,
        transform: `rotate(${rotate}deg)`
      }
    }, /* @__PURE__ */ React.createElement("svg", {
      style: {
        width: d.size * 2,
        height: d.size * 40,
        position: "absolute",
        top: 0
      },
      preserveAspectRatio: "none",
      viewBox: "0 0 200 4000"
    }, /* @__PURE__ */ React.createElement("defs", null, /* @__PURE__ */ React.createElement("filter", {
      id: "f1",
      x: "0",
      y: "0"
    }, /* @__PURE__ */ React.createElement("feGaussianBlur", {
      in: "SourceGraphic",
      stdDeviation: "10"
    })), /* @__PURE__ */ React.createElement("linearGradient", {
      id: `${d.gradId}`
    }, /* @__PURE__ */ React.createElement("stop", {
      stopColor: d.background[0],
      stopOpacity: d.shineOpacity * volume,
      offset: 0
    }), /* @__PURE__ */ React.createElement("stop", {
      stopColor: d.background[1],
      stopOpacity: 0.11 * volume,
      offset: 1
    }))), d.hasShine ? /* @__PURE__ */ React.createElement("path", {
      d: "M 50 50 L 0 4000 L 200 4000 z",
      fill: `url(#${d.gradId})`,
      filter: "url(#f1)"
    }) : null), /* @__PURE__ */ React.createElement("div", {
      style: __spreadProps(__spreadValues({
        height: d.size,
        width: d.size,
        borderRadius: d.size / 2,
        opacity: d.opacity,
        zIndex: d.size
      }, (0,polished__WEBPACK_IMPORTED_MODULE_1__/* .linearGradient */ .bC)({
        colorStops: d.background
      })), {
        boxShadow: `0 0 60px ${(0,polished__WEBPACK_IMPORTED_MODULE_1__/* .linearGradient */ .bC)({
          colorStops: d.background
        }).backgroundColor}`,
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      })
    }, /* @__PURE__ */ React.createElement(remotion__WEBPACK_IMPORTED_MODULE_0__.Img, {
      style: {
        height: d.size / 3 * 2,
        width: d.size / 3 * 2,
        marginLeft: d.size * 0.05,
        opacity: 0.55
      },
      src: "https://github.com/remotion-dev/logo/blob/main/monochromatic/element-0.png?raw=true"
    })));
  }));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (DropDots);


/***/ }),

/***/ 5592:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "09dcf704baef630e.mp3";

/***/ })

}]);
//# sourceMappingURL=363.bundle.js.map