FROM node:16.16.0

RUN apt-get -y update && apt-get -y upgrade

ENV HOME=/app/
ENV PATH=$PATH:$HOME

COPY package.json $HOME
COPY . $HOME

RUN cd $HOME && yarn --silent --progress=false && yarn build

RUN cd $HOME && rm -rf ./node_modules && export NODE_ENV=production && yarn --silent --progress=false

WORKDIR $HOME

EXPOSE 3333

CMD ["yarn", "start"]