#!/bin/bash
cd `dirname $0`
hh=`date +"%-H"`

if [ $hh -lt 15 ]; then
  yarn start
  exit
fi
yarn end

