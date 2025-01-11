pipeline {
    agent any

    environment {
        DOCKER_REGISTRY = "your-dockerhub-username"
    }

    stages {
        stage('Clone Repository') {
            steps {
                git credentialsId: 'your-github-credentials-id', url: 'https://github.com/aminebenfraj/car-project-devops.git'
            }
        }

        stage('Build Backend Docker Image') {
            steps {
                dir('backend') {
                    sh 'docker build -t $DOCKER_REGISTRY/backend:latest .'
                }
            }
        }

        stage('Build Frontend Docker Image') {
            steps {
                dir('frontend') {
                    sh 'docker build -t $DOCKER_REGISTRY/frontend:latest .'
                }
            }
        }

        stage('Push Docker Images') {
            steps {
                script {
                    docker.withRegistry('', 'dockerhub-credentials-id') {
                        sh 'docker push $DOCKER_REGISTRY/backend:latest'
                        sh 'docker push $DOCKER_REGISTRY/frontend:latest'
                    }
                }
            }
        }

        stage('Deploy to Kubernetes') {
            steps {
                sh 'kubectl apply -f k8s/'
            }
        }
    }

    post {
        success {
            echo 'Pipeline completed successfully!'
        }
        failure {
            echo 'Pipeline failed!'
        }
    }
}
