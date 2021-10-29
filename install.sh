set -e

npm i
npm run build

cat >bms-backup.service <<EOF
[Unit]
Description=My service
After=network.target

[Service]
ExecStart=node server/main.js
WorkingDirectory=/home/pi/booster-ui
StandardOutput=inherit
StandardError=inherit
Restart=always
User=pi

[Install]
WantedBy=multi-user.target
EOF

sudo mv bms-backup.service /etc/systemd/system/

sudo systemctl enable bms-backup.service #TODO create this service
