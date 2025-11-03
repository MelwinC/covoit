pipeline {
    agent any

    environment {
        REPO_URL = 'https://github.com/MelwinC/covoit.git'
    }

    stages {
        stage('Hello') {
            steps {
                echo 'Hello World'
            }
        }

        stage('Checkout') {
            steps {
                checkout([$class: 'GitSCM',
                    branches: [[name: '*/main']], // ou '*/master' selon ton repo
                    doGenerateSubmoduleConfigurations: false,
                    extensions: [],
                    userRemoteConfigs: [[
                        url: "${REPO_URL}",
                        credentialsId: 'github-credentials'
                    ]]
                ])
            }
        }

        stage('Tag') {
            steps {
                withCredentials([gitUsernamePassword(credentialsId: 'github-credentials', gitToolName: 'Default')]) {
                    script {
                        def versionTag = "j-version-1.0${env.BUILD_ID}"
                        sh """
                            git config user.name "jenkins"
                            git config user.email "jenkins@localhost"
                            git tag -a ${versionTag} -m "Tag by Jenkins"
                            git push origin ${versionTag}
                        """
                    }
                }
            }
        }
    }
}
