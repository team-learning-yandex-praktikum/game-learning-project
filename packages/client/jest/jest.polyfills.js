/**
 * @note The block below contains polyfills for Node.js globals
 * required for Jest to function when running JSDOM tests.
 * These HAVE to be require's and HAVE to be in this exact
 * order, since "undici" depends on the "TextEncoder" global API.
 *
 * Consider migrating to a more modern test runner if
 * you don't want to deal with this.
 */

const { TextDecoder, TextEncoder } = require('node:util')
// https://github.com/mswjs/msw/issues/1916#issuecomment-1845769931
const { ReadableStream } = require('web-streams-polyfill')

Object.defineProperties(globalThis, {
    TextDecoder: { value: TextDecoder },
    TextEncoder: { value: TextEncoder },
    ReadableStream: { value: ReadableStream },
})

const { Blob, File } = require('node:buffer')
const { fetch, Headers, FormData, Request, Response } = require('undici')
const dotenv = require('dotenv')

dotenv.config()

Object.defineProperties(globalThis, {
    fetch: { value: fetch, writable: true },
    Blob: { value: Blob },
    File: { value: File },
    Headers: { value: Headers },
    FormData: { value: FormData },
    Request: { value: Request },
    Response: { value: Response },
})

Object.defineProperties(global, {
    __SERVER_URL__: { value: process.env.SERVER_URL },
    __EXTERNAL_SERVER_PATH__: { value: process.env.EXTERNAL_SERVER_PATH },
    __EXTERNAL_SERVER_URL__: { value: process.env.EXTERNAL_SERVER_URL },
    __OUTH_YANDEX_URL__: { value: process.env.OUTH_YANDEX_URL },
    __CLIENT_URL__: { value: process.env.CLIENT_URL },
    __SERVER_PORT__: { value: process.env.SERVER_PORT },
    __SERVER_PATH__: { value: process.env.SERVER_PATH },
})
