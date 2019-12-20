#!/bin/bash
osascript -e "tell application \"Terminal\" to do script \"cd ~/coding/shp/audiocloud_ws/audio-server && node index.js\""
osascript -e "tell application \"Terminal\" to do script \"cd ~/coding/shp/audiocloud_ws/auth-server && node index.js\""
osascript -e "tell application \"Terminal\" to do script \"cd ~/coding/shp/audiocloud_ws/client && npm run serve\""