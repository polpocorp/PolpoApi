/**
 * Script para testear si las credenciales OAuth2 son válidas
 * USO: node scripts/test-oauth.js
 */

require('dotenv').config();

const { google } = require('googleapis');

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REFRESH_TOKEN = process.env.REFRESH_TOKEN;
const MAILUSERNAME = process.env.MAILUSERNAME;

console.log('========================================');
console.log('Verificando variables de entorno...');
console.log('MAILUSERNAME:', MAILUSERNAME || '❌ UNDEFINED');
console.log(
  'CLIENT_ID:',
  CLIENT_ID ? '✅ ' + CLIENT_ID.substring(0, 20) + '...' : '❌ UNDEFINED',
);
console.log(
  'CLIENT_SECRET:',
  CLIENT_SECRET
    ? '✅ ' + CLIENT_SECRET.substring(0, 10) + '...'
    : '❌ UNDEFINED',
);
console.log(
  'REFRESH_TOKEN:',
  REFRESH_TOKEN
    ? '✅ ' + REFRESH_TOKEN.substring(0, 20) + '...'
    : '❌ UNDEFINED',
);
console.log('========================================\n');

if (!CLIENT_ID || !CLIENT_SECRET || !REFRESH_TOKEN) {
  console.error('❌ Faltan variables de entorno. Verificá tu .env');
  process.exit(1);
}

const oauth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  'https://developers.google.com/oauthplayground',
);

oauth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

async function testCredentials() {
  try {
    console.log('Intentando obtener access token...');
    const { token } = await oauth2Client.getAccessToken();
    console.log('✅ Access token obtenido exitosamente!');
    console.log('Token preview:', token.substring(0, 30) + '...');
    console.log('\n✅ Las credenciales son VÁLIDAS. El problema es otro.');
  } catch (error) {
    console.error('❌ Error al obtener access token:', error.message);
    console.error('\nPosibles causas:');
    console.error('1. El REFRESH_TOKEN fue revocado');
    console.error('2. CLIENT_ID o CLIENT_SECRET incorrectos');
    console.error('3. La Gmail API no está habilitada en Google Cloud');
    console.error(
      '\nSolución: Corré node scripts/get-refresh-token.js de nuevo',
    );
  }
}

testCredentials();
