Setup
  $ . ${TESTDIR}/../../helpers/setup.sh

Make sure exit code is 2 when no args are passed
  $ ${TURBO}
  The build system that makes ship happen
  
  Usage: turbo(\.exe)? \[OPTIONS\] \[COMMAND\] (re)
  
  Commands:
    bin         Get the path to the Turbo binary
    completion  Generate the autocompletion script for the specified shell
    daemon      Runs the Turborepo background daemon
    generate    Generate a new app / package
    telemetry   Enable or disable anonymous telemetry
    scan        Turbo your monorepo by running a number of 'repo lints' to identify common issues, suggest fixes, and improve performance
    link        Link your local directory to a Vercel organization and enable remote caching
    login       Login to your Vercel account
    logout      Logout to your Vercel account
    prune       Prepare a subset of your monorepo
    run         Run tasks across projects in your monorepo
    unlink      Unlink the current directory from your Vercel organization and disable Remote Caching
  
  Options:
        --version                         
        --skip-infer                      Skip any attempts to infer which version of Turbo the project is configured to use
        --no-update-notifier              Disable the turbo update notification
        --api <API>                       Override the endpoint for API calls
        --color                           Force color usage in the terminal
        --cpuprofile <CPU_PROFILE>        Specify a file to save a cpu profile
        --cwd <CWD>                       The directory in which to run turbo
        --heap <HEAP>                     Specify a file to save a pprof heap profile
        --login <LOGIN>                   Override the login endpoint
        --no-color                        Suppress color usage in the terminal
        --preflight                       When enabled, turbo will precede HTTP requests with an OPTIONS request for authorization
        --remote-cache-timeout <TIMEOUT>  Set a timeout for all HTTP requests
        --team <TEAM>                     Set the team slug for API calls
        --token <TOKEN>                   Set the auth token for API calls
        --trace <TRACE>                   Specify a file to save a pprof trace
        --verbosity <COUNT>               Verbosity level
    -h, --help                            Print help
  
  Run Arguments:
        --cache-dir <CACHE_DIR>
            Override the filesystem cache directory
        --cache-workers <CACHE_WORKERS>
            Set the number of concurrent cache operations (default 10) [default: 10]
        --concurrency <CONCURRENCY>
            Limit the concurrency of task execution. Use 1 for serial (i.e. one-at-a-time) execution
        --continue
            Continue execution even if a task exits with an error or non-zero exit code. The default behavior is to bail
        --dry-run [<DRY_RUN>]
            [possible values: text, json]
        --single-package
            Run turbo in single-package mode
        --force [<FORCE>]
            Ignore the existing cache (to force execution) [env: TURBO_FORCE=] [possible values: true, false]
        --framework-inference [<BOOL>]
            Specify whether or not to do framework inference for tasks [default: true] [possible values: true, false]
        --global-deps <GLOBAL_DEPS>
            Specify glob of global filesystem dependencies to be hashed. Useful for .env and files
        --graph [<GRAPH>]
            Generate a graph of the task execution and output to a file when a filename is specified (.svg, .png, .jpg, .pdf, .json, .html, .mermaid, .dot). Outputs dot graph to stdout when if no filename is provided
        --env-mode [<ENV_MODE>]
            Environment variable mode. Use "loose" to pass the entire existing environment. Use "strict" to use an allowlist specified in turbo.json. Use "infer" to defer to existence of "passThroughEnv" or "globalPassThroughEnv" in turbo.json. (default infer) [default: infer] [possible values: infer, loose, strict]
    -F, --filter <FILTER>
            Use the given selector to specify package(s) to act as entry points. The syntax mirrors pnpm's syntax, and additional documentation and examples can be found in turbo's documentation https://turbo.build/repo/docs/reference/command-line-reference/run#--filter
        --scope <SCOPE>
            DEPRECATED: Specify package(s) to act as entry points for task execution. Supports globs
        --ignore <IGNORE>
            Files to ignore when calculating changed files from '--filter'. Supports globs
        --since <SINCE>
            DEPRECATED: Limit/Set scope to changed packages since a mergebase. This uses the git diff ${target_branch}... mechanism to identify which packages have changed
        --include-dependencies
            DEPRECATED: Include the dependencies of tasks in execution
        --no-deps
            DEPRECATED: Exclude dependent task consumers from execution
        --no-cache
            Avoid saving task results to the cache. Useful for development/watch tasks
        --[no-]daemon
            Force turbo to either use or not use the local daemon. If unset turbo will use the default detection logic
        --output-logs <OUTPUT_LOGS>
            Set type of process output logging. Use "full" to show all output. Use "hash-only" to show only turbo-computed task hashes. Use "new-only" to show only new output with only hashes for cached tasks. Use "none" to hide process output. (default full) [possible values: full, none, hash-only, new-only, errors-only]
        --log-order <LOG_ORDER>
            Set type of task output order. Use "stream" to show output as soon as it is available. Use "grouped" to show output when a command has finished execution. Use "auto" to let turbo decide based on its own heuristics. (default auto) [env: TURBO_LOG_ORDER=] [default: auto] [possible values: auto, stream, grouped]
        --only
            Only executes the tasks specified, does not execute parent tasks
        --parallel
            Execute all tasks in parallel
        --profile <PROFILE>
            File to write turbo's performance profile output into. You can load the file up in chrome://tracing to see which parts of your build were slow
        --anon-profile <ANON_PROFILE>
            File to write turbo's performance profile output into. All identifying data omitted from the profile
        --remote-only [<BOOL>]
            Ignore the local filesystem cache for all tasks. Only allow reading and caching artifacts using the remote cache [env: TURBO_REMOTE_ONLY=] [default: false] [possible values: true, false]
        --remote-cache-read-only [<BOOL>]
            Treat remote cache as read only [env: TURBO_REMOTE_CACHE_READ_ONLY=] [default: false] [possible values: true, false]
        --summarize [<SUMMARIZE>]
            Generate a summary of the turbo run [env: TURBO_RUN_SUMMARY=] [possible values: true, false]
        --log-prefix <LOG_PREFIX>
            Use "none" to remove prefixes from task logs. Use "task" to get task id prefixing. Use "auto" to let turbo decide how to prefix the logs based on the execution environment. In most cases this will be the same as "task". Note that tasks running in parallel interleave their logs, so removing prefixes can make it difficult to associate logs with tasks. Use --log-order=grouped to prevent interleaving. (default auto) [default: auto] [possible values: auto, none, task]
  [1]

  $ ${TURBO} run
    x at least one task must be specified
  
  [1]

Run again with an environment variable that corresponds to a run argument and assert that
we get the full help output.
  $ TURBO_LOG_ORDER=stream ${TURBO} 2>&1 > out.txt
  [1]
  $ cat out.txt | head -n1
  The build system that makes ship happen
