pipeline {
    agent any

    environment {
        IMAGE_BACKEND  = "deamon2002/devops-engineering:backend-v2"
        IMAGE_FRONTEND = "deamon2002/devops-engineering:frontend-v3"
        TF_DIR = "terraform-cd"
    }

    stages {

        stage('Clone Repository') {
            steps {
                git branch: 'main', url: 'https://github.com/commander-maker/Devops_Engineering.git'
            }
        }

        stage('Build Backend Image') {
            steps {
                sh 'docker build -t $IMAGE_BACKEND ./Backend'
            }
        }

        stage('Build Frontend Image') {
            steps {
                sh 'docker build -t $IMAGE_FRONTEND ./Frontend'
            }
        }

        stage('Push to Docker Hub') {
            steps {
                withCredentials([usernamePassword(
                    credentialsId: 'dockerhub',
                    usernameVariable: 'DOCKER_USER',
                    passwordVariable: 'DOCKER_PASS'
                )]) {
                    sh '''
                        echo $DOCKER_PASS | docker login -u $DOCKER_USER --password-stdin
                        docker push $IMAGE_BACKEND
                        docker push $IMAGE_FRONTEND
                    '''
                }
            }
        }



        stage('Get EC2 Public IP') {
            steps {
                script {
                    env.PUBLIC_IP = sh(
                        script: "cd ${TF_DIR} && terraform output -raw public_ip",
                        returnStdout: true
                    ).trim()
                }
            }
        }

        stage('Deploy with Docker Compose') {
            steps {
                sh '''
                    # Create .env file for backend
                    cat > .env << EOF
MONGO_URI=mongodb://mongo:27017/devops-db
PORT=5000
EOF

                    # Pull latest images
                    docker-compose pull

                    # Stop and remove old containers
                    docker-compose down

                    # Start all services (MongoDB, Backend, Frontend)
                    docker-compose up -d

                    # Show running containers
                    docker-compose ps
                '''
            }
        }

    }
}
