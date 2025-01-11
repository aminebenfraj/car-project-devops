pipeline {
    agent any

    environment {
        DOCKER_REGISTRY = "your-dockerhub-username"
    }

    stages {
        stage('Clone Repository') {
            steps {
                git credentialsId: 'github-credentials', url: 'https://github.com/aminebenfraj/car-project-devops.git'
            }
        }

        stage('Build Docker Images') {
            parallel {
                stage('Backend') {
                    steps {
                        dir('backend') {
                            sh 'docker build -t $DOCKER_REGISTRY/backend:latest .'
                            sh 'docker push $DOCKER_REGISTRY/backend:latest'
                        }
                    }
                }
                stage('Frontend') {
                    steps {
                        dir('frontend') {
                            sh 'docker build -t $DOCKER_REGISTRY/frontend:latest .'
                            sh 'docker push $DOCKER_REGISTRY/frontend:latest'
                        }
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
            echo 'Deployment successful!'
        }
        failure {
            echo 'Deployment failed!'
        }
    }
}
