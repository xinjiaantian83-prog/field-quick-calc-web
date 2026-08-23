#!/bin/zsh
export GOOGLE_APPLICATION_CREDENTIALS="$HOME/.config/gcloud/application_default_credentials.json"
export FIELD_QUICK_CALC_PROPERTY_ID="551037476"
PYTHON_BIN="$HOME/.config/gcloud/ga4-oauth-venv/bin/python"
SERVER="/Users/yasudashinya/Documents/New project/field-quick-calc-web/monitor/server.py"
if [[ ! -x "$PYTHON_BIN" ]]; then
  echo "GA4 Python environment was not found: $PYTHON_BIN"
  read -k 1 "?Press any key to close."
  exit 1
fi
exec "$PYTHON_BIN" "$SERVER" --lan
