const CACHE_NAME = 'my-site-cache-v1'

self.addEventListener('message', event => {
    if (event.data && event.data.type === 'CACHE_URLS') {
        const urlsToCache = event.data.payload.filter(
            (item, pos) => event.data.payload.indexOf(item) === pos
        )
        event.waitUntil(
            caches
                .open(CACHE_NAME)
                .then(cache => {
                    console.log('Opened cache')
                    return cache.addAll(urlsToCache)
                })
                .catch(err => {
                    console.error('Failed to open cache', err)
                    throw err
                })
        )
    }
})

self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(cacheNames =>
            Promise.allSettled(
                cacheNames.map(key => {
                    if (key !== CACHE_NAME) {
                        return caches.delete(key)
                    }
                    return null
                })
            )
        )
    )
})

const tryNetwork = (req, timeout) =>
    new Promise((resolve, reject) => {
        const timeoutId = setTimeout(reject, timeout)

        fetch(req)
            .then(res => {
                clearTimeout(timeoutId)
                const responseClone = res.clone()

                caches
                    .open(CACHE_NAME)
                    .then(cache => cache.put(req, responseClone))
                resolve(res)
            })
            .catch(reject)
    })

const getFromCache = req => {
    console.log('Network is off so getting from cache...')
    return caches
        .open(CACHE_NAME)
        .then(cache => cache.match(req))
        .then(result => result || Promise.reject(`no-match: ${req.url}`))
}

const EXCLUDED_PATHS = ['oauth', 'login', 'logout']

self.addEventListener('fetch', e => {
    const request = e.request
    const isHttp = request.url.startsWith('http')
    const isGet = request.method === 'GET'
    const hasExcludedPath = EXCLUDED_PATHS.some(path =>
        request.url.includes(path)
    )

    if (isHttp && isGet && !hasExcludedPath) {
        e.respondWith(
            tryNetwork(request, 1000).catch(() => getFromCache(request))
        )
    }
})
