pipeline {
    agent any

    environment {
        AWS_ACCESS_KEY_ID     = credentials('AWS_ACCESS_KEY_ID')
        AWS_SECRET_ACCESS_KEY = credentials('AWS_SECRET_ACCESS_KEY')
    }

    stages {

        stage('Clone Repository') {
            steps {
                git branch: 'main', url: 'https://github.com/commander-maker/Devops_Engineering.git'
            }
        }

        stage('Build Backend Image') {
            steps {
                sh 'docker build -t deamon2002/devops-engineering:backend-v2 ./Backend'
            }
        }

        stage('Build Frontend Image') {
            steps {
                sh 'docker build -t deamon2002/devops-engineering:frontend-v2 ./Frontend'
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
                      docker push deamon2002/devops-engineering:backend-v2
                      docker push deamon2002/devops-engineering:frontend-v2
                    '''
                }
            }
        }

        /* ================= CD PART STARTS HERE ================= */

        stage('terraform-cd Init') {
            steps {
                sh '''
                  cd terraform-cd
                  terraform init
                '''
            }
        }

        stage('terraform-cd Apply (Deploy to AWS)') {
            steps {
                sh '''
                  cd terraform-cd
                  terraform apply -auto-approve
                '''
            }
        }
    }
}
