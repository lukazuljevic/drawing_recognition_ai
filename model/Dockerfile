FROM python:3.11-slim AS base

FROM node:18.1.0-alpine AS builder
WORKDIR /app

RUN yarn global add turbo
COPY . .
RUN turbo prune --scope=model --docker

FROM base AS apiinstaller
WORKDIR /app

COPY --from=builder /app/out/full/model/requirements.txt ./requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

EXPOSE 8000
RUN apk add --no-cache curl

COPY --from=builder /app/out/full/ .  
COPY turbo.json turbo.json

COPY frontend/dist/ ./frontend/dist/

WORKDIR /app/model

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]


