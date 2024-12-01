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
const PersonnesController = () => import('#controllers/personnes_controller')
const ConversationsController = () => import('#controllers/conversations_controller')
const MessagesController = () => import('#controllers/messages_controller')

router.get('/', async () => {
  return {
    hello: 'world',
  }
})
router.resource('personnes', PersonnesController)
router
  .group(() => {
    router.resource('conversations', ConversationsController)
  })
  .middleware(
    middleware.auth({
      guards: ['api'],
    })
  )

router.post('personnes/login', [PersonnesController, 'login'])

router
  .group(() => {
    router.resource('conversations.messages', MessagesController).only(['index', 'store', 'update'])
  })
  .middleware(
    middleware.auth({
      guards: ['api'],
    })
  )
