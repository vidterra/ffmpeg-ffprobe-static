'use strict'

const {ok, strictEqual} = require('assert')
const {isAbsolute} = require('path')
const fs = require('fs')
const {spawnSync} = require('child_process')
const shell = require('any-shell-escape')
const { ffmpegPath, ffprobePath, ffplayPath } = require('.')

console.info('TAP version 12')
console.info('1..8')

ok(isAbsolute(ffmpegPath))
console.info('ok 1 - ffmpeg path is absolute')
ok(isAbsolute(ffprobePath))
console.info('ok 2 - ffprobe path is absolute')
ok(isAbsolute(ffplayPath))
console.info('ok 3 - ffplay path is absolute')

ok(fs.statSync(ffmpegPath).isFile(ffmpegPath))
console.info(`ok 4 - ${ffmpegPath} is a file`)
ok(fs.statSync(ffprobePath).isFile(ffprobePath))
console.info(`ok 5 - ${ffprobePath} is a file`)
ok(fs.statSync(ffplayPath).isFile(ffplayPath))
console.info(`ok 6 - ${ffplayPath} is a file`)

fs.accessSync(ffmpegPath, fs.constants.X_OK)
console.info(`ok 7 - ${ffmpegPath} is executable`)
fs.accessSync(ffprobePath, fs.constants.X_OK)
console.info(`ok 8 - ${ffprobePath} is executable`)
fs.accessSync(ffplayPath, fs.constants.X_OK)
console.info(`ok 9 - ${ffplayPath} is executable`)

const spawnFfmpeg = spawnSync(ffmpegPath, ['--help'], {
	stdio: ['ignore', 'ignore', 'pipe'], // stdin, stdout, stderr
})
strictEqual(spawnFfmpeg.status, 0)
console.info(`ok 10 - \`${ffmpegPath} --help\` works`)

const spawnFfprobe = spawnSync(ffprobePath, ['--help'], {
	stdio: ['ignore', 'ignore', 'pipe'], // stdin, stdout, stderr
})
strictEqual(spawnFfprobe.status, 0)
console.info(`ok 11 - \`${ffprobePath} --help\` works`)

const spawnFfplay = spawnSync(ffplayPath, ['--help'], {
  stdio: ['ignore', 'ignore', 'pipe'], // stdin, stdout, stderr
})
strictEqual(spawnFfplay.status, 0)
console.info(`ok 12 - \`${ffplayPath} --help\` works`)
