required_plugins = ["vagrant-hostsupdater"]
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
    web.vm.provision "shell", path: "environment/provision.sh", privileged: false
    web.vm.network "private_network", ip: "192.168.10.100"
  end

  config.vm.define "db" do |db|
    db.vm.box = "ubuntu/xenial64"
    db.vm.hostname = "db"
    db.vm.box_url = "ubuntu/xenial64"
    db.vm.network "private_network", ip: "192.168.10.101"
  end

end
