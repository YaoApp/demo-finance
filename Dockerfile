#docker build --platform linux/amd64 --tag demo-project .
#docker run -d --restart unless-stopped --name demo-project -p 5099:5099 demo-project
FROM yaoapp/yao:0.10.2-amd64
ARG VERSION

WORKDIR /data

#COPY yao /usr/local/bin/yao cp /data/docker.env /data/.env && \
#RUN apk add git
RUN addgroup -S -g 1000 yao && adduser -S -G yao -u 999 yao
RUN mkdir -p /data/app && curl -fsSL "https://mirrors-1252011659.cos.ap-beijing.myqcloud.com/apps/yaoapp/demo-finance/docker/latest.zip" > /data/app/latest.zip && \
    unzip /data/app/latest.zip
RUN rm -rf /data/app/.git && \
    chown -R yao:yao /data && \
    chmod +x /data/init.sh && \
    chmod +x /usr/local/bin/yao && \
    cp /data/docker.env /data/.env && \
    mkdir -p /data/db

USER root
VOLUME [ "/data" ]
WORKDIR /data
EXPOSE 5099
CMD ["sh", "init.sh"]
#CMD ["/usr/local/bin/yao", "start"]
#CMD ["ping" ,"www.baidu.com"]
