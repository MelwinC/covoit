pipeline {
    agent any

    tools {
        nodejs 'node23'
    }

    environment {
        GITHUB_USER = 'melwinc'
        GITHUB_REPO = 'covoit'
        REPO_URL    = "https://github.com/${GITHUB_USER}/${GITHUB_REPO}.git"
        IMAGE_NAME  = "${GITHUB_REPO}"
        REGISTRY    = "ghcr.io/${GITHUB_USER}/${IMAGE_NAME}"
        TAG         = "j-version-1.0.${env.BUILD_ID}"
    }

    options {
        timestamps()
    }

    stages {
        stage('Checkout') {
            steps {
                echo "Checkout repository ${REPO_URL}"
                checkout([$class: 'GitSCM',
                    branches: [[name: '*/jenkins']],
                    doGenerateSubmoduleConfigurations: false,
                    extensions: [],
                    userRemoteConfigs: [[
                        url: "${REPO_URL}",
                        credentialsId: 'github-token'
                    ]]
                ])
            }
        }

        stage('Verify pnpm installation') {
            steps {
                sh 'node -v'
                sh 'pnpm -v'
            }
        }

        stage('Install dependencies - Client') {
            steps {
                dir('client') {
                    echo "Installing client dependencies via pnpm"
                    sh 'pnpm install --frozen-lockfile'
                }
            }
        }

        stage('Install dependencies - Server') {
            steps {
                dir('server') {
                    echo "Installing server dependencies via pnpm"
                    sh 'pnpm install --frozen-lockfile'
                }
            }
        }

        stage('Run tests') {
            steps {
                script {
                    echo "Running tests"
                    sh 'cd client && pnpm test'
                    sh 'cd server && pnpm test'
                }
            }
        }

        stage('Build project') {
            steps {
                echo "Building project"
                dir('client') {
                    sh 'pnpm build'
                }
                dir('server') {
                    sh 'pnpm build'
                }
            }
        }
        stage('Build Docker image') {
            steps {
                script {
                    echo "Docker build ${REGISTRY}:${BUILD_ID}"
                    sh """
                        # Build client image
                        docker build -t ${REGISTRY}-client:${BUILD_ID} -f client/Dockerfile client
                        docker build -t ${REGISTRY}-server:${BUILD_ID} -f server/Dockerfile server
                        docker tag ${REGISTRY}-client:${BUILD_ID} ${REGISTRY}-client:latest
                        docker tag ${REGISTRY}-server:${BUILD_ID} ${REGISTRY}-server:latest
                    """
                }
            }
        }
        stage('Push image to GitHub Packages') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'github-token', usernameVariable: 'GIT_USER', passwordVariable: 'GIT_TOKEN')]) {
                    script {
                        echo "Login to GitHub Container Registry"
                        sh """
                            echo "${GIT_TOKEN}" | docker login ghcr.io -u ${GIT_USER} --password-stdin
                            docker push ${REGISTRY}-client:${BUILD_ID} 
                            docker push ${REGISTRY}-server:${BUILD_ID} 
                            docker push ${REGISTRY}-client:latest
                            docker push ${REGISTRY}-server:latest
                        """
                    }
                }
            }
        }
        stage('Tag repository') {
            steps {
                withCredentials([gitUsernamePassword(credentialsId: 'github-token', gitToolName: 'Default')]) {
                    script {
                        echo "Creating git tag ${TAG}"
                        sh """
                            git config user.email "jenkins@${GITHUB_REPO}.local"
                            git config user.name "jenkins"
                            git tag -a ${TAG} -m "Tag by Jenkins ${TAG}"
                            git push origin ${TAG}
                        """
                    }
                }
            }
        }
    }
}
