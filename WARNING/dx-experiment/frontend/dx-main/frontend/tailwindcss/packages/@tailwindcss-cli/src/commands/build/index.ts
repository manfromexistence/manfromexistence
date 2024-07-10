import watcher from '@parcel/watcher'
import {
  IO,
  Parsing,
  clearCache,
  scanDir,
  scanFiles,
  type ChangedContent,
} from '@tailwindcss/oxide'
import { existsSync } from 'node:fs'
import fs from 'node:fs/promises'
import path from 'node:path'
import postcss from 'postcss'
import atImport from 'postcss-import'
import { compile, optimizeCss } from 'tailwindcss'
import type { Arg, Result } from '../../utils/args'
import {
  eprintln,
  formatDuration,
  header,
  highlight,
  println,
  relative,
} from '../../utils/renderer'
import { resolve } from '../../utils/resolve'
import { drainStdin, outputFile } from './utils'

const css = String.raw

export function options() {
  return {
    '--input': {
      type: 'string',
      description: 'Input file',
      alias: '-i',
    },
    '--output': {
      type: 'string',
      description: 'Output file',
      alias: '-o',
    },
    '--watch': {
      type: 'boolean | string',
      description: 'Watch for changes and rebuild as needed',
      alias: '-w',
    },
    '--minify': {
      type: 'boolean',
      description: 'Optimize and minify the output',
      alias: '-m',
    },
    '--optimize': {
      type: 'boolean',
      description: 'Optimize the output without minifying',
    },
    '--cwd': {
      type: 'string',
      description: 'The current working directory',
      default: '.',
    },
  } satisfies Arg
}

export async function handle(args: Result<ReturnType<typeof options>>) {
  let base = path.resolve(args['--cwd'])

  // Resolve the output as an absolute path.
  if (args['--output']) {
    args['--output'] = path.resolve(base, args['--output'])
  }

  // Resolve the input as an absolute path. If the input is a `-`, then we don't
  // need to resolve it because this is a flag to indicate that we want to use
  // `stdin` instead.
  if (args['--input'] && args['--input'] !== '-') {
    args['--input'] = path.resolve(base, args['--input'])

    // Ensure the provided `--input` exists.
    if (!existsSync(args['--input'])) {
      eprintln(header())
      eprintln()
      eprintln(`Specified input file ${highlight(relative(args['--input']))} does not exist.`)
      process.exit(1)
    }
  }

  let start = process.hrtime.bigint()
  let { candidates } = scanDir({ base })

  // Resolve the input
  let [input, cssImportPaths] = await handleImports(
    args['--input']
      ? args['--input'] === '-'
        ? await drainStdin()
        : await fs.readFile(args['--input'], 'utf-8')
      : css`
          @import '${resolve('tailwindcss/index.css')}';
        `,
    args['--input'] ?? base,
  )

  // Compile the input
  let result = compile(input, candidates)

  // Optimize the output
  if (args['--minify'] || args['--optimize']) {
    result = optimizeCss(result, {
      file: args['--input'] ?? 'input.css',
      minify: args['--minify'] ?? false,
    })
  }

  // Write the output
  if (args['--output']) {
    await outputFile(args['--output'], result)
  } else {
    println(result)
  }

  let end = process.hrtime.bigint()
  eprintln(header())
  eprintln()
  eprintln(`Done in ${formatDuration(end - start)}`)

  // Watch for changes
  if (args['--watch']) {
    await watcher.subscribe(base, async (err, events) => {
      if (err) {
        console.error(err)
        return
      }

      try {
        // If the only change happened to the output file, then we don't want to
        // trigger a rebuild because that will result in an infinite loop.
        if (events.length === 1 && events[0].path === args['--output']) return

        let changedFiles: ChangedContent[] = []
        let rebuildStrategy: 'incremental' | 'full' = 'incremental'

        for (let event of events) {
          // Track new and updated files for incremental rebuilds.
          if (event.type === 'create' || event.type === 'update') {
            changedFiles.push({
              file: event.path,
              extension: path.extname(event.path).slice(1),
            } satisfies ChangedContent)
          }

          // If one of the changed files is related to the input CSS files, then
          // we need to do a full rebuild because the theme might have changed.
          if (cssImportPaths.includes(event.path)) {
            rebuildStrategy = 'full'

            // No need to check the rest of the events, because we already know we
            // need to do a full rebuild.
            break
          }
        }

        // Re-compile the input
        let start = process.hrtime.bigint()

        // Scan the entire `base` directory for full rebuilds.
        if (rebuildStrategy === 'full') {
          // Clear the cache because we need to re-scan the entire directory.
          clearCache()

          // Re-scan the directory to get the new `candidates`.
          candidates = scanDir({ base }).candidates
        }

        // Scan changed files only for incremental rebuilds.
        else if (rebuildStrategy === 'incremental') {
          let uniqueCandidates = new Set(candidates)
          for (let candidate of scanFiles(changedFiles, IO.Sequential | Parsing.Sequential)) {
            uniqueCandidates.add(candidate)
          }
          candidates = Array.from(uniqueCandidates)
        }

        // Resolve the input
        if (rebuildStrategy === 'full') {
          // Collect the new `input` and `cssImportPaths`.
          ;[input, cssImportPaths] = await handleImports(
            args['--input']
              ? await fs.readFile(args['--input'], 'utf-8')
              : css`
                  @import '${resolve('tailwindcss/index.css')}';
                `,
            args['--input'] ?? base,
          )
        }

        // Compile the input
        let result = compile(input, candidates)

        // Optimize the output
        if (args['--minify'] || args['--optimize']) {
          result = optimizeCss(result, {
            file: args['--input'] ?? 'input.css',
            minify: args['--minify'] ?? false,
          })
        }

        // Write the output
        if (args['--output']) {
          await outputFile(args['--output'], result)
        } else {
          println(result)
        }

        let end = process.hrtime.bigint()
        eprintln(`Done in ${formatDuration(end - start)}`)
      } catch (err) {
        // Catch any errors and print them to stderr, but don't exit the process
        // and keep watching.
        if (err instanceof Error) {
          eprintln(err.toString())
        }
      }
    })

    // Abort the watcher if `stdin` is closed to avoid zombie processes. You can
    // disable this behavior with `--watch=always`.
    if (args['--watch'] !== 'always') {
      process.stdin.on('end', () => {
        process.exit(0)
      })
    }

    // Keep the process running
    process.stdin.resume()
  }
}

function handleImports(
  input: string,
  file: string,
): [css: string, paths: string[]] | Promise<[css: string, paths: string[]]> {
  // TODO: Should we implement this ourselves instead of relying on PostCSS?
  //
  // Relevant specification:
  //   - CSS Import Resolve: https://csstools.github.io/css-import-resolve/

  if (!input.includes('@import')) return [input, []]

  return postcss()
    .use(atImport())
    .process(input, { from: file })
    .then((result) => [
      result.css,

      // Use `result.messages` to get the imported files. This also includes the
      // current file itself.
      result.messages.filter((msg) => msg.type === 'postcss-import').map((msg) => msg.file),
    ])
}
