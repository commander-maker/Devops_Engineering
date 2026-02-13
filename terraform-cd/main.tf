resource "aws_instance" "app_server" {
  ami           = "ami-0f58b397bc5c1f2e8" # Ubuntu 22.04 (example)
  instance_type = "t3.micro"
  key_name      = "my-key"

  vpc_security_group_ids = [aws_security_group.app_sg.id]

  user_data = <<-EOF
              #!/bin/bash
              apt update -y
              apt install -y docker.io
              systemctl start docker
              systemctl enable docker

              docker pull deamon2002/devops-engineering:backend-v2
              docker pull deamon2002/devops-engineering:frontend-v3

              docker run -d -p 5000:5000 deamon2002/devops-engineering:backend-v2
              docker run -d -p 3000:3000 deamon2002/devops-engineering:frontend-v3
              EOF

  tags = {
    Name = "devops-app-server"
  }
}


resource "aws_security_group" "app_sg" {
  name = "app-security-group"

  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 3000
    to_port     = 3000
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
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
}
