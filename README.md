# FinancialTrackerApp

app_name: FinancialTrackerApp
environment: production

frontend:
  framework: React.js
  build_command: npm run build
  deploy_command: npm run start
  entry_file: build/index.html
  assets_directory: build/
  port: 3000
  public_path: /
  environment_variables:
    REACT_APP_API_BASE_URL: https://api.taxillary.com
    REACT_APP_STRAPI_BASE_URL: https://strapi.taxillary.com

backend:
  framework: Strapi Headless CMS
  build_command: npm run build
  deploy_command: npm run start
  entry_file: server.js
  port: 1337
  environment_variables:
    DATABASE_HOST: localhost
    DATABASE_PORT: 5432
    DATABASE_NAME: financial_tracker
    DATABASE_USER: admin
    DATABASE_PASSWORD: securepassword123
    STRAPI_API_TOKEN: your_strapi_token_here
    NODE_ENV: production

routes:
  - path: /
    destination: frontend
  - path: /api/*
    destination: backend

caching:
  static_files:
    enabled: true
    max_age: 31536000
  api_responses:
    enabled: true
    max_age: 3600

security:
  cors:
    enabled: true
    allowed_origins:
      - https://www.taxillary.com
      - https://admin.taxillary.com
  content_security_policy:
    default_src:
      - 'self'
    script_src:
      - 'self'
      - 'https://cdn.jsdelivr.net'
    style_src:
      - 'self'
      - 'https://fonts.googleapis.com'
    img_src:
      - 'self'
      - 'data:'
    font_src:
      - 'self'
      - 'https://fonts.gstatic.com'

scaling:
  frontend:
    instances: 3
    auto_scaling: enabled
  backend:
    instances: 2
    auto_scaling: enabled

monitoring:
  health_checks:
    enabled: true
    frequency: 1m
    endpoints:
      - url: /
        type: GET
        expected_status: 200
      - url: /api/health
        type: GET
        expected_status: 200
  alerts:
    enabled: true
    email: admin@taxillary.com
    thresholds:
      - condition: response_time > 500ms
        action: notify
      - condition: error_rate > 5%
        action: scale_up

logs:
  storage: enabled
  retention: 30d
  format: JSON

notifications:
  deploy: enabled
  email: dev-team@taxillary.com
