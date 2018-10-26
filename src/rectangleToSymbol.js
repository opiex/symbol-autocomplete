import sketch from 'sketch';
var document = sketch.getSelectedDocument();

var Rectangle = require('sketch/dom').Rectangle;
var Group = require('sketch/dom').Group;
var UI = require('sketch/ui');

export default function() {
  onRectangle();
}

// function findSymbol(symbols, name){
//   for(var i = 0; i < symbols.length; i++){
//     if (symbols[i].name === name){
//       return symbols[i];
//     }
//   }
//   return null;
// }

function findSymbol(symbols, name){
  var searchedString = name.toUpperCase();
  var currentString;
  var minLength = 999;
  var relevantSymbol = null;

  for(var i = 0; i < symbols.length; i++){
    currentString = symbols[i].name.toUpperCase();
    if (currentString.indexOf(searchedString) !== -1 && currentString.length < minLength){
      relevantSymbol = symbols[i];
      minLength = searchedString.length;
    }
    console.log("current string: " +currentString +" , length: " +currentString.length);
  }
  return relevantSymbol;
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
}

function overrideFooter(rectangle, symbols){
  var symbol = findSymbol(symbols, "footer");
  var instance = symbol.createNewInstance();
  instance.frame.x = rectangle.frame.x;
  instance.frame.width = rectangle.parent.frame.width;
  instance.frame.y = rectangle.parent.frame.height - symbol.frame.height;
  overrideLayers(rectangle, instance);
}

function overrideHeader(rectangle, symbols){
var symbol = findSymbol(symbols, "header");
var instance = symbol.createNewInstance();
instance.frame.x = rectangle.frame.x;
instance.frame.y = rectangle.frame.y;
instance.frame.width = rectangle.parent.frame.width;
overrideLayers(rectangle, instance);
}

function overrideCheckbox(rectangle, symbols){
  var symbol = findSymbol(symbols, "checkbox");
  var instance = symbol.createNewInstance();
  instance.frame.x = rectangle.frame.x;
  instance.frame.y = rectangle.frame.y;
  overrideLayers(rectangle, instance);
}

function overrideText(textlayer, symbols){
  var symbol = findSymbol(symbols, textlayer.text);
  var instance = symbol.createNewInstance();
  instance.frame.x = textlayer.frame.x;
  instance.frame.y = textlayer.frame.y + textlayer.frame.height - instance.frame.height;
  overrideLayers(textlayer, instance);
}

function overrideRadioButton(oval, symbols){
  var symbol = findSymbol(symbols, "radiobutton");
  var instance = symbol.createNewInstance();
  instance.frame.x = oval.frame.x;
  instance.frame.y = oval.frame.y;
  overrideLayers(oval, instance);
}

function overrideInput(line, symbols){
  var symbol = findSymbol(symbols, "input");
  var instance = symbol.createNewInstance();
  instance.frame.x = line.frame.x;
  instance.frame.y = line.frame.y - instance.frame.height;
  overrideLayers(line, instance);
}

function filterRelevantSymbols(layer) {
  var x = layer.frame.x;
  var y = layer.frame.y;
  var width = layer.frame.width;
  var height = layer.frame.height;
  var symbols = document.getSymbols();
  var typeOfLayer = String(layer.sketchObject.class());
  //check if text
  if(typeOfLayer === 'MSTextLayer'){
    overrideText(layer, symbols);
    return 1;
  }
  //check if header
  else if(typeOfLayer === 'MSRectangleShape' && x === 0 && y === 0 && width === layer.parent.frame.width){
    overrideHeader(layer, symbols);
    return 1;
  }
  //check if footer
  else if(typeOfLayer === 'MSRectangleShape' && x === 0 && width === layer.parent.frame.width && y + height === layer.parent.frame.height){
    overrideFooter(layer, symbols);
    return 1;
  }
  //check if button
  else if(typeOfLayer === 'MSRectangleShape' && width >= 80 && height <= 100){
    overrideButton(layer, symbols);
    return 1;
  }
  //check if radio button
  else if(typeOfLayer === 'MSOvalShape' && width <= 50 && height <= 50){
    overrideRadioButton(layer, symbols);
    return 1;
  }
  //check if checkbox
  else if(typeOfLayer === 'MSRectangleShape' && width <= 50 && height <= 50 && width === height){
    overrideCheckbox(layer, symbols);
    return 1;
  }
  //check if input
  else if(typeOfLayer === 'MSShapePathLayer' && height <= 3){
    overrideInput(layer, symbols);
    return 1;
  }
  return null;
}

export function onRectangle(context) {
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
    sketch.UI.message(count +" layer replaced with a symbol. 🎉");
  }
  else{
    sketch.UI.message(count +" layers replaced with symbols. 🎉");
  }
  } else {
    sketch.UI.message("Nothing was selected.");
  }
}
