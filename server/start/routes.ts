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

router.get('/', async () => {
  return {
    hello: 'world',
  }
})
router.resource('personne', PersonnesController)
router
  .group(() => {
    router.resource('conversation', ConversationsController)
  })
  .middleware(
    middleware.auth({
      guards: ['api'],
    })
  )

router.post('personne/login', [PersonnesController, 'login'])
