#!/bin/bash

# Define variables
APP_NAME="butcalculator"

# Ask for confirmation before uninstalling
read -p "Are you sure you want to uninstall $APP_NAME? (y/n): " choice
if [ "$choice" != "y" ]; then
  echo "Uninstallation canceled."
  exit 0
fi

sudo dpkg -r "$APP_NAME"

echo "Uninstallation completed."
