// Setup a name for the cache and a list of files to cache
let cacheName = 'gdd325LackLuster'
let filesToCache = [
  './index.html',
  './style.css',
  './manifest.json',
  './assets/spritesheets',
  './assets/spritesheets/Dash_Up.png',
  './assets/spritesheets/Dash_Left.png',
  './assets/spritesheets/sparkle.png',
  './assets/spritesheets/Orb_Idle.png',
  './assets/spritesheets/light_ORB.png',
  './assets/spritesheets/Spike.png',
  './assets/spritesheets/Dash_Down.png',
  './assets/spritesheets/Boulder_Upwards.png',
  './assets/spritesheets/Orb_Activation.png',
  './assets/spritesheets/slime_walking_black.png',
  './assets/spritesheets/Dash_Right.png',
  './assets/spritesheets/Boulder_Downwards.png',
  './assets/audio/spike.wav',
  './assets/audio/Level1.wav',
  './assets/audio/mainTheme.wav',
  './assets/audio/dash.wav',
  './assets/audio/Level2.wav',
  './assets/audio/Level3.wav',
  './assets/audio/slimeHurt.wav',
  './assets/audio/pillarCollide.wav',
  './assets/audio/pDeath.wav',
  './assets/audio/footsteps.wav',
  './assets/json/LL_final_map.json',
  './assets/icons/LackLuster_512px.png',
  './assets/icons/LackLuster_256px.png',
  './assets/icons/LackLuster_196px.png',
  './assets/sprites/Trap.png',
  './assets/sprites/sparkle.png',
  './assets/sprites/LL_tiled_light_tiles.png',
  './assets/sprites/LL_tiled_tiles.png',
  './assets/sprites/health_orb.png',
  './assets/sprites/boulder.png',
  './assets/sprites/web.png',
  './assets/sprites/LL_Blocker.png',
  './assets/Font/Pixeled.ttf',
  './assets/banner/LackLuster_bannerthumb.gif',
  './assets/player/player_back.png',
  './assets/player/player_walk_left.png',
  './assets/player/player_left.png',
  './assets/player/player_walk_back.png',
  './assets/player/player_front.png',
  './assets/player/player_right.png',
  './assets/player/player_walk_right.png',
  './assets/player/player_walk_front.png',
  './sw.js',
  './src/Scenes',
  './src/Scenes/GameOver.js',
  './src/Scenes/CreditsScene.js',
  './src/Scenes/StartScene.js',
  './src/Scenes/ControlsScene.js',
  './src/Scenes/GameScene.js',
  './src/Scenes/PauseScene.js',
  './src/Animations.js',
  './src/config.js',
  './src/main.js',
  './src/Audio.js',
  './src/Player.js',
  './src/utils.js',
  'https://cdn.jsdelivr.net/npm/phaser@3.16.1/dist/phaser.min.js',
  'https://cdn.jsdelivr.net/npm/phaser@3.16.2/dist/phaser.min.js',
  'https://cdn.jsdelivr.net/npm/phaser-plugin-update@1.0.1/dist/UpdatePlugin.js'
]

// Add a function to run when the sworker is installed
self.addEventListener('install', (event) => {
  event.waitUntil(
    // Open the cache and cache the files
    caches.open(cacheName)
      .then((cache) => {
        console.log('Service Worker: caching files')
        cache.addAll(filesToCache)
      }).catch((err) => {
        console.log(`Failed to open cache: ${err}`)
      })
  )
})

// Allow the service worker to respond to all requests with potentially
// cached resources instead of contacting the server.
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((res) => {
        return res || fetch(event.request)
      }).catch((err) => {
        console.log(`Failed to fetch from cache: ${err}`)
      })
  )
})

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(keyList.map((key) => {
        if (key !== cacheName) {
          console.log(`Service Worker: removing old cache '${key}'`)
          return caches.delete(key)
        }
      }))
    })
  )
})
