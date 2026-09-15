variable "aws_region" {
  description = "AWS region for the deployment"
  type        = string
  default     = "ap-south-1"
}

variable "key_name" {
  description = "Name of the EC2 key pair managed by Terraform"
  type        = string
  default     = "devops-app-key"
}

variable "public_key_path" {
  description = "Path to the public SSH key used to create the EC2 key pair"
  type        = string
}
