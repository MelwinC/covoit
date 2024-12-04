/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'
const MarquesController = () => import('#controllers/marques_controller')
const VoitureController = () => import('#controllers/voitures_controller')
const PersonnesController = () => import('#controllers/personnes_controller')
const ConversationsController = () => import('#controllers/conversations_controller')
const MessagesController = () => import('#controllers/messages_controller')
const VillesController = () => import('#controllers/villes_controller')
const TrajetController = () => import('#controllers/trajet_controller')

router.get('/', async () => {
  return {
    hello: 'world',
  }
})

router.get('personnes/information', [PersonnesController, 'information']).middleware(
  middleware.auth({
    guards: ['api'],
  })
)

router.get('trajets/createur', [TrajetController, 'indexCreateur']).middleware(
  middleware.auth({
    guards: ['api'],
  })
)

router.get('trajets/inscrits', [TrajetController, 'getTrajetsInscrits']).middleware(
  middleware.auth({
    guards: ['api'],
  })
)

router
  .group(() => {
    router.resource('personnes', PersonnesController).except(['create', 'edit', 'store'])
  })
  .middleware(
    middleware.auth({
      guards: ['api'],
    })
  )

router.group(() => {
  router.resource('personnes', PersonnesController).only(['store'])
})

router
  .group(() => {
    router.resource('conversations', ConversationsController).except(['create', 'edit', 'destroy'])
  })
  .middleware(
    middleware.auth({
      guards: ['api'],
    })
  )

router.post('personnes/login', [PersonnesController, 'login'])

router
  .group(() => {
    router.resource('conversations.messages', MessagesController).only(['index', 'store'])
  })
  .middleware(
    middleware.auth({
      guards: ['api'],
    })
  )

router
  .group(() => {
    router.resource('villes', VillesController).only(['index', 'show'])
  })
  .middleware(
    middleware.auth({
      guards: ['api'],
    })
  )

router
  .group(() => {
    router
      .resource('voitures', VoitureController)
      .only(['index', 'store', 'show', 'update', 'destroy'])
  })
  .middleware(
    middleware.auth({
      guards: ['api'],
    })
  )

router
  .group(() => {
    router.resource('voitures.marques', MarquesController).only(['index', 'store'])
  })
  .middleware(
    middleware.auth({
      guards: ['api'],
    })
  )
router
  .group(() => {
    router.resource('trajets', TrajetController).except(['create', 'edit'])
  })
  .middleware(
    middleware.auth({
      guards: ['api'],
    })
  )
router.post('trajets/:id/inscription', [TrajetController, 'inscription']).middleware(
  middleware.auth({
    guards: ['api'],
  })
)
router.get('trajets/:id/inscription', [TrajetController, 'indexInscription']).middleware(
  middleware.auth({
    guards: ['api'],
  })
)

router.get('/marques', [MarquesController, 'marques'])
