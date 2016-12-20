#keylines-demo
This an express server that connects to [IBM Graph](http://ibm.biz/ibm-graph) and is able to process gremlin queries. It sends back the data in keylines format that can be used to visualize the returned data. It uses the [ibm-graph-client](https://www.npmjs.com/package/ibm-graph-client) module to connect to IBM Graph.

##Setup
Clone the repo

```
git clone git@github.com:alaam/keylines-demo.git
```

#Install dependencies
##Install Keylines sdk from the keylines site http://cambridge-intelligence.com/keylines/
Your keylines-demo dir should look something like this

```
drwxrwxr-x@ 22   748 Dec 20 09:05 .
drwxrwxr-x@ 11   374 Dec 20 09:09 ..
-rw-r--r--   1  1855 Dec 20 09:05 README.md
drwxr-xr-x@ 41  1394 Nov 28 19:31 assets
drwxrwxr-x@  3   102 Nov 28 19:31 css
drwxr-xr-x@ 13   442 Nov 28 19:31 fonts
-rw-r--r--   1  1386 Nov 28 14:43 ibm_graph.js
drwxr-xr-x@  5   170 Nov 28 19:31 images
-rw-r--r--@  1  2628 Nov 28 14:43 index.htm
drwxrwxr-x@  3   102 Nov 28 19:31 js
drwxrwxr-x@  5   170 Nov 28 19:31 map
drwxr-xr-x@  5   170 Nov 28 19:31 ng
-rw-r--r--   1 40792 Nov 28 14:43 nxnw_dataset.json
drwxr-xr-x@  3   102 Nov 28 19:31 react
-rw-r--r--   1  1974 Nov 28 14:43 schema.json
-rw-r--r--@  1  2677 Dec  8 18:02 server.js
```

```
cd keylines-demo
```

#Add your service credentials
- Create a new file on the root of `keylines-demo` and call it credds.json
- Edit the file and add your service credentials json 
```
{
  "apiURL" : "<service apiURL>/g",
  "username" : "<Your username >",
  "password" : "<Your password>",
} 
```

#Loading the data
This code doesn't load data into the service yet (will do it soon). But you can easily add the data using bulkload API. Alternatively, you can just load the sample data from the service UI on Bluemix. Check the documentation for more details https://ibm-graph-docs.ng.bluemix.net/examples.html#node.js

Here's a sample of loading a graphml file

```
var bulkUploadOpts = {
    method: 'POST',
    headers: {'Authorization': sessionToken},
    uri: apiURL + '/bulkload/graphml',
    formData: {
      'graphml': fs.createReadStream(__dirname +  
          '/../public/sample_graphml.xml'),
      'type': 'application/xml'
    }
};
request(bulkUploadOpts).then(function (body){
    console.log('Our file was uploaded and the result was : ' +
        JSON.stringify(body.result.data[0]));
});
```

#Start the server
```
node server.js
```

#Trying the samples
##Keylines
- start your browser and browse to `http://localhost:8081/index.html`
- Enter a gremlin query and hit the `Show` button 
![Keylines Graph](keylines.png?raw=true "Keylines Graph")

