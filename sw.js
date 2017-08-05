const VERSION = 'curso-pwa-3';

self.addEventListener('install', event => {
    event.waitUntil(new Promise((resolve, reject) => {
    	caches.open(VERSION).then(cache => {
    		return cache.addAll([
    			'/',
                '/index.html',
                '/404.html',
    			'/_js/index.js',
    			'/_css/default.css'
    		]).then(_ => {
    			console.log('INSTALLED ' + VERSION);
        		resolve();
    		}).catch(err => {
    			console.erro('Não deu!', err);
    		})
    	})
    }))
})

self.addEventListener('activate', event => {
    event.waitUntil(new Promise((resolve, reject) => {
        console.log('ACTIVATED ' + VERSION);
        resolve();
    }));
});

self.addEventListener('fetch', event => {
    const url = new URL(event.request.url)
    const errorPage = './404.html'
    console.log('Requisitou: ', event.request.url)

    return event.respondWith(
        caches.match(event.request).then(response => {
        	return response || fetch(event.request).then(response => {
        		if (response.ok) {
        			caches.open(VERSION).then(cache => {
        				cache.put(event.request, response)
        			})
        			return response.clone()
        		} else {
        			return caches.match(errorPage)
        		}
        	})
        })
    )
});








