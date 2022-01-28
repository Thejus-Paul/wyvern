FROM docker.io/denoland/deno:alpine@sha256:be9fcfbe78a67ff39a992324707015ea567c65f81deb0e3e155f26a757c0cd1d

EXPOSE 8100

USER deno

COPY deps.ts .
RUN deno cache deps.ts

ADD . .
RUN deno cache src/server.ts

CMD ["run", "--allow-net", "--allow-read", "src/server.ts"]