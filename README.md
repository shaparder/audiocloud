# audiocloud

Web-app with a purpose of audio server for it's users.
Using the micro services architecture, the web app runs on two backend servers and a frontend client.

## installation
(this automated installation process is intended for unix env based shells aka _mac_ or _linux_)

First clone the github repo.

Then, dependecies needs to be downloaded for the three services in their respective folder _./audio-server_ / _./auth-server_ / _client_
A simple script is provided to install all the dependencies with one command, just use this in the cloned directory in your terminal:
```bash
sh ./install_dep.sh
```

Or do it manually yourself: https://docs.npmjs.com/cli/install

## running the app (local dev mode)
### automated
(this automated run process is intended for _mac_ terminal)

Again a script is provided, run:
```bash
sh ./run.sh
```
It will automatically open new terminal windows and spin-up the servers.

### manual
Or do it manually yourself in three different terminal windows (one command in each):
```bash
cd audio-server && node index.js
cd auth-server && node index.js
cd client && npm run serve
```

The web app is now available at this adress in any browser:
_localhost:8080_ 