pipeline {
    agent any

    environment {
        DOCKER_IMAGE = "your-dockerhub-username/your-repo-name" // Replace with your Docker Hub repo
        DOCKER_TAG = "latest"
        TRIVY_REPORT = "trivy-report.txt"
        DOCKER_CREDENTIALS_ID = "docker-hub-credentials" // Jenkins credentials ID
    }

    stages {
        stage('Build Docker Image') {
            steps {
                script {
                    echo "Building Docker image..."
                    sh "docker build -t ${DOCKER_IMAGE}:${DOCKER_TAG} ."
                }
            }
        }

        stage('Scan for Vulnerabilities') {
            steps {
                script {
                    echo "Scanning Docker image for vulnerabilities..."
                    sh "trivy image --exit-code 1 --severity HIGH,CRITICAL --output ${TRIVY_REPORT} ${DOCKER_IMAGE}:${DOCKER_TAG}"
                }
            }
        }

        stage('Push Docker Image') {
            when {
                expression {
                    fileExists(TRIVY_REPORT) && readFile(TRIVY_REPORT).trim().length() == 0
                }
            }
            steps {
                script {
                    echo "Pushing Docker image to Docker Hub..."
                    withCredentials([usernamePassword(credentialsId: "${DOCKER_CREDENTIALS_ID}", passwordVariable: 'DOCKER_PASSWORD', usernameVariable: 'DOCKER_USERNAME')]) {
                        sh """
                            echo "$DOCKER_PASSWORD" | docker login -u "$DOCKER_USERNAME" --password-stdin
                            docker push ${DOCKER_IMAGE}:${DOCKER_TAG}
                        """
                    }
                }
            }
        }
    }

    post {
        always {
            echo "Pipeline completed."
            archiveArtifacts artifacts: "${TRIVY_REPORT}"
        }
    }
}
