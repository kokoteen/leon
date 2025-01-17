import { command } from 'execa'

import { LOG } from '@/helpers/log'
import { LOADER } from '@/helpers/loader'

const globs = [
  '"app/src/js/*.{ts,js}"',
  // TODO: deal with it once handling new hotword
  // '"hotword/index.{ts,js}"',
  // TODO: put it back once tests have been reintroduced into skills
  // '"skills/**/*.js"',
  '"scripts/**/*.{ts,js}"',
  '"server/src/**/*.{ts,js}"'
  // TODO: put it back once tests need to be written
  /*'"test/!*.js"',
  '"test/e2e/!**!/!*.js"',
  '"test/json/!**!/!*.js"',
  '"test/unit/!**!/!*.js"'*/
]
const src = globs.join(' ')

async function prettier() {
  await command('prettier --write . --ignore-path .gitignore', {
    shell: true
  })
  await command(`prettier --check ${src} --ignore-path .gitignore`, {
    shell: true,
    stdio: 'inherit'
  })
}

/**
 * This script ensures the correct coding syntax of the whole project
 */
;(async () => {
  LOADER.start()
  LOG.info('Linting...')

  try {
    await Promise.all([
      prettier(),
      command(`eslint ${src} --ignore-path .gitignore`, {
        shell: true,
        stdio: 'inherit'
      })
    ])

    LOG.success('Looks great')
    LOADER.stop()
  } catch (e) {
    LOG.error(`Does not look great: ${e.message}`)
    LOADER.stop()
    process.exit(1)
  }
})()
