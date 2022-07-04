const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');

const packageDefinition = protoLoader.loadSync('../grpc-server/protos/test.proto');
const hello_proto = grpc.loadPackageDefinition(packageDefinition).helloworld;


class GRcpClient {
  constructor() {
    this.client = new hello_proto.Greeter(
      'localhost:50051',
      grpc.credentials.createInsecure(),
    );
  }

  async sayHello(name) {
    this.client.sayHello({ name: name || 'world' }, function(err, response) {
      console.log('Greeting:', response.message);
    });
  }
}

module.exports = new GRcpClient();
