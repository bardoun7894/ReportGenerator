#!/bin/bash

# Attempts to renew the certificate
docker-compose run --rm certbot renew

# Reloads nginx to pick up the new certificate
docker-compose exec nginx nginx -s reload
