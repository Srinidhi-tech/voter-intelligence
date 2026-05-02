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
    --project $PROJECT_ID

# Build and Deploy
echo "📦 Building and deploying to Cloud Run..."
gcloud run deploy $SERVICE_NAME \
    --source . \
    --project $PROJECT_ID \
    --region $REGION \
    --platform managed \
    --allow-unauthenticated \
    --set-env-vars NODE_ENV=production,GOOGLE_CLOUD_PROJECT=$PROJECT_ID

echo "✅ Deployment Complete!"
echo "📍 Service URL: $(gcloud run services describe $SERVICE_NAME --platform managed --region $REGION --format='value(status.url)')"
