FROM node:6.9.1

RUN apt-get update -yqq

RUN apt-get -yqq install python-pip

RUN pip install -q awscli

# This is so we can easily install new versions of Serverless without having to
# kill the whole cache
RUN echo cachebust1

RUN npm install --silent -g serverless

WORKDIR /app
