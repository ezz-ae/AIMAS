#!/usr/bin/env bash
set -euo pipefail

SERVICE="${1:-aimas-api}"
REGION="${2:-us-central1}"
PROJECT="${3:-$(gcloud config get-value project)}"

if [[ -z "${PROJECT}" ]]; then
  echo "No GCP project set. Run: gcloud config set project <PROJECT_ID>"
  exit 1
fi

echo "Project: ${PROJECT}"
echo "Service: ${SERVICE}"
echo "Region:  ${REGION}"

IMAGE="gcr.io/${PROJECT}/${SERVICE}:$(git rev-parse --short HEAD)"

echo "Building: ${IMAGE}"
docker build -f BUILDKIT/cloudrun/Dockerfile -t "${IMAGE}" .

echo "Pushing: ${IMAGE}"
docker push "${IMAGE}"

echo "Deploying Cloud Run…"
gcloud run deploy "${SERVICE}" \
  --image "${IMAGE}" \
  --region "${REGION}" \
  --platform managed \
  --allow-unauthenticated \
  --set-env-vars "AIMAS_PROTOCOL_VERSION=$(git describe --tags --always),AIMAS_COMMIT_SHA=$(git rev-parse --short HEAD)" \

echo "Done."
