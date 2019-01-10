selectTool("sliceTool");

function s2t(s) { return app.stringIDToTypeID(s); }
function selectTool(stringID){
	var d = new ActionDescriptor();
	var r = new ActionReference();
	r.putClass( s2t(stringID) );
	d.putReference( s2t("target"), r);
	d.putBoolean( s2t("dontRecord"), true );
	d.putBoolean( s2t("forceNotify"), true );
	executeAction( s2t("select"), d, DialogModes.NO );
}