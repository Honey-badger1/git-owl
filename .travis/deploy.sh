#!/bin/bash

echo "###### Starting Deployment ######"

scp -r client/dist/* root@$IP:$DEPLOY_DIR/client/
scp -r backend/* root@$IP:$DEPLOY_DIR

echo "###### Continue Deployment ######"

ssh root@$IP <<EOF
 cd $DEPLOY_DIR
 npm i
 pm2 restart owl
EOF

echo "###### End Deployment ######"