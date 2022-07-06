const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');

const packageDefinition = protoLoader.loadSync(__dirname + '/../grpc-protos/acts.proto');
const acts_proto = grpc.loadPackageDefinition(packageDefinition).acts;

const connection = require('../database');

function sendDefaultResponse(callback) {
  callback(null, { isOk: true });
}

function sendErrorResponse(callback, error) {
  callback(null, { isOk: false, error: error.toString()});
}

async function createSurgeryAct(call, callback) {
  const values = call.request;

  try {
    await connection.query(`
    INSERT INTO acts (date, comment, "patientId", "practitionerId", type)
      VALUES (NOW(), '${values.bodyPart}', ${values.patient}, ${values.practitioner}, 'surgery');
    `);

    sendDefaultResponse(callback);
  } catch (error) {
    sendErrorResponse(callback, error);
  }
}

async function createOrderAct(call, callback) {
  const values = call.request;

  try {
    await connection.query(`
    INSERT INTO acts (date, comment, "patientId", "practitionerId", type)
      VALUES (NOW(), '${values.isRenewable}', ${values.patient}, ${values.practitioner}, 'surgery');
    `);

    sendDefaultResponse(callback);
  } catch (error) {
    sendErrorResponse(callback, error);
  }
}

async function createOphthalmologistAct(call, callback) {
  const values = call.request;

  try {
    await connection.query(`
    INSERT INTO acts (date, comment, "patientId", "practitionerId", type)
      VALUES (NOW(), '${values.isFirst}', ${values.patient}, ${values.practitioner}, 'surgery');
    `);

    sendDefaultResponse(callback);
  } catch (error) {
    sendErrorResponse(callback, error);
  }
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
