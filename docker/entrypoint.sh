#!/usr/bin/env sh
set -e
# Gera config.js a partir das variáveis do container
envsubst < /usr/share/nginx/html/config.template.js > /usr/share/nginx/html/config.js
exec "$@"
