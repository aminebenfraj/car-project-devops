pipeline {
    agent any

    environment {
        DOCKER_IMAGE_BACKEND = "aminebenfraj/car-parking-backend"
        DOCKER_TAG_BACKEND = "latest"
        DOCKER_IMAGE_FRONTEND = "aminebenfraj/car-parking-frontend"
        DOCKER_TAG_FRONTEND = "latest"
        DOCKER_CREDENTIALS_ID = "docker-hub-credentials"
    }

    stages {
        stage('Build and Push Docker Images') {
            parallel {
                stage('Backend') {
                    stages {
                        stage('Build Backend Docker Image') {
                            steps {
                                sh "docker build -t ${DOCKER_IMAGE_BACKEND}:${DOCKER_TAG_BACKEND} ./backend"
                            }
                        }
                        stage('Push Backend Docker Image') {
                            steps {
                                withCredentials([usernamePassword(credentialsId: "${DOCKER_CREDENTIALS_ID}", passwordVariable: 'DOCKER_PASSWORD', usernameVariable: 'DOCKER_USERNAME')]) {
                                    sh """
                                        echo "$DOCKER_PASSWORD" | docker login -u "$DOCKER_USERNAME" --password-stdin
                                        docker push ${DOCKER_IMAGE_BACKEND}:${DOCKER_TAG_BACKEND}
                                    """
                                }
                            }
                        }
                    }
                }
                stage('Frontend') {
                    stages {
                        stage('Build Frontend Docker Image') {
                            steps {
                                sh "docker build -t ${DOCKER_IMAGE_FRONTEND}:${DOCKER_TAG_FRONTEND} ./frontend"
                            }
                        }
                        stage('Push Frontend Docker Image') {
                            steps {
                                withCredentials([usernamePassword(credentialsId: "${DOCKER_CREDENTIALS_ID}", passwordVariable: 'DOCKER_PASSWORD', usernameVariable: 'DOCKER_USERNAME')]) {
                                    sh """
                                        echo "$DOCKER_PASSWORD" | docker login -u "$DOCKER_USERNAME" --password-stdin
                                        docker push ${DOCKER_IMAGE_FRONTEND}:${DOCKER_TAG_FRONTEND}
                                    """
                                }
                            }
                        }
                    }
                }
            }
        }
    }

    post {
        success {
            echo "Pipeline completed successfully."
        }
        failure {
            echo "Pipeline failed. Check logs for details."
        }
        always {
            echo "Pipeline execution finished."
        }
    }
}
