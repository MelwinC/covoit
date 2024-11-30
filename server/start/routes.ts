/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
const PersonnesController = () => import('#controllers/personnes_controller')
router.get('/', async () => {
  return {
    hello: 'world',
  }
})
router.resource('personne', PersonnesController)
router.post('personne/login', [PersonnesController, 'login'])
