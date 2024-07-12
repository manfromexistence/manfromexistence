#!/bin/bash

# Change to the directory where your .mp4 files are located
cd /path/to/your/mp4/files

# Initialize a counter
count=1

# Loop through each .mp4 file
for file in *.mp4; do
    # Rename the file
    mv "$file" "$count.mp4"
    # Increment the counter
    ((count++))
done
