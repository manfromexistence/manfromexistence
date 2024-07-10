Setup
  $ . ${TESTDIR}/../../helpers/setup_integration_test.sh

Run test run
  $ ${TURBO} info --json | jq .config
  {
    "apiUrl": null,
    "loginUrl": null,
    "teamSlug": null,
    "teamId": null,
    "token": null,
    "signature": null,
    "preflight": null,
    "timeout": null,
    "enabled": null,
    "spacesId": null
  }

Run test run with api overloaded
  $ ${TURBO} info --json --api http://localhost:8000 | jq .config.apiUrl
  "http://localhost:8000"

Run test run with token overloaded
  $ ${TURBO} info --json --token 1234567890 | jq .config.token
  "1234567890"

Run test run with token overloaded from both TURBO_TOKEN and VERCEL_ARTIFACTS_TOKEN
  $ TURBO_TOKEN=turbo VERCEL_ARTIFACTS_TOKEN=vercel ${TURBO} info --json | jq .config.token
  "vercel"

Run test run with team overloaded
  $ ${TURBO} info --json --team vercel | jq .config.teamSlug
  "vercel"

Run test run with team overloaded from both env and flag (flag should take precedence)
  $ TURBO_TEAM=vercel ${TURBO} info --json --team turbo | jq .config.teamSlug
  "turbo"

Run test run with remote cache timeout env variable set
  $ TURBO_REMOTE_CACHE_TIMEOUT=123 ${TURBO} info --json | jq .config.timeout
  123

Run test run with remote cache timeout from both env and flag (flag should take precedence)
  $ TURBO_REMOTE_CACHE_TIMEOUT=123 ${TURBO} info --json --remote-cache-timeout 456 | jq .config.timeout
  456

Use our custom turbo config with an invalid env var
  $ . ${TESTDIR}/../../helpers/replace_turbo_json.sh $(pwd) "invalid-env-var.json"

Run build with invalid env var
  $ ${TURBO} build
  invalid_env_prefix (https://turbo.build/messages/invalid-env-prefix)
  
    x Environment variables should not be prefixed with "$"
     ,-[turbo.json:6:1]
   6 |     "build": {
   7 |       "env": ["NODE_ENV", "$FOOBAR"],
     :                           ^^^^|^^^^
     :                               `-- variable with invalid prefix declared here
   8 |       "outputs": []
     `----
  
  [1]

