const { error } = require("console");
const fs = require("fs");

//Create and write file


//Sync...
// fs.writeFileSync("./text.txt", "Hey There!!!");
// If we run this again old file data get overwrite

//Async...
// fs.writeFile("./text.txt", "Hey There!!!", (err) => { 
//      console.log(err);
// });

//Read Files
// In Sync it can return value but in async it doesnt return any value
// In Async we use callback for error and result 
const result = fs.readFileSync("./text.txt", "utf-8")
// console.log(result);

// fs.readFile("./text.txt", "utf-8", (err, result) => {
//     if (!err) {
//         console.log(result);
//     }
//     else {
//         console.log(err);
//     }
// });

// fs.appendFileSync("./text.txt", `\nDurgesh`);

//Delete
// fs.unlinkSync(path)

