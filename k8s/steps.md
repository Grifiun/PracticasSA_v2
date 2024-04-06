```bash
# Change this part from container registry to artifact Registry


docker build -t us.gcr.io/carbon-ray-415302/node_microservice_age:v1 .
docker build -t us.gcr.io/carbon-ray-415302/node_microservice_gender:v1 .
docker build -t us.gcr.io/carbon-ray-415302/node_microservice_name:v1 .
docker build -t us.gcr.io/carbon-ray-415302/node_microservice_name:v2 .
docker build -t us.gcr.io/carbon-ray-415302/node_microservice_name:v3 .

gcloud container clusters get-credentials cluster-pr2 --zone us-central1-c --project carbon-ray-415302
  
docker push us.gcr.io/carbon-ray-415302/node_microservice_age:v1
docker push us.gcr.io/carbon-ray-415302/node_microservice_gender:v1
docker push us.gcr.io/carbon-ray-415302/node_microservice_name:v1
docker push us.gcr.io/carbon-ray-415302/node_microservice_name:v2
docker push us.gcr.io/carbon-ray-415302/node_microservice_name:v3

kubectl apply -f deployment-age.yaml
kubectl apply -f deployment-gender.yaml
kubectl apply -f deployment-name.yaml

kubectl apply -f service-age.yaml
kubectl apply -f service-gender.yaml
kubectl apply -f service-name.yaml

kubectl get svc
kubectl get deploy

34.41.171.142:3002/name?name=denilson

``` 