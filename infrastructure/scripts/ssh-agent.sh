#! /bin/bash

ENV=$1
ACTION=$2

if [[ -z $ACTION || -z {$ENV} ]]
then
   echo "Usage: ./ssh-agent <env> <load|unload>"
   exit 1
fi

cd $(dirname ${0}) || exit 1

case $ACTION in
load)
  sops -d ../ssh-keys/${ENV}.enc | ssh-add - 2>&1;;
unload)
  ssh-add -D ../ssh-keys/${ENV}.pub;;
*)
  echo "Usage: $0 <env> <load|unload>"
  exit 1
  ;;
esac

