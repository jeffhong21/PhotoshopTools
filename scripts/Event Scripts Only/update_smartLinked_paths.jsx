/* ========================================================== 
// Jeffrey Hong
// ======================================================= */
// This script is supplied as is. It is provided as freeware.   
// The author accepts no liability for any problems arising from its use.  
// enable double-clicking from Mac Finder or Windows Explorer  
/*
<javascriptresource>
<name>Update SmartLinked Objects Path </name>
<about>
This will update broken smartLinked objects path with the correct server file path.
</about>
<category>CustomTools</category>
<enableinfo>true</enableinfo>
</javascriptresource>
*/

#target photoshop // this command only works in Photoshop CS2 and higher  
// bring application forward for double-click events  
app.bringToFront();


var begDesc = "$$$/JavaScripts/UpdateSmartLinkedObjectsPath/Description=Updates the server path names." // endDesc
var begName = "$$$/JavaScripts/UpdateSmartLinkedObjectsPath/MenuName=Update Smart Linked Objects Path" // endName

// Global Paths
var PCNorth;
var PCSouth;
var serverPath = "~/Desktop/MP1";


if (!documents.length) {
    alert("There are no documents open.", "No Document");
} else {
    //  Global variables
    Main();
    app.activeDocument.suspendHistory("Updating SmartLinked Objects Path", "Main()")

}




function Main()
{
    //  Cache users edit environments so we can restore it later.

    var orig_ruler_units = app.preferences.rulerUnits;
    var orig_type_units = app.preferences.typeUnits;
    var orig_display_dialogs = app.displayDialogs;
    app.preferences.rulerUnits = Units.PIXELS;                  // Set the ruler units to PIXELS  
    app.preferences.typeUnits = TypeUnits.POINTS;               // Set Type units to POINTS  
    app.displayDialogs = DialogModes.NO;                        // Set Dialogs off  


    try { 
        UpdateSmartLinkedObjects();
    } catch (e) { 
        alert(e + ': on line ' + e.line, 'Script Error', true); 
    }

    //  Restore users edit environment
    app.displayDialogs = orig_display_dialogs;                  // Reset display dialogs   
    app.preferences.rulerUnits = orig_ruler_units;              // Reset units to original settings  
    app.preferences.typeUnits = orig_type_units;                // Reset ruler units to original settings   

    // $infile = "missing link.tif";
    // app.open(new File($infile));
}


//  Leaving the main code in this function so that at any point it can return 
//  to the main line function to let it restore users edit environment.
function UpdateSmartLinkedObjects()
{
    ProcessArtLayers(activeDocument);
}

//  Loops through all ArtLayers.  Artlayers are derived from the Layers class.
//  "obj" is activeDocument
function ProcessArtLayers(obj)
{
    //  First we loop through all art layers.
    for( var i = obj.artLayers.length - 1; 0 <= i; i--){
        ProcessLayer(obj.artLayers[i]);
    }
    //  Next we than loop through all groups and process the art layers within them.
    for(var i = obj.layerSets.length - 1; 0 <= i; i--){
        ProcessArtLayers(obj.layerSets[i]);
    }
}

function ProcessLayer(layer)
{
    switch(layer.kind)
    {
        case LayerKind.SMARTOBJECT: ProcessSmartObject(layer); break;
        default: break;  // none process layer types catch all  
    }
}


function ProcessSmartObject(obj)
{
    var localFilePath = "";
    //  Using ActionReference to get a reference to the current layer as a smartObject.
    //  Than use executeActionGet to cache the smartObject.
    var ref = new ActionReference();
    ref.putIdentifier(charIDToTypeID("Lyr "), obj.id);  // putIdentifier(desiredClass, value): Puts a new identifier and value into the reference.
    var desc = executeActionGet(ref);                   //  executeActionGet(reference):  Obtains information about a predefined or recorded action.  
    var smObj = desc.getObjectValue(stringIDToTypeID("smartObject"));

    //  If a smartObject doesn't have a "link", than it will error out and move on to the next smartObject.
    try{
        var localFilePath = smObj.getPath(stringIDToTypeID("link"));
        //  If smart object's path doesn't exists.
        if (!localFilePath.exists){
            //  Get the correct path name.
            var path = GetCorrectPath(serverPath, localFilePath);
            //  If new path exists, ReplacePath in smart linked objects.
            if (path.exists) {
                // alert("File Path exists:\nNew path:  " + path);
                ReplaceSmartObjectPath(obj, path);
            } 
        }
    }
    catch(e){ }
    return localFilePath;
}


//  Gets the correct file path.  Three possible paths: PCNorth, PCSouth and other.
//  If path doesn't exist, try and see if PCSouth path mathces to file path.  If so, swap it out with PCNorth.
// "pathPrefix": The part of the path that needs to be switched in.
// "localFilePath": The file path for the missing smart object
function GetCorrectPath(pathPrefix, localFilePath)
{
    var basename = localFilePath.name;
    var newPath = new File(pathPrefix + "/" + basename);
    return newPath;
}


//  This will replace a selected smart linked objects path with the designated path.
//  "obj" : artLayer.
//  "path" : provided file path of smart object.
function ReplaceSmartObjectPath(obj, path)
{
    //  Make sure to select correct layer.
    MakeLayerActiveByName(obj.name);
    //  Replacing selected smartObject with path.
    var desc = new ActionDescriptor();
    desc.putPath(charIDToTypeID("null"), path);
    executeAction(stringIDToTypeID("placedLayerRelinkToFile"), desc, DialogModes.NO);  // executeAction(): Plays an Action Manager event.
}


//  Selects the layer named.
// "name": the name of the layer.
function MakeLayerActiveByName(name)
{
    var ref = new ActionReference();
    ref.putName(charIDToTypeID('Lyr '), name);
    var desc = new ActionDescriptor();
    desc.putReference(charIDToTypeID('null'), ref);
    desc.putBoolean(charIDToTypeID('MkVs'), false);
    executeAction(charIDToTypeID('slct'), desc, DialogModes.NO);
}  





/*

    * ArtLayer:  An object  within a document that contains the visual elements of the image.  The equivalent is a layer.
    * LayerSet:  A group of layer objects, which can include ArtLayer objects and other
     (nested) LayerSet objects.  A single command can manipulate all layers in a set.
    * ActionReference:  
    * ActionDescriptor:  This object provides a dictionary style mechanism for storing data 
      as key-value pairs.  It can be used for low-level access into Photoshop,


    Create a ActionReference to reference...smething.  You than feed the ActionReference to a ActionDescriptor via 
    putReference() method.  From there you can call the executeAction() method to do something.

    cTID == charIDToTypeID
    sTID == stringIDToTypeID
*/