var fs = require('fs');
var filename = process.argv[0];
var data = "dfd";
var contents = fs.readFile(filename, 'utf8', function callback(err, data){
  if (err) {
      console.log(err);
    }
    console.log(data);
}
)
console.log(contents);
