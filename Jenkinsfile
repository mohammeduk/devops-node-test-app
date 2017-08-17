node('master'){
    cleanWs()
    checkout([$class: 'GitSCM', branches: [[name: '*/master']], doGenerateSubmoduleConfigurations: false, extensions: [], submoduleCfg: [], userRemoteConfigs: [[credentialsId: 'b61f7279-ec98-48ea-a6f3-baeabed4514a', url: 'https://github.com/mohammeduk/devops-node-test-app']]])

    stage('testing'){
        sshagent(['08ea6979-2a9c-4445-a8ce-d0cb8ee6da73']) {
            sh 'ssh -o "StrictHostKeyChecking=no" ubuntu@ec2-52-201-237-214.compute-1.amazonaws.com sudo rm -rf app'
            sh 'scp -r . ubuntu@ec2-52-201-237-214.compute-1.amazonaws.com:/home/ubuntu/app'

            sh 'knife zero bootstrap ubuntu@ec2-52-201-237-214.compute-1.amazonaws.com --ssh-user ubuntu --node-name production'
            sh 'knife zero converge "name:testing" --ssh-user ubuntu --override-runlist rails-server'

            sh '''ssh -o "StrictHostKeyChecking=no" ubuntu@ec2-52-201-237-214.compute-1.amazonaws.com << EOF
	            cd app
                // ./environment/provision.sh
                // berks vendor cookbooks
                // sudo chef-client --local-mode --runlist 'recipe[node-server]'

                // Setting the environment variable
                export DB_HOST=mongodb://34.228.27.237/test

                npm install
                npm test '''
        }
    }

    stage('deployent'){
        sshagent(['08ea6979-2a9c-4445-a8ce-d0cb8ee6da73']) {
            sh 'ssh -o "StrictHostKeyChecking=no" ubuntu@ec2-52-201-237-214.compute-1.amazonaws.com sudo rm -rf app'
            sh 'scp -r . ubuntu@ec2-52-201-237-214.compute-1.amazonaws.com:/home/ubuntu/app'

            sh 'knife zero bootstrap ubuntu@ec2-52-201-237-214.compute-1.amazonaws.com --ssh-user ubuntu --node-name production'
            sh 'knife zero converge "name:production" --ssh-user ubuntu --override-runlist rails-server'


            sh '''ssh -o "StrictHostKeyChecking=no" ubuntu@ec2-52-201-237-214.compute-1.amazonaws.com << EOF
	            cd app
                // ./environment/provision.sh
                // berks vendor cookbooks
                // sudo chef-client --local-mode --runlist 'recipe[node-server]'

                // Setting the environment variable
                export DB_HOST=mongodb://34.228.27.237/test

                pm2 kill
                pm2 start app.js '''
        }
            slackSend channel: '#devops', message: 'Inventory successfully deployed to production 🕺', token: '3RWyRcK34UHdDAycFtZsJT9T'
    }
}
