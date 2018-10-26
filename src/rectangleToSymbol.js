import sketch from 'sketch';
var document = sketch.getSelectedDocument();

var Rectangle = require('sketch/dom').Rectangle;
var Group = require('sketch/dom').Group;
var UI = require('sketch/ui');

export default function() {
  onRectangle();
}

function findSymbol(symbols, name){
  // sketch.UI.message("overriding " +name);
  for(var i = 0; i < symbols.length; i++){
    if (symbols[i].name === name){
      return symbols[i];
    }
  }
  return null;
}

function overrideLayers(rectangle, instance) {
  var originalParent = rectangle.parent;
  rectangle.remove();
  instance.parent = originalParent;
}

function overrideButton(rectangle, symbols){
  var symbol = findSymbol(symbols, "button");
  var instance = symbol.createNewInstance();
  instance.frame.x = rectangle.frame.x;
  instance.frame.y = rectangle.frame.y;
  overrideLayers(rectangle, instance);
  sketch.UI.message("replaced button");
}

function overrideFooter(rectangle, symbols){
  var symbol = findSymbol(symbols, "footer");
  var instance = symbol.createNewInstance();
  instance.frame.x = rectangle.frame.x;
  instance.frame.width = rectangle.parent.frame.width;
  instance.frame.y = rectangle.parent.frame.height - symbol.frame.height;
  overrideLayers(rectangle, instance);
  sketch.UI.message("replaced footer");
}

function overrideHeader(rectangle, symbols){
var symbol = findSymbol(symbols, "header");
var instance = symbol.createNewInstance();
instance.frame.x = rectangle.frame.x;
instance.frame.y = rectangle.frame.y;
instance.frame.width = rectangle.parent.frame.width;
overrideLayers(rectangle, instance);
sketch.UI.message("replaced header");
}

function overrideCheckbox(rectangle, symbols){
  var symbol = findSymbol(symbols, "checkbox");
  var instance = symbol.createNewInstance();
  instance.frame.x = rectangle.frame.x;
  instance.frame.y = rectangle.frame.y;
  overrideLayers(rectangle, instance);
  sketch.UI.message("replaced checkbox");
}

function filterRelevantSymbols(rectangle) {
  var x = rectangle.frame.x;
  var y = rectangle.frame.y;
  var width = rectangle.frame.width;
  var height = rectangle.frame.height;
  var symbols = document.getSymbols();
  //check if header
  if(x === 0 && y === 0 && width === rectangle.parent.frame.width){
    overrideHeader(rectangle, symbols);
    return 1;
  }
  //check if footer
  else if(x === 0 && width === rectangle.parent.frame.width && y + height === rectangle.parent.frame.height){
    overrideFooter(rectangle, symbols);
    return 1;
  }
  //check if button
  else if(width >= 80 && height <= 80){
    overrideButton(rectangle, symbols);
    return 1;
  }
  //check if checkbox
  else if(width <= 50 && height <= 50 && width === height){
    overrideCheckbox(rectangle, symbols);
    return 1;
  }
  return null;
}

export function onRectangle(context) {
  var document = sketch.getSelectedDocument();
  var page = document.selectedPage;
  var layers = document.selectedLayers.layers;
  var symbol;
  var count = 0;
  if (layers.length >= 1) {
    for(var i = 0; i < layers.length; i++){
    symbol = filterRelevantSymbols(layers[i]);
    if(symbol !== null){
      count++;
    }
  }
  if(count === 1){
    sketch.UI.message(count +" rectangle replaced with a symbol.");
  }
  else{
    sketch.UI.message(count +" rectangles replaced with symbols.");
  }
  } else {
    sketch.UI.message("Nothing was selected.");
  }
}
