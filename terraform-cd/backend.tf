terraform {
  backend "s3" {
    bucket         = "my-terraform-state"
    key            = "terraform-cd/terraform.tfstate"
    region         = "ap-south-1"
    dynamodb_table = "terraform-locks"
  }
}
