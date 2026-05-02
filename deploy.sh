#!/bin/bash

# Configuration
PROJECT_ID="erudite-skill-494516-g8"
SERVICE_NAME="election-edu-app"
REGION="us-central1"

echo "🚀 Starting Deployment for $SERVICE_NAME..."

# Ensure APIs are enabled
echo "🔗 Enabling required Google Cloud APIs..."
gcloud services enable run.googleapis.com \
    firestore.googleapis.com \
    aiplatform.googleapis.com \
    secretmanager.googleapis.com \
    recaptchaenterprise.googleapis.com \
    --project $PROJECT_ID

# Initialize Firestore if needed
gcloud firestore databases create --location=$REGION --project $PROJECT_ID --quiet || true

# Grant permissions to default service account
PROJECT_NUMBER=$(gcloud projects describe $PROJECT_ID --format='value(projectNumber)')
SERVICE_ACCOUNT="$PROJECT_NUMBER-compute@developer.gserviceaccount.com"

echo "🔐 Granting IAM roles to $SERVICE_ACCOUNT..."
gcloud projects add-iam-policy-binding $PROJECT_ID --member="serviceAccount:$SERVICE_ACCOUNT" --role="roles/datastore.user" --quiet
gcloud projects add-iam-policy-binding $PROJECT_ID --member="serviceAccount:$SERVICE_ACCOUNT" --role="roles/aiplatform.user" --quiet
gcloud projects add-iam-policy-binding $PROJECT_ID --member="serviceAccount:$SERVICE_ACCOUNT" --role="roles/recaptchaenterprise.agent" --quiet

# Build and Deploy
echo "📦 Building and deploying to Cloud Run..."
gcloud run deploy $SERVICE_NAME \
    --source . \
    --project $PROJECT_ID \
    --region $REGION \
    --platform managed \
    --allow-unauthenticated \
    --set-env-vars NODE_ENV=production,GOOGLE_CLOUD_PROJECT=$PROJECT_ID \
    --clear-base-image \
    --memory 2Gi \
    --cpu 1

echo "✅ Deployment Complete!"
echo "📍 Service URL: $(gcloud run services describe $SERVICE_NAME --platform managed --region $REGION --format='value(status.url)')"
