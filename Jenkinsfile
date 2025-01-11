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
        stage('Build Backend Docker Image') {
            steps {
                script {
                    echo "Building Backend Docker image..."
                    sh "docker build -t ${DOCKER_IMAGE_BACKEND}:${DOCKER_TAG_BACKEND} ./backend"
                }
            }
        }

        stage('Push Backend Docker Image') {
            steps {
                script {
                    echo "Pushing Backend Docker image to Docker Hub..."
                    withCredentials([usernamePassword(credentialsId: "${DOCKER_CREDENTIALS_ID}", passwordVariable: 'DOCKER_PASSWORD', usernameVariable: 'DOCKER_USERNAME')]) {
                        sh """
                            echo "$DOCKER_PASSWORD" | docker login -u "$DOCKER_USERNAME" --password-stdin
                            docker push ${DOCKER_IMAGE_BACKEND}:${DOCKER_TAG_BACKEND}
                        """
                    }
                }
            }
        }

        stage('Build Frontend Docker Image') {
            steps {
                script {
                    echo "Building Frontend Docker image..."
                    sh "docker build -t ${DOCKER_IMAGE_FRONTEND}:${DOCKER_TAG_FRONTEND} ./frontend"
                }
            }
        }

        stage('Push Frontend Docker Image') {
            steps {
                script {
                    echo "Pushing Frontend Docker image to Docker Hub..."
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

    post {
        always {
            echo "Pipeline completed."
        }
    }
}
