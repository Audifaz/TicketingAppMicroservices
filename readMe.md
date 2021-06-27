Since the application runs in a VM with Ubuntu 20.04, it is needed to write the following command in the terminal of this archive.

$ eval $(minikube docker-env)

Before Skaffold or Kubectl is run, it is needed to run 

$ minikube start

It is important to have an account in Docker and also installed in the enviroment Kubernetes and Docker.

To run the project, write the following command in the terminal

$ skaffold dev

