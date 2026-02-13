provider "aws" {
  region = "ap-south-1"
}

# -------------------------------
# Security Group
# -------------------------------

resource "aws_security_group" "app_sg" {
  name = "app-security-group"

  ingress {
    description = "SSH"
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    description = "Frontend"
    from_port   = 3000
    to_port     = 3000
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    description = "Backend"
    from_port   = 5000
    to_port     = 5000
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name = "app-security-group"
  }
}

# -------------------------------
# EC2 Instance
# -------------------------------

resource "aws_instance" "app_server" {
  ami           = "ami-0f58b397bc5c1f2e8"  # Ubuntu 22.04 (ap-south-1)
  instance_type = "t3.micro"
  key_name      = "my-key"

  vpc_security_group_ids = [aws_security_group.app_sg.id]

  user_data_replace_on_change = true

  user_data = <<-EOF
              #!/bin/bash
              set -e

              # Update system
              apt update -y

              # Install Docker
              apt install -y docker.io
              systemctl start docker
              systemctl enable docker

              # Remove old containers if they exist
              docker rm -f backend || true
              docker rm -f frontend || true

              # Pull latest images
              docker pull deamon2002/devops-engineering:backend-v2
              docker pull deamon2002/devops-engineering:frontend-v3

              # Run backend
              docker run -d \
                --name backend \
                -p 5000:5000 \
                --restart always \
                deamon2002/devops-engineering:backend-v2

              # Run frontend
              docker run -d \
                --name frontend \
                -p 3000:3000 \
                --restart always \
                deamon2002/devops-engineering:frontend-v3
              EOF

  tags = {
    Name = "devops-app-server"
  }
}

# -------------------------------
# Output
# -------------------------------

output "public_ip" {
  value = aws_instance.app_server.public_ip
}
