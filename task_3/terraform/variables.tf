variable "mongo_uri" {
  type = string
}

variable "jwt_secret" {
  type = string
}

variable "port" {
  type    = number
  default = 5001
}

variable "node_env" {
  type    = string
  default = "development"
}

variable "email_host" {
  type = string
}

variable "email_port" {
  type = number
}

variable "email_user" {
  type = string
}

variable "email_pass" {
  type = string
}