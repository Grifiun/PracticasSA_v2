#!/bin/bash

# Baja los deployments
kubectl delete -f deployment-age.yaml
kubectl delete -f deployment-gender.yaml
kubectl delete -f deployment-name.yaml

# Baja los servicios
kubectl delete -f service-age.yaml
kubectl delete -f service-gender.yaml
kubectl delete -f service-name.yaml
