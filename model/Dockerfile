FROM python:3.11-slim as base

FROM base as builder
WORKDIR /app

RUN yarn global add turbo
COPY . .
RUN turbo prune --scope=model --docker

FROM base as apiInstaller
WORKDIR /app

COPY --from=builder /app/out/full/model/requirements.txt ./requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

COPY --from=builder /app/out/full/ .  
COPY turbo.json turbo.json

FROM base as final
WORKDIR /app

COPY --from=apiInstaller /app .
COPY /frontend/dist ./frontend/dist

EXPOSE 8000
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
