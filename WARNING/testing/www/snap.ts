const xml2js = require('xml2js');

let xmlString = `
<scriptsonly app="Spark Labs Workspace, https://snap.berkeley.edu" version="2"><script x="16" y="12.333333333333343"><block s="forward"><l>10</l></block><block s="turn"><l>15</l></block><block s="turnLeft"><l>15</l></block><block s="setHeading"><l>180</l></block><block s="doFaceTowards"><l><option>center</option></l></block><block s="gotoXY"><l>0</l><l>0</l></block><block s="doGlide"><l>1</l><l>0</l><l>0</l></block><block s="bounceOffEdge"></block></script></scriptsonly>
`;

// Assuming 'xml' is your XML data
let parser = new xml2js.Parser();
parser.parseString(xmlString, function (err: any, result: any) {
    // 'result' is a JavaScript object
    // Convert the object to a JSON string
    let jsonString = JSON.stringify(result);
    console.log(jsonString);
});
