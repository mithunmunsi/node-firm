pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                git 'https://github.com/mithunmunsi/node-firm.git '
            }
        }

        stage('Build') {
            steps {
                sh 'npm install'
            }
        }

        stage('Test') {
            steps {
                sh 'npm test'
            }
        }

        stage('Deploy') {
            steps {
                sh 'npm run deploy'
            }
        }
    }

    post {
        always {
            echo 'Cleaning up...'
            deleteDir()
        }
        success {
            echo 'Pipeline succeeded!'
        }
        failure {
            echo 'Pipeline failed!'
        }
    }
}
