# Resolve current script directory (portable: Linux / macOS / Windows Git Bash)
BTRADELOC="$(cd "$(dirname "$0")" && pwd)"

BUILDLOC=prod
if [ "$1" = "dev" ]; then
   echo "Uploading to Deployment Template development Environment"
   TARGETSERVER=jayeesha@183.82.0.28
else
   echo "Invalid argument"
   exit 1
fi

DATE=$(date +%Y-%m-%d-%H-%M)

# Move to Admin directory safely
cd "$BTRADELOC" || {
   echo "❌ Failed to change directory to $BTRADELOC"
   exit 1
}

echo "Build Started .....🏗️🏗️🏗️🏗️🏗️🏗️🏗️🏗️🏗️🏗️🏗️🏗️🏗️🏗️🏗️🏗️🏗️"
npm run build || {
   echo "❌ Build command failed"
   exit 1
}

if [ -d "$BTRADELOC/dist" ]; then
   cd "$BTRADELOC/dist"

   echo "Creating tar.."
   tar -cvf ~/Downloads/deploymentadmin.tar.xz *
   echo "Started Coping to Server................!©️©🗼🗼🗼🗼🗼🗼🗼🗼🗼🗼🗼🗼🗼🗼"

   if [ "$1" = "dev" ]; then
      scp ~/Downloads/deploymentadmin.tar.xz $TARGETSERVER:
      echo "Extracting tar in server.."
      ssh $TARGETSERVER "cd /var/www/html/schooladmindev.dosystemsinc.com/public_html && sudo -S tar -xvf ~/deploymentadmin.tar.xz"
      echo "Successfully uploaded to AI Template Dev"
   
   fi
else
   echo "❌ Build folder not found — build failed"
   exit 1
fi