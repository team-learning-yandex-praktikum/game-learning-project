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
                    console.error(err)
                    throw err
                })
        )
    }
})

self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(key => {
                    if (key !== CACHE_NAME) {
                        return caches.delete(key)
                    }
                    return null // Добавляем возврат значения для всех путей выполнения
                })
            )
        })
    )
})

const tryNetwork = (req, timeout) => {
    return new Promise((resolve, reject) => {
        const timeoutId = setTimeout(reject, timeout)

        fetch(req)
            .then(res => {
                clearTimeout(timeoutId)
                const responseClone = res.clone()
                if (req.url.startsWith('http')) {
                    caches
                        .open(CACHE_NAME)
                        .then(cache => cache.put(req, responseClone))
                }
                resolve(res)
            })
            .catch(reject)
    })
}

const getFromCache = req => {
    console.log('Network is off so getting from cache...')
    return caches
        .open(CACHE_NAME)
        .then(cache => cache.match(req))
        .then(result => result || Promise.reject('no-match'))
}

self.addEventListener('fetch', e => {
    e.respondWith(
        tryNetwork(e.request, 400).catch(() => getFromCache(e.request))
    )
})
