#! /bin/bash

ENV=$1

if [[ -z ${ENV} ]]
then
    echo "Usage: $0 <env>"
    exit 1
fi

cd $(dirname ${0}) || exit 1

mkdir -p ../ssh-keys && cd ../ssh-keys
ssh-keygen -t ed25519 -N "" -C "vjezbanje-skriptiranja" -f $ENV
sops -e -i "${ENV}"


