terraform {
  backend "s3" {
    bucket         = "devops-terraform-state-deamon"
    key            = "terraform-cd/terraform.tfstate"
    region         = "ap-south-1"
    dynamodb_table = "terraform-locks"
  }
}
