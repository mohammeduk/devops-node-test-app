required_plugins = ["vagrant-hostsupdater", "vagrant-berkshelf"]
required_plugins.each do |plugin|
  exec "vagrant plugin install #{plugin}" unless Vagrant.has_plugin? plugin
end

Vagrant.configure("2") do |config|
  config.vm.define "web" do |web|
    web.vm.box = "ubuntu/xenial64"
    web.vm.hostname = "web"
    web.vm.box_url = "ubuntu/xenial64"

    web.vm.synced_folder ".", "/home/ubuntu/app"
    web.hostsupdater.aliases = ["development.local"]
    web.vm.provision "chef_solo" do |chef|
      chef.cookbooks_path = ['cookbooks']
      chef.run_list = ['recipe[node-server::default]']
    end
    # web.vm.provision "shell", path: "environment/provision.sh", privileged: false
    web.vm.provision "shell" , inline: "echo 'export DB_HOST=mongodb://192.168.10.101/test' >> .bash_profile"
    web.vm.network "private_network", ip: "192.168.10.100"
  end

  config.vm.define "db" do |db|
    db.vm.box = "ubuntu/xenial64"
    db.vm.hostname = "db"
    db.vm.synced_folder "./environment", "/home/ubuntu/app/environment"
    db.vm.provision "chef_solo" do |chef|
      chef.cookbooks_path = ['cookbooks']
      chef.run_list = ['recipe[mongodb-server::default]']
    end
    # db.vm.provision "shell", path: "environment/provision_db.sh", privileged: false
    db.vm.network "private_network", ip: "192.168.10.101"
  end

end
