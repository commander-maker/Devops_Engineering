terraform {
  backend "s3" {
    bucket         = "devops-terraform-state-nimesh-2026"
    key            = "terraform-cd/terraform.tfstate"
    region         = "ap-south-1"
    dynamodb_table = "terraform-locks"
  }
}
