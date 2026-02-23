output "service_name" {
  value = kubernetes_service.backend_service.metadata[0].name
}

output "how_to_open_service" {
  value = "Run: C:\\minikube\\minikube.exe service backend-service --url"
}