const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');

const { acts } = require('../models');

const packageDefinition = protoLoader.loadSync(__dirname + '/protos/acts.proto');

const acts_proto = grpc.loadPackageDefinition(packageDefinition).acts;

function sendDefaultResponse(callback) {
  callback(null, { isOk: true });
}

function createSurgeryAct(call, callback) {
  sendDefaultResponse(callback);
}

function createOrderAct(call, callback) {
  sendDefaultResponse(callback);
}

function createOphthalmologistAct(call, callback) {
  sendDefaultResponse(callback);
}

/**
 * Starts an RPC server that receives requests for the Greeter service at the
 * sample server port
 */
function main() {
  const server = new grpc.Server();

  server.addService(acts_proto.ActsManagement.service, {
    createSurgeryAct: createSurgeryAct,
    createOrderAct: createOrderAct,
    createOphthalmologistAct: createOphthalmologistAct,
  });

  server.bindAsync('0.0.0.0:50051', grpc.ServerCredentials.createInsecure(), () => {
    server.start();
  });
}

main();
