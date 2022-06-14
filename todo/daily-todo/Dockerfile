FROM alpine:3.14

WORKDIR /usr/src/app

COPY ./script.sh .

RUN apk update --no-cache && \
    apk add curl sed && \
    adduser -S appuser && \
    chown appuser ./script.sh

USER appuser

ENTRYPOINT ["./script.sh"]