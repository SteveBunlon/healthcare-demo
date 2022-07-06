const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');

console.log(__dirname);

const packageDefinition = protoLoader.loadSync(__dirname + '/../grpc-protos/acts.proto');
const acts_proto = grpc.loadPackageDefinition(packageDefinition).acts;


class GRcpClient {
  constructor() {
    this.client = new acts_proto.ActsManagement(
      'localhost:50051',
      grpc.credentials.createInsecure(),
    );
  }

  async createSurgeryAct(practitioner, patient, bodyPart){
    return new Promise((resolve, reject) => {
      this.client.createSurgeryAct({ practitioner, patient, bodyPart }, function (err, response) {
        resolve({ err, response });
      });
    });
  }

  async createOrderAct(practitioner, patient, isRenewable) {
    return new Promise((resolve, reject) => {
      this.client.createOrderAct({ practitioner, patient, isRenewable }, function(err, response) {
        resolve({ err, response });
      });
    });
  }

  async createOphthalmologistAct(practitioner, patient, isFirst) {
    return new Promise((resolve, reject) => {
      this.client.createOphthalmologistAct({practitioner, patient, isFirst}, function (err, response) {
        resolve({ err, response });
      });
    });
  }
}

module.exports = new GRcpClient();
