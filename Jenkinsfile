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

        stage('Deploy Locally') {
    steps {
        sh '''
            docker pull $IMAGE_BACKEND
            docker pull $IMAGE_FRONTEND

            docker rm -f backend || true
            docker rm -f frontend || true

            docker run -d --name backend -p 5000:5000 --restart always $IMAGE_BACKEND
            docker run -d --name frontend -p 3000:80 --restart always $IMAGE_FRONTEND
        '''
    }
}

    }
}
