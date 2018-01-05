FROM ubuntu:xenial
 
RUN apt-get update -y && \
    apt-get install wget git -y && \
    wget -P /tmp/ https://deb.nodesource.com/setup_9.x && \
    bash /tmp/setup_9.x && \
    apt-get install nodejs -y && \
  	rm -rf /var/lib/apt/lists/* && \
	  npm cache clean --force && \
    mkdir /code/
ADD . /code/
RUN cd /code/ && npm install
CMD ["npm", "run", "dev"]
