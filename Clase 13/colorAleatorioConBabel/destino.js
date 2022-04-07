"use strict";

var colorAleatorioR = function colorAleatorioR() {
  return Math.floor(Math.random() * 256);
};

var colorAleatorioG = function colorAleatorioG() {
  return Math.floor(Math.random() * 256);
};

var colorAleatorioB = function colorAleatorioB() {
  return Math.floor(Math.random() * 256);
};

var colorAleatorioRGB = function colorAleatorioRGB() {
  console.log("RGB(".concat(colorAleatorioR(), ", ").concat(colorAleatorioG(), ", ").concat(colorAleatorioB(), ")"));
};

colorAleatorioRGB();
