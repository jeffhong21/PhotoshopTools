#target photoshop//// _4Up.jsxcTID = function(s) { return app.charIDToTypeID(s); };sTID = function(s) { return app.stringIDToTypeID(s); };////==================== 4 Up ==============//function _4Up() {  // Select  function step1(enabled, withDialog) {    if (enabled != undefined && !enabled)      return;    var dialogMode = (withDialog ? DialogModes.ALL : DialogModes.NO);    var desc1 = new ActionDescriptor();    var ref1 = new ActionReference();    ref1.putEnumerated(cTID('Mn  '), cTID('MnIt'), sTID("4upTile"));    desc1.putReference(cTID('null'), ref1);    executeAction(cTID('slct'), desc1, dialogMode);  };  try{step1(); }
  catch(e){alert("You need 4 or more windows open");
  }
  };//=========================================//                    _4Up.main//=========================================//_4Up.main = function () {  _4Up();};_4Up.main();// EOF"_4Up.jsx"// EOF