var ProtoBuf = require('protobufjs');

// load the proto
// var builder = ProtoBuf.loadProto(proto_file);
var builder = ProtoBuf.loadProtoFile(__dirname + '/test.proto');
var Test = builder.build('Test');

// Define the service
var service = new Test.TestService((method, request, callback) => {
	var response = new Test.TestResponse();
	response.id = request.id;
	response.result = 1000.001;
	response.outputmap = request.inputs;

	callback(null, response);
});

// Create a request obj
var request = new Test.TestRequest();
request.id = '123-ABC';
request.inputs.set('one', 1);
request.inputs.set('two', 2);

// Call RPC with request obj
service.Operation(request, (error, response) => {
	if (error)
		console.log('Error', error);

	console.log('Response', response);
	console.log('get: ' + response.outputmap.get('one'));
	console.log('get: ' + response.outputmap.get('two'));
});
