#!/bin/sh

result=$(curl -sI https://en.wikipedia.org/wiki/Special:Random | tr -d '\r' | sed -En 's/^location: (.*)/\1/p')
curl -X POST http://todo-back-svc:3001/todos -H "Content-Type: application/json" -d "{\"text\":\"Read $result\"}"