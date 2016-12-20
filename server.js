//If you are using NodeJS as your server, just run this file 'node server.js'

//It depends on the express module which can be installed (once node is installed) by running
// >  npm install express

// If you can't run Node or express just use a simple python server
//    
//   > python -m SimpleHTTPServer 8080
//

// Helper to get the major version of ExpressJS
function getVersion(){
  // Since Express 3.3 version is not exposed any longer
  var version = (express.version || '4.').match(/^(\d)+\./)[1];
  return Number(version);
}

var express = require('express');
var ibmgraph = require('./ibm_graph.js');
var url = require('url');

var app;
var version = getVersion();

// Depending on the version number there are several ways to create an app
if(version === 2){
  app = express.createServer();
} else if(version > 2){
  app = express();
}

function getNodeColor(label){
  switch (label) {
    case "attendee" : return "rgb(255,180,180)";
      break;
    case "venue" : return "rgb(180,255,180)";
      break;
    case "band"  : return "rgb(180,180,255)";
      break;
  }
  return "rgb(180,180,180)"
}

//Map the returned data to Keylines item format
function	addItem(data,item){
	if (item.type === 'vertex'){
	  data.push({id:''+item.id,
								type: 'node',
								c: getNodeColor(item.label),
								// t: item.label,
                t: item.properties.name[0].value,
								d: item
	 });
	} else {
  	 data.push({id:''+item.id,
								type: `link`,
								c: 'rgb(255,0,0)',
								t: item.label,
								id1: ''+item.inV,
								id2: ''+item.outV,
		 });
	}
}

//Load the html files
app.use('/', express["static"].apply(null, [__dirname + '/']));
//Run the gremlin query and return results
app.get('/getData',function (req,res) {
  var data = [];
  gotData = false;
  var urlParts = url.parse(req.url,true);
  var q = urlParts.query.q;
  console.log('url parts'+JSON.stringify(urlParts));
  console.log('query is '+q);
  ibmgraph.getData(q,function (body) {
     for (var i = 0; i < body.result.data.length; i++) {
         console.log('successfully found this vertex : ' +
             JSON.stringify(body.result.data[i]));
         // For pathy queries the results for each path is in the objects object
				 if (body.result.data[i].objects) {
						for (j=0;j < body.result.data[i].objects.length;j++) {
							addItem(data,body.result.data[i].objects[j]);
						}
					}
         // For non-pathy queries the results are right on the data object itself
				else {
						addItem(data,body.result.data[i]);	
				}		
     }
     res.json(data);
  });
} );

app.listen(8081);

console.log('Server running. Browse to http://localhost:8081/index.htm');
