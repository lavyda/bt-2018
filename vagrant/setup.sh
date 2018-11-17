#!/bin/bash

if [ ! -f ~/runonce ] #here the check is on the root home directory
then
	cd /home/vagrant
	echo "Installing node.js..."
	curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash -
	sudo apt-get install -y nodejs
	echo "Installing yarn..."
	curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
	echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list
	sudo apt-get update && sudo apt-get install yarn
	echo "Installing Lynis..."
	sudo apt-key adv --keyserver keyserver.ubuntu.com --recv-keys C80E383C3DE9F082E01391A0366C67DE91CA5D5F
	echo "deb https://packages.cisofy.com/community/lynis/deb/ trusty main" | sudo tee /etc/apt/sources.list.d/cisofy-lynis.list
	sudo apt-get update
	sudo apt-get install lynis

	echo ':::: setting up liquidprompt to vagrant machine ::::'
	echo "Installing liquidprompt..."
	cd /home/vagrant/
	git clone https://github.com/nojhan/liquidprompt.git
	source liquidprompt/liquidprompt
	echo "Setting up liquidprompt to the .bashrc folder"
	echo '# Only load Liquid Prompt in interactive shells, not from a script or from scp'  >> /home/vagrant/.bashrc
	echo '[[ $- = *i* ]] && source /home/vagrant/liquidprompt/liquidprompt' >> /home/vagrant/.bashrc

	touch ~/runonce	#avoid script to be provisioned more than once
	else
		echo "::: nvm already provisioned :::"
		nvm node --version
	fi	