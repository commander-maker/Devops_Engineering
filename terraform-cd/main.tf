# -------------------------------
# AMI and SSH key pair
# -------------------------------

data "aws_ami" "ubuntu" {
  most_recent = true
  owners      = ["099720109477"]

  filter {
    name   = "name"
    values = ["ubuntu/images/hvm-ssd/ubuntu-jammy-22.04-amd64-server-*"]
  }

  filter {
    name   = "virtualization-type"
    values = ["hvm"]
  }
}

resource "aws_key_pair" "app_key" {
  key_name   = var.key_name
  public_key = file(var.public_key_path)
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

  ingress {
    description = "Jenkins"
    from_port   = 8080
    to_port     = 8080
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
  ami           = data.aws_ami.ubuntu.id
  instance_type = "t3.micro"
  key_name      = aws_key_pair.app_key.key_name

  vpc_security_group_ids = [aws_security_group.app_sg.id]

  root_block_device {
    volume_size = 30
    volume_type = "gp3"
    encrypted   = true
  }

  user_data_replace_on_change = false


  # Install Docker, Jenkins, Terraform, and AWS CLI
  user_data = <<-EOF
              #!/bin/bash
              set -e
              
              # Update system
              apt update -y

              # Add swap space before memory-intensive package installations
              if ! swapon --show=NAME --noheadings | grep -q /swapfile; then
                if [ ! -f /swapfile ]; then
                  fallocate -l 4G /swapfile || dd if=/dev/zero of=/swapfile bs=1M count=4096
                fi
                chmod 600 /swapfile
                mkswap /swapfile
                swapon /swapfile
              fi
              grep -q '^/swapfile none swap sw 0 0$' /etc/fstab || echo '/swapfile none swap sw 0 0' >> /etc/fstab
              
              # Install Docker
              apt install -y docker.io
              systemctl start docker
              systemctl enable docker
              usermod -aG docker ubuntu
              
              # Install Java 21 (required by current Jenkins)
              apt install -y curl openjdk-21-jre
              
              # Install Jenkins
              mkdir -p /etc/apt/keyrings
              curl -fsSL https://pkg.jenkins.io/debian-stable/jenkins.io-2026.key | tee /etc/apt/keyrings/jenkins-keyring.asc > /dev/null
              echo "deb [signed-by=/etc/apt/keyrings/jenkins-keyring.asc] https://pkg.jenkins.io/debian-stable binary/" | tee /etc/apt/sources.list.d/jenkins.list
              apt update -y
              apt install -y jenkins
              systemctl start jenkins
              systemctl enable jenkins
              usermod -aG docker jenkins
              
              # Install AWS CLI
              apt install -y unzip
              curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
              unzip awscliv2.zip
              ./aws/install
              rm -rf aws awscliv2.zip
              
              # Install Terraform
              apt install -y gnupg software-properties-common wget
              wget -O- https://apt.releases.hashicorp.com/gpg | gpg --dearmor | tee /usr/share/keyrings/hashicorp-archive-keyring.gpg
              echo "deb [signed-by=/usr/share/keyrings/hashicorp-archive-keyring.gpg] https://apt.releases.hashicorp.com $(lsb_release -cs) main" | tee /etc/apt/sources.list.d/hashicorp.list
              apt update -y
              apt install -y terraform
              
              # Restart Jenkins to apply docker group
              systemctl restart jenkins
              EOF

  tags = {
    Name = "devops-app-server"
  }
}


