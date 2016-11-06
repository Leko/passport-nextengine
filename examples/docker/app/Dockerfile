FROM mhart/alpine-node:6.3

RUN mkdir /app
WORKDIR /app
ADD ./package.json /app/package.json
ADD ./bower.json /app/bower.json
RUN npm i -g bower \
    && npm i \
    && bower i --allow-root
