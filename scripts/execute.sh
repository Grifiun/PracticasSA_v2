#!/bin/bash

kubectl apply -f deployment-age.yaml
kubectl apply -f deployment-gender.yaml
kubectl apply -f deployment-name.yaml

kubectl apply -f service-age.yaml
kubectl apply -f service-gender.yaml
kubectl apply -f service-name.yaml

echo "Services:"
kubectl get svc

echo "Deployments:"
kubectl get deploy
