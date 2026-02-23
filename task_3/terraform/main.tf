terraform {
  required_version = ">= 1.4.0"

  required_providers {
    kubernetes = {
      source  = "hashicorp/kubernetes"
      version = "~> 2.30"
    }
  }
}

# Använder din lokala kubeconfig (minikube context)
provider "kubernetes" {
  config_path = pathexpand("~/.kube/config")
}

# Skapar en secret i Kubernetes (värden kommer från terraform variables)
resource "kubernetes_secret" "backend_env" {
  metadata {
    name = "backend-env"
  }

  data = {
    MONGO_URI   = var.mongo_uri
    JWT_SECRET  = var.jwt_secret
    PORT        = tostring(var.port)
    NODE_ENV    = var.node_env
    EMAIL_HOST  = var.email_host
    EMAIL_PORT  = tostring(var.email_port)
    EMAIL_USER  = var.email_user
    EMAIL_PASS  = var.email_pass
  }

  type = "Opaque"
}

resource "kubernetes_deployment" "backend" {
  metadata {
    name = "backend"
    labels = {
      app = "backend"
    }
  }

  spec {
    replicas = 2

    selector {
      match_labels = {
        app = "backend"
      }
    }

    template {
      metadata {
        labels = {
          app = "backend"
        }
      }

      spec {
        container {
          name  = "backend"
          image = "backend:1.0"

          image_pull_policy = "IfNotPresent"

          port {
            container_port = 5001
          }

          env_from {
            secret_ref {
              name = kubernetes_secret.backend_env.metadata[0].name
            }
          }
        }
      }
    }
  }
}

resource "kubernetes_service" "backend_service" {
  metadata {
    name = "backend-service"
  }

  spec {
    selector = {
      app = "backend"
    }

    type = "NodePort"

    port {
      port        = 80
      target_port = 5001
    }
  }
}