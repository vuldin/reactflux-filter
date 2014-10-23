#!/bin/sh
mkdir bin 2> /dev/null
ln -s /usr/bin/python2 bin/python 2> /dev/null
export PATH=$PWD/bin:$PWD/node_modules/.bin:$PATH
