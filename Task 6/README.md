# Task 6 – Load Testing with JMeter

## Description
In this task, a backend service was deployed using Docker and Kubernetes (Minikube). Load testing was performed using Apache JMeter to evaluate system performance under load.

---

## Technologies Used
- Node.js (Express)
- Docker
- Kubernetes (Minikube)
- Apache JMeter

---

## Deployment Steps

### 1. Build Docker Image
docker build -t backend:1.0 .

### 2. Load Image into Minikube
minikube image load backend:1.0

### 3. Create Kubernetes Secret
kubectl create secret generic backend-env --from-env-file=.env

### 4. Deploy Backend
kubectl apply -f k8s/deployment.yaml

### 5. Create Service
kubectl apply -f k8s/service.yaml

### 6. Access Service
minikube service backend-service --url

---

## Load Testing with JMeter

### Test Configuration
- Number of Users: 10  
- Ramp-up Period: 1 second  
- Loop Count: 10  
- Total Requests: 100  

### Endpoint Tested
http://127.0.0.1:61310/

---

## Results

- 100% successful requests  
- Average response time: ~40 ms  
- No errors occurred  

---

## Screenshots

Include screenshots in the repository:
- JMeter test results   
- Browser showing "Start page"  

---

## Conclusion

The backend service was successfully deployed using Kubernetes and handled multiple concurrent requests without any failures. The system demonstrated good performance and stability during load testing.