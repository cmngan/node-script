const fs = require('fs-extra')
var childProcess = require('child_process');

function copy(source, dist) {
  console.log(`Copying ${source} to ${dist}`);
  fs.copySync(source, dist);
  console.log(`Copy ${source} to ${dist} finished`);
}

function replace(file, regex, toWord) {
  return new Promise( (res, rej) => {
    fs.readFile(file, 'utf8', function (err,data) {
      if (err) return rej(err);
      var result = data.replace(regex, toWord);    
      fs.writeFile(file, result, 'utf8', function (err) {
         if (err) return rej(err);
         else res();
      });
    });
  })
}

function script(script) {
  return new Promise( (res, rej) => {
    childProcess.execSync(script,{stdio:[0,1,2]});
    res()
  })
}

var args = process.argv.slice(2).reduce((p,c)=> {
  let keyAndValue = c.match(/[^-=][^=]*/g);
  (p[keyAndValue[0]] = keyAndValue[1])
  return p;
}, {});

module.exports = {
  script, replace, copy, args
}