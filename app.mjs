import { JSONRequest } from '@wnynya/request';
import { SerialPort } from 'serialport';

/*

Wnynya 6850a271-b6b2-42f2-93db-0155d6a3bd30
jho5245 4962252e-347b-4711-b418-3d1afae250b1
pjun12345 aca171ee-4aba-4ba2-bd32-5f30d5a7e211

*/

const HYPIXEL_API_KEY = '39367b3b-9370-469b-9a2a-a43f024ed3ea';
const TARGET_UUID = '6850a271-b6b2-42f2-93db-0155d6a3bd30';
const SERIAL_PORT = 'COM6';
const SERIAL_SPEED = 9600;

function check(uuid) {
  return new Promise((resolve, reject) => {
    JSONRequest(
      `https://api.hypixel.net/status?uuid=${uuid}`,
      undefined,
      'GET',
      { 'API-Key': HYPIXEL_API_KEY }
    ).then((result) => {
      resolve(result.body.session);
    });
  });
}

const port = new SerialPort({ path: SERIAL_PORT, baudRate: SERIAL_SPEED });

port.on('open', () => {
  console.log(`Serial port ${SERIAL_PORT} opened.`);
});

port.on('data', (data) => {
  console.log(`Data from ${SERIAL_PORT}:`, data);
});

setInterval(() => {
  check(TARGET_UUID).then((session) => {
    if (session.online) {
      port.write('p');
    } else {
      port.write('0');
    }
  });
}, 3200);
