export interface WelcomeTemplateData {
  name: string;
  token: string;
  url: string;
}

export const getWelcomeTemplate = (data: WelcomeTemplateData): string => `
  <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #eee; padding: 20px;">
    <h2 style="color: #333;">¡Hola, ${data.name}!</h2>
    <p>Gracias por registrarte. Tu código de verificación es:</p>
    <div style="background: #f4f4f4; padding: 10px; text-align: center; font-size: 24px; font-weight: bold; letter-spacing: 5px;">
      ${data.token}
    </div>
    <p>O puedes hacer clic en el siguiente botón:</p>
    <a href="${data.url}" style="display: block; width: 200px; margin: 20px auto; padding: 10px; background: #007bff; color: white; text-align: center; text-decoration: none; border-radius: 5px;">
      Verificar Cuenta
    </a>
  </div>
`;
