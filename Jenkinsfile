pipeline {
    agent any
    
     tools {
        nodejs 'NodeJS' // The name you configured in Global Tool Configuration
    }

    stages {
        stage('Checkout') {
            steps {
                git(
                    url: 'https://github.com/mithunmunsi/node-firm.git', 
                    branch: 'main', // or 'master', depending on your repository
                  
                )
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
