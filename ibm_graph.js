var ibmGraph = require('ibm-graph-client');
var creds = require('./creds.json');
var schema = require('./schema.json');

var graph;
var g = new ibmGraph(creds);

// Get the session token
g.session(function (err,data) {
  if (err) {
    console.log(err);
  } else {
    g.config.session = data;
    console.log('Your session token is '+ data);
  }
})

//Create a new graph
g.graphs().create(function(err,data) {
  if (err) {
    console.log("error");
    console.log(err);
  } else {
    graph = data.graphId;
    console.log('Graph Created: ' + data.graphId);
  }
})

//Check for the new graph
g.graphs().get(function(err,data) {
  if (err) {
    console.log("error");
    console.log(err);
  } else {
    console.log('Graphs ' + data);
  }
})

//Get the new graph url
// g.graph.url = g.config.url.substr(0, g.config.url.lastIndexOf('/') + 1) + graph;

g.schema().set(schema, function(err,data) {
  if (err) {
    console.log('Error setting the schema'+ err);
  } else {
    console.log(JSON.stringify(data));
  }
})
gremlin = 'def gt = graph.traversal();gt.V().hasLabel(\"attendee\").has(\"gender\",\"male\").outE(\"bought_ticket\").inV().hasLabel(\"band\").path();'

module.exports.getData = function getData(q,callback) {
  g.gremlin(q? q: gremlin, function(err,data){
    if (err) {
      console.log(err);
    }
    console.log(JSON.stringify(data));
    callback(data);
  });
}

