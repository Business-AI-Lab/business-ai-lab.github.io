const path = require('path');
module.exports = {
  apps: [{
    name: 'bailab-web',
    cwd: __dirname,
    script: path.join(__dirname, 'node_modules/serve/build/main.js'),
    interpreter: path.join(__dirname, '.runtime/node/bin/node'),
    args: ['deploy/current', '--listen', 'tcp://0.0.0.0:8080', '--no-clipboard', '--no-port-switching', '--config', path.join(__dirname, 'deploy/serve.json')],
    env: { NODE_ENV: 'production' },
    autorestart: true,
    restart_delay: 3000,
    max_memory_restart: '256M',
    time: true,
    out_file: path.join(__dirname, '.runtime/web-out.log'),
    error_file: path.join(__dirname, '.runtime/web-error.log')
  }]
};
