/**
 * SCRIPT PARA GENERAR REFRESH TOKEN DE GMAIL OAUTH2
 *
 * USO:
 * 1. npm install googleapis
 * 2. Completar las constantes CLIENT_ID y CLIENT_SECRET
 * 3. node get-refresh-token.js
 * 4. Abrir la URL en el navegador, autorizar, y pegar el código
 */

const { google } = require('googleapis');
const readline = require('readline');

// ⚠️ COMPLETAR CON TUS CREDENCIALES DE GOOGLE CLOUD CONSOLE
const CLIENT_ID =
  '74997274799-sdq4vua2m3jb40s2ih055cactbo4vdfc.apps.googleusercontent.com';

const CLIENT_SECRET = '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';
const REDIRECT_URI = 'https://developers.google.com/oauthplayground';

const oauth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI,
);

// Scopes necesarios para enviar emails
const SCOPES = [
  'https://mail.google.com/',
  'https://www.googleapis.com/auth/gmail.send',
];

const authUrl = oauth2Client.generateAuthUrl({
  access_type: 'offline',
  scope: SCOPES,
  prompt: 'consent', // Forzar para obtener refresh_token siempre
});

console.log('\n========================================');
console.log('1. Abrí esta URL en tu navegador:');
console.log('\n' + authUrl);
console.log('\n========================================');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question('\n2. Pegá el código de autorización aquí: ', async (code) => {
  rl.close();
  try {
    const { tokens } = await oauth2Client.getToken(code);

    console.log('\n========================================');
    console.log('✅ TOKENS GENERADOS EXITOSAMENTE');
    console.log('========================================');
    console.log('\nActualizá tu .env con estos valores:\n');
    console.log(`REFRESH_TOKEN=${tokens.refresh_token}`);
    console.log(
      `# Access Token (no lo necesitás en .env, nodemailer lo gestiona automáticamente)`,
    );
    console.log(`# ACCESS_TOKEN=${tokens.access_token}`);
    console.log('\n========================================');

    if (!tokens.refresh_token) {
      console.warn('\n⚠️  WARNING: No se generó refresh_token.');
      console.warn('Esto ocurre si la app ya fue autorizada antes.');
      console.warn(
        'Solución: Revocá el acceso en https://myaccount.google.com/permissions',
      );
      console.warn('y volvé a ejecutar este script.\n');
    }
  } catch (error) {
    console.error('\n❌ Error al obtener tokens:', error.message);
  }
});
