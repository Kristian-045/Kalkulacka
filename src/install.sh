#!/bin/bash

# Get the absolute path of the script's directory
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

# Find the .deb file in the same directory as the script
DEB_FILE=$(find "$SCRIPT_DIR" -maxdepth 1 -type f -name "*.deb" | head -n 1)

# Check if a .deb file was found
if [ -z "$DEB_FILE" ]; then
  echo "Error: No .deb file found in the same directory as the script."
  exit 1
fi

# Install the .deb package using dpkg
sudo dpkg -i "$DEB_FILE"

# Check if installation was successful
if [ $? -eq 0 ]; then
  echo "Installation successful."
else
  echo "Installation failed."
  exit 1
fi

# Install dependencies (if any)
sudo apt-get -f install

echo "Installation completed."
