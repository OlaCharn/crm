const fs = require('fs');

const createEnvFile = (exampleFile, envFile) => {
  if (!fs.existsSync(envFile)) {
    fs.copyFileSync(exampleFile, envFile);
    console.log(`${envFile} created based on ${exampleFile}`);
  } else {
    console.log(`${envFile} already exists.`);
  }
};

createEnvFile('.env.development.example', '.env.development');
createEnvFile('.env.production.example', '.env.production');
