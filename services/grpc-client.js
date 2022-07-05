const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');

const packageDefinition = protoLoader.loadSync(__dirname + '/../grcp-server/protos/acts.proto');
const acts_proto = grpc.loadPackageDefinition(packageDefinition).acts;


class GRcpClient {
  constructor() {
    this.client = new acts_proto.ActsManagement(
      'localhost:50051',
      grpc.credentials.createInsecure(),
    );
  }

  async createSurgeryAct(bodyPart){
    return new Promise((resolve, reject) => {
      this.client.createSurgeryAct({bodyPart}, function (err, response) {
        resolve({err, response});
      });
    });
  }

  async createOrderAct(isRenewable) {
    return new Promise((resolve, reject) => {
      this.client.createOrderAct({ isRenewable }, function(err, response) {
        resolve({ err, response });
      });
    });
  }

  async createOphthalmologistAct(isFirst) {
    this.client.createOphthalmologistAct({ isFirst }, function(err, response) {
      Promise.resolve({ err, response });
    });
  }
}

module.exports = new GRcpClient();
