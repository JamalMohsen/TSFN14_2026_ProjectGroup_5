# Task 5 – Monitoring and Basic Scaling

## Overview
In this task we monitored the backend service running in Kubernetes and demonstrated basic horizontal scaling using Minikube.

The backend application was deployed in Kubernetes using a Deployment and exposed using a Service. Monitoring tools and health endpoints were used to verify that the service was running correctly.

---

## Monitoring the Backend Service

### Logs
Application logs were inspected using the Kubernetes command:

kubectl logs deployment/backend

This command allowed us to verify that the backend server started correctly and that the application was running inside the container.

---

### Health Endpoints
The backend includes health endpoints that allow Kubernetes and developers to check if the service is running.

The following endpoints were tested in the browser:

/health/startup
/health/ready


These endpoints confirmed that the backend service started successfully and was ready to receive traffic.

---

### Metrics
To monitor resource usage, the **metrics-server** addon was enabled in Minikube.

The following command was used to check CPU and memory usage:

kubectl top pods


This command showed the resource usage for each backend pod.

---

## Horizontal Pod Autoscaling (HPA)

A Horizontal Pod Autoscaler (HPA) was configured for the backend deployment.

Configuration:
- Minimum replicas: 2
- Maximum replicas: 5
- Target CPU utilization: 50%

During testing, the deployment scaled from **2 pods to 4 pods**, which demonstrated that autoscaling was working correctly.

---

## Conclusion
The backend service was successfully monitored using logs, health endpoints, and Kubernetes metrics.

Autoscaling was verified by observing the increase in the number of running pods when the system experienced load.

Screenshots of the commands and results are included in the **screenshots** folder.