var fs=require("fs"),copy=process.argv[2],to=process.argv[3];fs.createReadStream(copy).pipe(fs.createWriteStream(to));
