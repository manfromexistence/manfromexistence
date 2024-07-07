#!/bin/bash

current_time_utc=$(date +%Z -d "+0 hours")

time_zone_offset="+06"  

local_time=$(date -d "$current_time_utc $time_zone_offset hours")

echo "Hello Programmer,"
echo "Thanks for coding in our better codebase!"
echo "Time in Kaligonj: $local_time"