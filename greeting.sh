#!/bin/bash

current_time=$(date +"%H:%M")
current_day=$(date +"%A")

echo "Hello Sir, Good $(if [[ $(date +%H) -lt 12 ]]; then echo 'morning'; elif [[ $(date +%H) -lt 18 ]]; then echo 'afternoon'; else echo 'evening'; fi). The current time is $current_time, and today is $current_day."
