import { readFile } from 'fs/promises'
import { exec } from 'child_process'

async function start(){
  exec('bash ./tor/runHiddenService.sh', (error, stdout, stderr) => {
    if(stdout){
      console.log(`\x1b[32m[Tor] \x1b[34mInfo  - \x1b[0m${stdout}`)
    }
    if(stderr){
      console.error(`\x1b[32m[Tor] \x1b[31mError - \x1b[0m${stderr}`)
    }
    if(error){
      console.error(error);
      process.exit(1);
    }
  });
  const hostname = await readFile('./tor/hidden_service/hostname');
  console.log(`\x1b[32m[Tor] \x1b[34mInfo  - \x1b[0mHostname: ${hostname}`)
}
start();