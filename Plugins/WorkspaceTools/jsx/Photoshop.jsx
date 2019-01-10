var fileArray;
var fileArrayImages;
var a = new File("~/Documents/log.txt");
a.open('w');

$._ext_openBrowser = {
    run: function (site) {

        if ($.os.indexOf("Windows") != -1) {
            //$._ext_openFileBrowser.run(site);
            app.system("cmd.exe /c\"start http://" + site + "\"");
        }
        else {
            //  system.callSystem("open http://"+site);
            $._ext_openFileBrowser.run(site);
        }
    }
};

$._ext_openFileBrowser = {
    run: function (site) {
        var a = new File("~/Documents/redirect.html");
        a.open('w');
        a.writeln("<!DOCTYPE html><html><head lang='en'><meta charset='UTF-8'><title></title></head><body></body>");
        a.writeln("<script>window.onload = function(){window.location.href  ='" + site + "';}</script></html>");
        a.close();
        a.execute();
    }
};

$._ext_PHXS = {

    //Add button code
    run: function (path, osVersion) {
        a.writeln("function ext_PHXS.run");
        a.writeln("param path: " + path + " :osVersion: " + osVersion);
        //alert("run path and osVersion " + path + "  " + osVersion);
        //Create script folder inside jsx
        var sourceFolder = new Folder(path);
        a.writeln("source folder created : " + sourceFolder);
        if (!sourceFolder.exists)
            sourceFolder.create();

        //Select file according operating system version
        var selectedFile = null;
        if (osVersion == "Windows") {
            selectedFile = File.openDialog('Please select jsx file you want to be imported:', 'Supported Files: *.js;*.jsx;*.png', true);
        }
        else if (osVersion == "Mac") {
            selectedFile = File.openDialog('Please select jsx file you want to be imported:', MacJSFilter, true);
            //selectedFile = File.openDialog('Please select jsx file you want to be imported:', 'Supported Files: *.js;*.jsx;*.zip;*.png', true);
        }
        if (null == selectedFile) {
            //alert( "You have to select a file to execute!!!" );
            return null;
        }

        var res = "";
        var resPng = "";
        var zip = new Array();
        var png = new Array();
        var files = new Array();
        //There aren't repeated files
        for (var i = 0; i < selectedFile.length; i++) {

            var saveFile = new File(sourceFolder.fullName + "/" + selectedFile[i].name);

            if (!saveFile.exists) {
                if (GetExtension(selectedFile[i].name) == "zip") {
                    zip.push(selectedFile[i]);
                } else if (GetExtension(selectedFile[i].name) == "png") {
                    var saveFilepng = new File(sourceFolder.fullName + "/" + getIconNameWithoutSpace(selectedFile[i].name));
                    if (!saveFilepng.exists) {
                        png.push(selectedFile[i]);
                    }
                    //resPng += Folder.decode(selectedFile[i]) + ",";
                } else if (GetExtension(selectedFile[i].name) != "") {
                    files.push(selectedFile[i]);
                    selectedFile[i].copy(saveFile);
                    res += Folder.decode(selectedFile[i].name) + ",";
                }
            }
        }

        for (var i = 0; i < files.length; i++) {
            var fName = $._ext_PHXS.getName(files[i].name);
            a.writeln("selected files saved: " + files[i]);
            for (var j = 0; j < png.length; j++) {
                var pngName = $._ext_PHXS.getName(png[j].name);
                if (fName == pngName) {

                    var saveFilepng = new File(sourceFolder.fullName + "/" + getIconNameWithoutSpace(Folder.decode(png[j].name)));

                    png[j].copy(saveFilepng);
                    resPng += Folder.decode(png[j].name) + ",";
                    break;
                }
            }
        }

        /*  if (osVersion == "Mac") {
         for (var i = 0; i < zip.length; i++) {
         var sourceFolder2 = new Folder(path + "zip");
         alert(sourceFolder2);
         if (!sourceFolder2.exists)
         sourceFolder2.create();
         var saveFile = new File(sourceFolder2.fullName + "/" + "a.zip");
         zip[i].copy(saveFile);
         alert(sourceFolder2);
         alert("unzip " + sourceFolder2.fullName + "/" + "a.zip");
         system.callSystem("unzip " + sourceFolder2.fullName + "/" + "a.zip");
         alert("a");
         var selectedFile = getFilesByExtension(/\.(?:js|jsx)$/i, sourceFolder2);
         var files = new Array();
         for (var i = 0; i < selectedFile.length; i++) {
         var saveFile = new File(sourceFolder.fullName + "/" + selectedFile[i].name);
         if (!saveFile.exists) {
         files.push(selectedFile[i]);
         selectedFile[i].copy(saveFile);
         res += Folder.decode(selectedFile[i].name) + ",";
         }
         }

         var png = getFilesByExtension(/\.(?:png)$/i, sourceFolder2);
         for (var i = 0; i < files.length; i++) {
         var fName = $._ext_PHXS.getName(files[i].name);
         for (var j = 0; j < png.length; j++) {
         var pngName = $._ext_PHXS.getName(png[j].name);
         if (fName == pngName) {
         var saveFilepng = new File(sourceFolder.fullName + "/" + getIconNameWithoutSpace(png[j].name));
         png[j].copy(saveFilepng);
         resPng += Folder.decode(png[j].name) + ",";
         break;
         }
         }
         }
         sourceFolder2.remove();
         }
         }*/
        //Process filename if it has spaces

        //	var decodedName=Folder.decode (selectedFile[0].name);
        //	alert(decodedName);
        a.writeln("return: " + res + ":files:" + resPng);
        return res + ":files:" + resPng;
    },
    getFilesByExtension: function (extRE, sourceFolder) {
        // declare local variables
        var fileArray = new Array();
        //  var extRE = /\.(?:png|gif|jpg|bmp)$/i;
        // get all files in source folder
        var docs = sourceFolder.getFiles();
        var len = docs.length;
        for (var i = 0; i < len; i++) {
            var doc = docs[i];
            // only match files (not folders)
            if (doc instanceof File) {
                // store all recognized files into an array
                var docName = doc.name;
                if (docName.match(extRE)) {
                    fileArray.push(doc);
                }
            }
        }
        return fileArray;
    },
    getName: function (name) {
        var resArr = name.split(".");
        var resp = "";
        if (resArr.length > 2) {
            resp = resArr[0];
            for (var i = 1; i < resArr.length - 1; i++) {
                resp += "." + resArr[i];
            }
        } else {
            resp = resArr[0];
        }
        return resp;
    }
    ,
    fixArray: function (path, arr, nospace) {
        var ord = $._ext_PHXS.getOrder(path);

        var result = new Array();
        for (var i = 0; i < ord.length; i++) {

            var item = ord[i];
            //	alert("first---" + i + "---" + item);
            if (nospace)
                item = getIconNameWithoutSpace(item);
            for (var j = 0; j < arr.length; j++) {
                var item2 = $._ext_PHXS.getName(arr[j].name);
                //	alert("second---" + j + "---" + item2);
                //	alert(item + "=====" + item2);

                if (item == item2) {
                    result.push(arr[j].name);
                }
            }

        }
        return result;
    }
    ,

//Find files inside a folder with path path
    findFiles: function (toolsPath, userPath) {
        a.writeln("function ext_PHXS.findFiles");
        a.writeln("param toolsPath: " + toolsPath + " userPath: " + userPath);
        var sourceFolder = new Folder(toolsPath);
        
        var toolsDefinedOrder =  new File(toolsPath + "../tools.js");
        if (toolsDefinedOrder.exists)
        {
            toolsDefinedOrder.open('r');
            var toolsJsonStr = toolsDefinedOrder.readln();
            var toolsConfig = JSON.parse(toolsJsonStr);
            
            a.writeln("Predefined scripts found: " + toolsJsonStr);
            
            fileArray = [];
            fileArrayImages = [];
            
            for(var i = 0; i < toolsConfig.plugins.length; i++)
            {
                var scriptFile = new File(toolsPath + toolsConfig.plugins[i]);
                
                a.writeln("Script file " + i + ": " + toolsPath + toolsConfig.plugins[i]);
                
                fileArray.push(scriptFile);
                if (i < toolsConfig.images.length && toolsConfig.images[i])
                {
                    var imageFile = new File(toolsPath + toolsConfig.images[i]);
                    
                    a.writeln("Image file " + i + ": " + toolsPath + toolsConfig.images[i]);
                    
                    fileArrayImages.push(imageFile);
                }
            }
        }
        else
        {
            a.writeln("Enumerating scripts from the file system: " + sourceFolder);
            fileArray = getFiles(sourceFolder);
            fileArrayImages = getImagesFiles(sourceFolder);
        }
        var result = [];
        var resultImages = [];
        for (var i = 0; i < fileArray.length; i++) {
            result.push({"name": Folder.decode(fileArray[i].name)});
        }
        for (var i = 0; i < fileArrayImages.length; i++) {
            resultImages.push({"name": Folder.decode(fileArrayImages[i].name)});
        }

        var fol = new Folder(userPath + "/preference/");
        if (!fol.exists)
            fol.create();

        if (result.length != 0) {
            var fOrder = new File(userPath + "/preference/order");
            if (!fOrder.exists) {                
                fOrder.open('w');
                var res = $._ext_PHXS.getName(result[0].name);
                for (var i = 1; i < result.length; i++) {
                    a.writeln("res getname: " + $._ext_PHXS.getName(result[i].name));
                    res += "," + $._ext_PHXS.getName(result[i].name);
                }
                a.writeln("order res: " + res);
                fOrder.writeln(res);
                fOrder.close();
            }
        }

        a.writeln("result length : " + result.length);
        if (result.length != 0) {
            a.writeln("fixarray path : " + userPath + "/preference/order");
            result = $._ext_PHXS.fixArray(userPath + "/preference/order", result, false);
        }
        if (resultImages.length != 0) {
            resultImages = $._ext_PHXS.fixArray(userPath + "/preference/order", resultImages, true);
        }
        var obj = {"files": result, "images": resultImages};
        a.writeln("return : " + JSON.stringify(obj));
        return JSON.stringify(obj);
    }
    ,

//Return true if exists a folder with this path, false in other case
    exists: function (path) {
        a.writeln("function ext_PHXS.exists");
        a.writeln("param path: " + path);
        var sourceFolder = new Folder(path);
        a.writeln("return : " + sourceFolder.exists);
        return sourceFolder.exists;
    }
    ,

//Return true if file was deleted successfully, false in other case
    removeFile: function (path) {
        a.writeln("function ext_PHXS.removeFile");
        a.writeln("param path: " + path);
        var sourceFile = new File(path);
        a.writeln("return remove: " + sourceFile);
        return sourceFile.remove();


    }
    ,

//Return true if file was deleted successfully, false in other case
    savePreference: function (folderPath, path, key, value) {
        //alert(path);
        a.writeln("function ext_PHXS.savePreference");
        a.writeln("param folderPath: " + folderPath);
        a.writeln("param path: " + path);
        a.writeln("param key: " + key);
        a.writeln("param value: " + value);
        var sourceFile = new File(path);
        a.writeln("sourceFile: " + sourceFile);
        a.writeln("sourceFile exists: " + sourceFile.exists);
        /****Added***/
        if (!sourceFile.exists) {
            var sourceFolder = new Folder(folderPath);
            sourceFolder.create();
            sourceFile = new File(path);
            a.writeln("sourceFile create: " + sourceFile);
            sourceFile.open('w');
            sourceFile.writeln("scriptButtonSize,true");
            sourceFile.close();
        }
        /****Added***/
        sourceFile.open('w');
        //alert(keys.length + keys[0] + values[0])
        //for (var i = 0; i< keys.length; i++)
        //{
        //	alert("writing lines");
        a.writeln("sourceFile write: " + key + "," + value);
        sourceFile.writeln(key + "," + value);
        //}

    }
    ,
    saveOrder: function (folderPath, path, value) {

        var sourceFile = new File(path);

        sourceFile.open('w');

        sourceFile.writeln(value);


    }
    ,
    getOrder: function (path) {
        a.writeln("function ext_PHXS.getOrder");
        a.writeln("param path: " + path);
        var sourceFile = new File(path);

        sourceFile.open('r');

        var line = sourceFile.readln();
        a.writeln("line: " + line);
        if (line.indexOf(",") != -1)
            return line.split(",");
        else {
            var ar = new Array();
            ar.push(line);
            return ar;
        }

    }
    ,
    getPref: function (path, key) {
        a.writeln("function ext_PHXS.getPref");
        a.writeln("param path: " + path);
        //alert("getPreferencesssssssss"+path+key);
        var sourceFile = new File(path);
        sourceFile.open('r');
        var line = sourceFile.readln();
        a.writeln("line : " + line);

        var splittedLine = line.split(',');
        a.writeln("return: " + splittedLine[1]);
        //alert(splittedLine[1]+"     splittedLine");
        return splittedLine[1];

    }
    ,
//Add button code
    addIcon: function (path, osVersion, scriptName) {

        //Get script folder inside jsx
        var sourceFolder = new Folder(path);


        //Select file according operating system version
        var selectedFile = null;
        if (osVersion == "Windows") {
            selectedFile = File.openDialog('Please select jsx file you want to be imported:', 'JavaScript Files: *.png');
        }
        else if (osVersion == "Mac") {
            selectedFile = File.openDialog('Please select png file you want to be imported:', MacPngFilter);
        }
        if (null == selectedFile) {
            alert("You have to select a png to add!!!");
            return null;
        }

        //If file exists error
        var saveFile = new File(sourceFolder.fullName + "/" + scriptName + ".png");
        /*if(saveFile.exists)
         {
         alert( "You have selected a png before!!!" );
         return null;
         }*/

        //Copy file to extension folder
        var res = selectedFile.copy(saveFile);
        if (!res) {
            alert("Your file has not copied successfully, please review it");
            return null;
        }


        //Rename copied file to script name
        //var copiedFile = new File(sourceFolder.fullName +"/"+selectedFile.name);
        //copiedFile.rename(scriptName+".png");

        //	var decodedName=Folder.decode(copiedFile.name.split('.')[0]);
        //	alert(decodedName);

        return scriptName + ".png";
    }


}
;

///////////////////////////////////////////////////////////////////////////////
// getFiles - get all files within the specified source
///////////////////////////////////////////////////////////////////////////////
function getFiles(sourceFolder, filter) {
    // declare local variables
    var fileArray = new Array();
    var extRE = /\.(?:jsx|js)$/i;
    a.writeln("function getFiles");
    a.writeln("param sourceFolder: " + sourceFolder);


    // get all files in source folder
    var docs = sourceFolder.getFiles();
    var len = docs.length;
    for (var i = 0; i < len; i++) {
        var doc = docs[i];
        a.writeln("doc : " + doc);
        // only match files (not folders)
        if (doc instanceof File) {
            // store all recognized files into an array
            var docName = doc.name;
            if (docName.match(extRE)) {
                fileArray.push(doc);
            }
        }
    }


    return fileArray;
}


///////////////////////////////////////////////////////////////////////////////
// getFiles - get all files within the specified source
///////////////////////////////////////////////////////////////////////////////
function getImagesFiles(sourceFolder, filter) {
    // declare local variables
    var fileArrayImages = new Array();
    var extRE = /\.(?:png)$/i;

    // get all files in source folder
    var docs = sourceFolder.getFiles();
    var len = docs.length;
    for (var i = 0; i < len; i++) {
        var doc = docs[i];

        // only match files (not folders)
        if (doc instanceof File) {
            // store all recognized files into an array
            var docName = doc.name;
            if (docName.match(extRE)) {
                fileArrayImages.push(doc);
            }
        }
    }


    return fileArrayImages;
}

///////////////////////////////////////////////////////////////////////////////
// Function: MacJSFilter
// Input: f, file or folder to check
// Return: true or false, true if file or folder is to be displayed
///////////////////////////////////////////////////////////////////////////////
function MacJSFilter(f) {
    var jsExtension = ".js";
    var jsExtension2 = ".jsx";
    var jsExtension3 = ".png";
    //var folderThatsAnApp = ".app"; // this doesn't cover all packages or bundles
    var lCaseName = f.name;
    lCaseName.toLowerCase();
    if (lCaseName.lastIndexOf(jsExtension) == f.name.length - jsExtension.length)
        return true;
    else if (lCaseName.lastIndexOf(jsExtension2) == f.name.length - jsExtension2.length)
        return true;
    else if (lCaseName.lastIndexOf(jsExtension3) == f.name.length - jsExtension3.length)
        return true;
    /*else if ( lCaseName.lastIndexOf( folderThatsAnApp ) == f.name.length - folderThatsAnApp.length )
     return false;*/
    else if (f instanceof Folder)
        return true;
    else
        return false;
}

function GetExtension(name) {
    var arr = name.split(".");
    var le = arr.length;
    return arr[le - 1].toLowerCase();
}

function MacPngFilter(f) {
    var jsExtension = ".png";
    //var jsExtension2 = ".jsx";
    //var folderThatsAnApp = ".app"; // this doesn't cover all packages or bundles
    var lCaseName = f.name;
    lCaseName.toLowerCase();
    if (lCaseName.lastIndexOf(jsExtension) == f.name.length - jsExtension.length)
        return true;
    /*else if ( lCaseName.lastIndexOf( jsExtension2 ) == f.name.length - jsExtension2.length )
     return true;
     else if ( lCaseName.lastIndexOf( folderThatsAnApp ) == f.name.length - folderThatsAnApp.length )
     return false;*/
    else if (f instanceof Folder)
        return true;
    else
        return false;
}

function getIconNameWithoutSpace(a) {
    return a.replace(/[:\/\\*\ \?\"\<\>\|]/g, "")
};