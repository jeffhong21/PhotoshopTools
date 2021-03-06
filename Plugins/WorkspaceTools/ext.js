
var pluginVersion = "1.2";

var frameAddress = null;
var extArr = null;
var extensionName = null;
var rtime = new Date(1, 1, 2E3, 12, 0, 0);
var timeout = !1;
var delta = 300;
var countElements = 0;
var deleteArr = [];

function getUserExtensionFolder(){
	return (new CSInterface).getSystemPath(SystemPath.USER_DATA) + "/jsx/" + extensionName;
}

function getExtensionFolder(){
    var c = new CSInterface();
    return c.getSystemPath(SystemPath.EXTENSION)
}

function getToolsFolder(){
	//return (new CSInterface).getSystemPath(SystemPath.USER_DATA) + "/jsx/" + extensionName;
    
    var c = new CSInterface();
    //return c.getSystemPath(SystemPath.USER_DATA) + "/jsx/" + extensionName + "/custom/";
	return c.getSystemPath(SystemPath.EXTENSION) + "/tools/"; 
}

function onLoaded() {
	var c = (new CSInterface).hostEnvironment.appName;
	"FLPR" != c && loadJSX();
	for (var d = ["PHXS"], e = 0; e < d.length; e++) {
		var f = d[e];
		if (0 <= c.indexOf(f) && (f = document.getElementById("btn_" + f)))
			f.disabled = !1
	}
	initializeExecuter()
}
function updateThemeWithAppSkinInfo(c) {
	var d = c.panelBackgroundColor.color;
	document.body.bgColor = toHex(d);
	var e = (new CSInterface).hostEnvironment.appName;
	"PHXS" == e && addRule("ppstyle", "button, select, input[type=button], input[type=submit]", "border-radius:3px;");
	if ("PHXS" == e || "PPRO" == e || "PRLD" == e) {
		var e = "background-image: -webkit-linear-gradient(top, " + toHex(d, 40) + " , " + toHex(d, 10) + ");",
		f = "background-image: -webkit-linear-gradient(top, " + toHex(d, 15) + " , " + toHex(d, 5) + ");",
		g,
		h,
		k,
		l,
		m;
		127 < d.red ? (g = "#000000;", h = "color:" + toHex(d, -70) + ";", k = "border-color: " + toHex(d, -90) + ";", l = toHex(d, 54) + ";", m = "background-image: -webkit-linear-gradient(top, " + toHex(d, -40) + " , " + toHex(d, -50) + ");") : (g = "#ffffff;", h = "color:" + toHex(d, 100) + ";", k = "border-color: " + toHex(d, -45) + ";", l = toHex(d, -20) + ";", m = "background-image: -webkit-linear-gradient(top, " + toHex(d, -20) + " , " + toHex(d, -30) + ");");
		addRule("ppstyle", ".default", "font-size:" + c.baseFontSize + "px; color:" + g + "; background-color:" + toHex(d) + ";");
		addRule("ppstyle", "button, select, input[type=text], input[type=button], input[type=submit]", k);
		addRule("ppstyle", "button, select, input[type=button], input[type=submit]", e);
		addRule("ppstyle", "button, select, input[type=button], input[type=submit]", "-webkit-box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.4), 0 1px 1px rgba(0, 0, 0, 0.2);");
		addRule("ppstyle", "button:enabled:active, input[type=button]:enabled:active, input[type=submit]:enabled:active", m);
		addRule("ppstyle", "button:enabled:active, input[type=button]:enabled:active, input[type=submit]:enabled:active", "-webkit-box-shadow: inset 0 1px 4px rgba(0, 0, 0, 0.6);");
		addRule("ppstyle", "[disabled]", f);
		addRule("ppstyle", "[disabled]", h);
		addRule("ppstyle", "input[type=text]", "padding:1px 3px;");
		addRule("ppstyle", "input[type=text]", "background-color: " + l) + ";";
		addRule("ppstyle", "input[type=text]:focus", "background-color: #ffffff;");
		addRule("ppstyle", "input[type=text]:focus", "color: #000000;")
	} else
		addRule("ppstyle", ".default", "font-size:" + c.baseFontSize + "px; color:" + reverseColor(d) + "; background-color:" + toHex(d, 20)), addRule("ppstyle", "button", "border-color: " + toHex(panelBgColor, -50))
}
function addRule(c, d, e) {
	if (c = document.getElementById(c))
		c = c.sheet, c.addRule ? c.addRule(d, e) : c.insertRule && c.insertRule(d + " { " + e + " }", c.cssRules.length)
}
function reverseColor(c, d) {
	return toHex({
		red : Math.abs(255 - c.red),
		green : Math.abs(255 - c.green),
		blue : Math.abs(255 - c.blue)
	}, d)
}
function toHex(c, d) {
	function e(c, d) {
		var e = !isNaN(d) ? c + d : c;
		0 > e ? e = 0 : 255 < e && (e = 255);
		e = e.toString(16);
		return 1 == e.length ? "0" + e : e
	}
	var f = "";
	if (c)
		with (c)f = e(red, d) + e(green, d) + e(blue, d);
	return "#" + f
}
function onAppThemeColorChanged(c) {
	c = JSON.parse(window.__adobe_cep__.getHostEnvironment()).appSkinInfo;
	updateThemeWithAppSkinInfo(c)
}
function loadJSX() {
	var c = new CSInterface();
	var d = c.getSystemPath(SystemPath.EXTENSION) + "/jsx/Photoshop.jsx";
    var scriptText = '$._ext.evalFile("' + d + '")'; 
	c.evalScript(scriptText);
}
function evalScript(c, d) {
	(new CSInterface).evalScript(c, d)
}
function onClickButton(c) {
	if ("FLPR" == c)
		evalScript('fl.createDocument(); fl.getDocumentDOM().addNewText({left:100, top:100, right:300, bottom:300} , "Hello Flash!" ); ');
	else {
		var d = new CSInterface,
		/*e = d.getSystemPath(SystemPath.USER_DATA) + "/jsx/" + extensionName + "/custom/",*/
        e = getToolsFolder(),        
		f = "";
		var patt = new RegExp("^Win");
		patt.test(d.getOSInformation()) ? f = "Windows" : "Mac" == d.getOSInformation().split(" ")[0] && (f = "Mac");
		evalScript("$._ext_" + c + ".run('" + e + "','" + f + "')", addButton);
	}
}
function execButton(c) {
	if ("false" == $("#editMode").val()) {
		var d = getName(c),
		e = new CSInterface,
		/*
        f = e.getSystemPath(SystemPath.USER_DATA) + "/jsx/" + extensionName + "/custom/"; 
        */
        f = getToolsFolder();
        var jsxScript = '$._ext.evalFile("' + f + d + "." + getExtension(c) + '")';
        console.log(jsxScript);
		e.evalScript(jsxScript);
		c = "$._ext_" + getName(d) + ".run('" + f + "')";
        console.log(c);
		evalScript(c)
	}
}
function addButton(c) {
	if ("null" != c) {
		for (var d = c.split(":files:"), e = d[0].split(","), f = 0; f < e.length - 1; f++) {
			c = e[f];
			var g = getName(c),
			h = getIconNameWithoutSpace(g),
			k = '<div class="item dragBg">\n<div class="scriptButton truncate" id="btn_PHXS_' + g + '"  onClick="execButton(\'' + c + '\')"   ><div class="itemIcon" id="icon_PHXS_' + h + '" onClick="addIcon(\'' + h + "')\"></div>" + g + '</div>\n<div class="itemDeleteButton" onClick="addToDel(\'' + h + "')\"></div>\n</div>";
			$("#container").append(k);
			k = "icon_PHXS_" + h;
			$(document.getElementById(k)).css("background-image", "url(img/addIcon.png)");
			deleteButton(c, g + ".png");
			saveList();
			0 == countElements && hideNoScript();
			countElements++
		}
		if ("" != d[1]) {
			c = d[1].split(",");
			for (f = 0; f < c.length - 1; f++)
				addIconToHtml(c[f])
		}
	}
	itemEditState()
}
function addToDel(c) {
	deleteArr.push(c)
}
function processDel() {
	for (var c = 0; c < deleteArr.length; c++) {
		var d = deleteArr[c];
		deleteButton(d, d + ".png")
	}
	deleteArr = null;
	deleteArr = []
}
function addButtonB(c) {
	if ("null" != c) {
		var d = getName(c),
		e = createItem();
		$("#container").append(e);
		e = "icon_PHXS_" + getIconNameWithoutSpace(d);
		$(document.getElementById(e)).css("background-image", "url(img/addIcon.png)");
		deleteButton(c, d + ".png");
		saveList()
	}
}
function createItem() {
	var c = createItemElement(),
	d = createScriptButton(),
	e = createItemIcon(),
	f = createitemDeleteButton();
	d.append(e[0]);
	c.append(d[0]);
	c.append(f[0]);
	return c
}
function createItemElement() {
	return $(document.createElement("div")).attr("class", "item dragBg")
}
function createScriptButton() {
	return $(document.createElement("div")).attr("class", "scriptButton truncate").attr("id", "btn_PHXS_'" + b + '"').click(function () {
		execButton(a)
	}).text(b)
}
function createItemIcon() {
	return $(document.createElement("div")).attr("class", "itemIcon").attr("id", "icon_PHXS_'" + getIconNameWithoutSpace(b) + '"').click(function () {
		addIcon(b)
	})
}
function createitemDeleteButton() {
	return $(document.createElement("div")).attr("class", "itemDeleteButton")
}
function initAddButton(c, d) {
	if ("null" != c) {
		var e = getName(c),
		f = "";
		"true" == $("#buttonScriptButtonSize").val() ? d ? (f = '<div class="item dragBg">\n<div class="scriptButton truncate" id="btn_PHXS_' + e + '"  onClick="execButton(\'' + c + '\')" style="cursor: default; padding-right: 10px; width: 172px;" ><div class="itemIcon" id="icon_PHXS_' + getIconNameWithoutSpace(e) + '" onClick="addIcon(\'' + e + "')\"></div>" + e + '</div>\n<div class="itemDeleteButton "></div>\n</div>', $("#container").append(f), addIconToHtml(e + ".png")) : (f = '<div class="item dragBg">\n<div class="scriptButton truncate" id="btn_PHXS_' + e + '"  onClick="execButton(\'' + c + '\')" style="cursor: default; padding-right: 10px; width: 172px;" ><div class="itemIcon" id="icon_PHXS_' + getIconNameWithoutSpace(e) + '" onClick="addIcon(\'' + e + "')\"></div>" + e + '</div>\n<div class="itemDeleteButton "></div>\n</div>', $("#container").append(f)) : d ? (f = '<div class="item dragBg">\n<div class="scriptButton truncate" id="btn_PHXS_' + e + '"  onClick="execButton(\'' + c + '\')"  style="cursor: default; padding-right: 10px;  " ><div class="itemIcon" id="icon_PHXS_' +
				getIconNameWithoutSpace(e) + '" onClick="addIcon(\'' + e + '\')" style="cursor: default; background-image: url(img/noIcon.png); "></div>' + e + '</div>\n<div class="itemDeleteButton " style="cursor: default; -webkit-transform: matrix(0, 0, 0, 0, 0, 0); "></div>\n</div>', $("#container").append(f), addIconToHtml(e + ".png")) : (f = '<div class="item dragBg">\n<div class="scriptButton truncate" id="btn_PHXS_' + e + '"  onClick="execButton(\'' + c + '\')"  style="cursor: default; padding-right: 10px;  " ><div class="itemIcon" id="icon_PHXS_' +
				getIconNameWithoutSpace(e) + '" onClick="addIcon(\'' + e + '\')" style="cursor: default; background-image: url(img/noIcon.png); "></div>' + e + '</div>\n<div class="itemDeleteButton " style="cursor: default; -webkit-transform: matrix(0, 0, 0, 0, 0, 0); "></div>\n</div>', $("#container").append(f));
		deleteButton(c, e + ".png")
	}
}
function initAddButtonB(c, d) {
	if ("null" != c) {
		var e = "",
		e = createItem();
		"true" == $("#buttonScriptButtonSize").val() ? d ? (transformItem1(e), $("#container").append(e[0]), addIconToHtml(c + ".png")) : (transformItem1(e), $("#container").append(e[0])) : d ? (transformItem2(e), $("#container").append(e[0]), addIconToHtml(c + ".png")) : (transformItem2(e), $("#container").append(e[0]));
		deleteButton(c, c + ".png")
	}
}
function transformItem1(c) {
	c.find(".scriptButton").attr("style", "cursor: default; padding-right: 10px; width: 172px;")
}
function transformItem2(c) {
	c.find(".scriptButton").attr("style", "cursor: default; padding-right: 10px; width: 35px;");
	c.find(".itemIcon").attr("style", "cursor: default; background-image: url(img/noIcon.png);");
	c.find(".itemDeleteButton").attr("style", "cursor: default; -webkit-transform: matrix(0, 0, 0, 0, 0, 0);")
}
function deleteButton(c, d) {
	var e = $("#container").find(".item").last();
	$(e).children(".itemDeleteButton").click(function () {
		$(this).parent().remove();
		var e = "jsx";
		1 < c.indexOf(".jsx") && (c = c.substr(0, c.length - 4));
		1 < c.indexOf(".js") && (e = "js", c = c.substr(0, c.length - 3));
		deleteFile(c, e);
		deleteIcon(d);
		countElements--;
		0 == countElements && showNoScript()
	})
}
function deleteFile(c, d) {
    //var toolsPath = (new CSInterface).getSystemPath(SystemPath.USER_DATA) + "/jsx/" + extensionName + "/custom/";
    var toolsPath = getToolsFolder();    
	c = "$._ext_PHXS.removeFile('" + toolsPath + c + "." + d + "')";
	evalScript(c)
}
function deleteIcon(c) {
    //var toolsPath = (new CSInterface).getSystemPath(SystemPath.USER_DATA) + "/jsx/" + extensionName + "/custom/";
    var toolsPath = getToolsFolder();
	c = "$._ext_PHXS.removeFile('" + (toolsPath + getIconNameWithoutSpace(c)) + "')";
	evalScript(c)
}
var clickCallback = function (c) {
	"undefined" == c || "" == c ? (extArr = resolveString((new CSInterface).getSystemPath(SystemPath.EXTENSION), "/"), extensionName = resolveString(extArr, ".")) : extensionName = c;
	c = getPanelState();
	evalScript(c, initCall)
}, initCall = function (c) {
	$("#buttonScriptButtonSize").val(c);
    
    //var extensionFolder = (new CSInterface).getSystemPath(SystemPath.USER_DATA) + "/jsx/" + extensionName + "/";
    //var extensionFolder = getUserExtensionFolder();
    var extensionFolder = getToolsFolder();
    
	var d = "$._ext_PHXS.exists('" + extensionFolder + "')";
	setTimeout(function () {
		evalScript(d, getFiles)
	}, 500)
};
function initializeExecuter() {
    var csIntf = new CSInterface();
    
    // Setting the global variable extensionName
	extensionName = resolveString(csIntf.getExtensionID(), ".");
    
    // Registering a context menu item that will show an "about" message box
    var menuStr = '<Menu> <MenuItem Id="miPSPowerToolsAbout" Label="WorkspaceTools Version ' +
            pluginVersion + '" Enabled="true" Checked="false"/></Menu>';
 
    csIntf.setPanelFlyoutMenu(menuStr);
    csIntf.addEventListener("com.adobe.csxs.events.flyoutMenuClicked",
    function(event){
        // In the future we might want to do something here
        //if (event && event.data && event.data.menuId == "miPSPowerToolsAbout")
        //{}   
    });
 
    // Loading panel preferences from the user profile
	var c = getPanelState();
	evalScript(c, initCall)
}
function loadJSXA(c, d) {
	var e = d.getSystemPath(SystemPath.EXTENSION) + "/jsx/";
	d.evalScript('$.evalFile("' + e + c + '")')
}
function getFiles(c) {
    //var extensionPath = (new CSInterface).getSystemPath(SystemPath.USER_DATA) + "/jsx/" + extensionName;
    var userPath = getUserExtensionFolder();
    var toolsPath = getToolsFolder();
    //var extensionPath = getExtensionFolder();
	"true" == c && (c = new CSInterface, loadJSXA("json2.js", c), c = "$._ext_PHXS.findFiles('" + toolsPath + "', '"+ userPath + "')", evalScript(c, addButtons))
}
function getOrder(c) {
    //var extensionPath = (new CSInterface).getSystemPath(SystemPath.USER_DATA) + "/jsx/" + extensionName;
    var extensionPath = getUserExtensionFolder();
	"true" == c && (c = new CSInterface, loadJSXA("json2.js", c), c = "$._ext_PHXS.getOrder('" + (extensionPath + "/preference/order") + "')", evalScript(c, addButtons))
}
function addButtons(c) {
	"true" == $("#buttonScriptButtonSize").val() ? $("#buttonIconMode").css({
		"background-image" : "url(img/iconModeOn.png)",
		"background-size" : "100%"
	}) : "false" == $("#buttonScriptButtonSize").val() && $("#buttonIconMode").css({
		"background-image" : "url(img/plus.png)",
		"background-size" : "100%"
	});
	if ("" != c) {
		var d = JSON.parse(c);
		c = d.files;
		0 == c.length ? showNoScript() : (countElements = c.length, hideNoScript());
		for (var d = d.images, e = 0; e < c.length; e++) {
			var f = getName(c[e]),
			f = hasIcon(f, d);
			initAddButton(c[e], f)
		}
		hideDeleteIcons()
	}
}
function hasIcon(c, d) {
	for (var e = 0; e < d.length; e++)
		if (getIconNameWithoutSpace(c) == getName(d[e]))
			return !0;
	return !1
}
function hideDeleteIcons() {
	TweenMax.to($(".itemDeleteButton"), 0, {
		scale : 0
	})
}
function savePanelState(c) {
	//var d = (new CSInterface).getSystemPath(SystemPath.USER_DATA) + "/jsx/" + extensionName + "/preference/";
    var d = getUserExtensionFolder() + "/preference/";
	evalScript("$._ext_PHXS.savePreference('" + d + "','" + (d + "pref") + "','itemSize','" + c + "')")
}
function saveOrder(c) {
	//var d = (new CSInterface).getSystemPath(SystemPath.USER_DATA) + "/jsx/" + extensionName + "/preference/";
    var d = getUserExtensionFolder() + "/preference/";
	evalScript("$._ext_PHXS.saveOrder('" + d + "','" + (d + "order") + "','" + c + "')")
}
function saveList() {
	var c = $(".scriptButton");
	if (0 < c.length) {
		for (var d = $(c[0]).text(), e = 1; e < c.length; e++)
			d += "," + $(c[e]).text();
		saveOrder(d)
	}
}

function getPanelState() {
	return "$._ext_PHXS.getPref('" + getUserExtensionFolder() + "/preference/pref" + "', 'itemSize')"
}

function addIcon(c) {
	if ("true" == $("#editMode").val()) {
		var e = getToolsFolder();
        
        var d = new CSInterface,
		f = "";
		"Windows" == d.getOSInformation().split(" ")[0] ? f = "Windows" : "Mac" == d.getOSInformation().split(" ")[0] && (f = "Mac");
		c = "$._ext_PHXS.addIcon('" + e + "','" + f + "','" + getIconNameWithoutSpace(c) + "')";
		evalScript(c, addIconToHtml)
	}
}
function addIconToHtml(c) {
	var d = getToolsFolder();
    
	var e = document.getElementById("icon_PHXS_" + getIconNameWithoutSpace(getName(c)));
	c = d + getIconNameWithoutSpace(c);
	$(e).addClass("hasIcon");
	$(e).css("background-image", "url('" + c + "?ver=" + Math.random() + "')")
}
function getName(c) {
	c = c.split(".");
	var d = "";
	if (2 < c.length)
		for (var d = c[0], e = 1; e < c.length - 1; e++)
			d += "." + c[e];
	else
		d = c[0];
	return d
}
function getExtension(c) {
	c = c.split(".");
	return c[c.length - 1]
}
function getIconNameWithoutSpace(c) {
	return c.replace(/[:\/\\*\ \?\"\<\>\|]/g, "")
}
var addFrame = function (c) {
	var d = $(document.createElement("iframe"));
	d.attr("src", "").attr("class", "frame").attr("sandbox", "allow-same-origin allow-scripts allow-popups");
	$(document.getElementsByClassName(c)).prepend(d)
};
function onJSONPLoad(c) {
	frameAddress = c.Script
}
function OpenBrow(c) {
	evalScript("$._ext_openBrowser.run('" + c + "')")
}
function rest() {
	$.ajax({
		url : "http://pspowertools.com/address.txt",
		type : "GET",
		headers : {
			"Access-Control-Allow-Origin" : "*"
		},
		crossDomain : !0,
		dataType : "jsonp",
		jsonp : "onJSONPLoad"
	})
}
function resolveString(c, d) {
	var e = c.split(d);
	return e[e.length - 1]
}
var frameAddress = null, extArr = null, extensionName = null, rtime = new Date(1, 1, 2E3, 12, 0, 0), timeout = !1, delta = 300, countElements = 0, deleteArr = [];
