#!/bin/sh
# some npm modules only work with python2, this script makes a link
# and path change since my system doesn't use this python version
# as default. it also adds the local node_modules bin directory to
# the path so dependencies aren't required to be installed globally.
mkdir bin 2> /dev/null
ln -s /usr/bin/python2 bin/python 2> /dev/null
export PATH=$PWD/bin:$PWD/node_modules/.bin:$PATH
