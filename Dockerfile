FROM denoland/deno:1.17.3

EXPOSE 8000

USER deno

COPY deps.ts .
RUN deno cache deps.ts

ADD . .
RUN deno cache src/server.ts

CMD ["run", "--allow-net", "--allow-read", "src/server.ts"]