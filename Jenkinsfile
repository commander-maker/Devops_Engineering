pipeline {
    agent any

    

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
                sh 'docker build -t deamon2002/devops-engineering:frontend-v3 ./Frontend'
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
                      docker push deamon2002/devops-engineering:frontend-v3
                    '''
                }
            }
        }

        /* ================= CD PART STARTS HERE ================= */

        stage('Terraform Init') {
           steps {
              withEnv([
                  "AWS_ACCESS_KEY_ID=${env.AWS_ACCESS_KEY_ID}",
                  "AWS_SECRET_ACCESS_KEY=${env.AWS_SECRET_ACCESS_KEY}",
                  "AWS_DEFAULT_REGION=ap-south-1"
            ]) {
              sh '''
                  cd terraform-cd
                  terraform init
                '''
            }
           }
       } 

        stage('Terraform Apply') {
           steps {
              withEnv([
                 "AWS_ACCESS_KEY_ID=${env.AWS_ACCESS_KEY_ID}",
                 "AWS_SECRET_ACCESS_KEY=${env.AWS_SECRET_ACCESS_KEY}",
                 "AWS_DEFAULT_REGION=ap-south-1"
            ]) {
              sh '''
                 cd terraform-cd
                 terraform apply -auto-approve
               '''
            }
          }
     }

    }
}
