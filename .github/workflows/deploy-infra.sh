#!/usr/bin/env bash
set -euo pipefail

DOMAIN_NAME="vedantix.nl"
BUCKET_NAME="vedantix.nl-bucket"
ZONE_NAME="vedantix.nl."
CERT_STACK_NAME="vedantix-cert"
SITE_STACK_NAME="vedantix-site"

echo "==> Step 1: create/find Route53 hosted zone"

HOSTED_ZONE_ID=$(aws route53 list-hosted-zones-by-name \
  --dns-name "$ZONE_NAME" \
  --query "HostedZones[?Name=='$ZONE_NAME'] | [0].Id" \
  --output text | sed 's|/hostedzone/||')

if [ "$HOSTED_ZONE_ID" = "None" ] || [ -z "$HOSTED_ZONE_ID" ]; then
  HOSTED_ZONE_ID=$(aws route53 create-hosted-zone \
    --name "$DOMAIN_NAME" \
    --caller-reference "vedantix-$(date +%s)" \
    --query "HostedZone.Id" \
    --output text | sed 's|/hostedzone/||')
fi

echo "HOSTED_ZONE_ID=$HOSTED_ZONE_ID"

echo "==> Step 2: deploy ACM certificate stack in us-east-1"

aws cloudformation deploy \
  --region us-east-1 \
  --stack-name "$CERT_STACK_NAME" \
  --template-file infra/01-cert-stack.yml \
  --parameter-overrides \
    DomainName="$DOMAIN_NAME" \
    HostedZoneId="$HOSTED_ZONE_ID"

CERT_ARN=$(aws cloudformation describe-stacks \
  --region us-east-1 \
  --stack-name "$CERT_STACK_NAME" \
  --query "Stacks[0].Outputs[?OutputKey=='CertificateArn'].OutputValue" \
  --output text)

echo "CERT_ARN=$CERT_ARN"

echo "==> Step 3: deploy site stack"

aws cloudformation deploy \
  --region eu-west-1 \
  --stack-name "$SITE_STACK_NAME" \
  --template-file infra/02-site-stack.yml \
  --parameter-overrides \
    DomainName="$DOMAIN_NAME" \
    HostedZoneId="$HOSTED_ZONE_ID" \
    CertificateArn="$CERT_ARN" \
    BucketName="$BUCKET_NAME"

echo "==> Step 4: fetch outputs"

DISTRIBUTION_ID=$(aws cloudformation describe-stacks \
  --region eu-west-1 \
  --stack-name "$SITE_STACK_NAME" \
  --query "Stacks[0].Outputs[?OutputKey=='DistributionId'].OutputValue" \
  --output text)

DISTRIBUTION_DOMAIN=$(aws cloudformation describe-stacks \
  --region eu-west-1 \
  --stack-name "$SITE_STACK_NAME" \
  --query "Stacks[0].Outputs[?OutputKey=='DistributionDomainName'].OutputValue" \
  --output text)

echo ""
echo "====== OUTPUTS ======"
echo "HOSTED_ZONE_ID=$HOSTED_ZONE_ID"
echo "CERT_ARN=$CERT_ARN"
echo "S3_BUCKET=$BUCKET_NAME"
echo "CLOUDFRONT_DISTRIBUTION_ID=$DISTRIBUTION_ID"
echo "CLOUDFRONT_DOMAIN=$DISTRIBUTION_DOMAIN"
echo ""
echo "Update IONOS nameservers to the Route53 hosted zone NS records."
echo "Then wait for DNS propagation."