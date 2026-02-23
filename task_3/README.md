# Task 3 – Deploy Backend Service using Minikube

## Overview

This task deploys the backend service using Kubernetes with Minikube instead of Azure, as instructed by the course due to Azure access issues.

---

## Step 1 – Build Docker image

Command used:

```
docker build -t backend:1.0 .
```

---

## Step 2 – Load image into Minikube

Command used:

```
C:\minikube\minikube.exe image load backend:1.0
```

Verification:

```
C:\minikube\minikube.exe image ls
```

Image appears in list.

---

## Step 3 – Create Kubernetes Secret

Command used:

```
kubectl create secret generic backend-env --from-env-file=.env
```

---

## Step 4 – Deploy backend

Command used:

```
kubectl apply -f k8s/deployment.yaml
```

Verification:

```
kubectl get pods
```

Result: Pods running.

---

## Step 5 – Create Service (Load Balancer)

Command used:

```
kubectl apply -f k8s/service.yaml
```

Verification:

```
kubectl get svc
```

---

## Step 6 – Access the service

Command used:

```
C:\minikube\minikube.exe service backend-service --url
```

Opened URL in browser.

Result:

Backend service running successfully.

---

## Result

Successfully deployed backend service using:

* Docker container
* Kubernetes deployment
* Kubernetes service (load balancing)
* Minikube cluster

Service accessible and running correctly.

## Terraform deployment

Commands used:

terraform init  
terraform apply  

Terraform created:

- kubernetes deployment
- kubernetes service
- kubernetes secret

Verification:

kubectl get pods  
kubectl get svc  

Service opened using:

C:\minikube\minikube.exe service backend-service --url
