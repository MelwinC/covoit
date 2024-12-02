import type { HttpContext } from '@adonisjs/core/http'
import { MarqueService } from '#services/marques_service'
import { inject } from '@adonisjs/core'

@inject()
export default class MarquesController {
  constructor(private marqueService: MarqueService) {}
  async marques({ response }: HttpContext) {
    try {
      const marques = await this.marqueService.all()
      response.status(201).send(marques)
    } catch (err) {
      response.status(400).send({ error: err })
    }
  }
  /**
   * Display a list of resource
   */
  async index({ auth, response, params }: HttpContext) {
    try {
      const user = auth.getUserOrFail()
      const marque = await this.marqueService.index(user.id, params.voiture_id)
      return response.status(200).send(marque)
    } catch (error) {
      if (error.message === 'Voiture non trouvée') {
        return response.status(404).send({ error: error.message })
      } else if (error.message === "Vous n'avez pas accès à cette voiture") {
        return response.status(403).send({ error: error.message })
      } else {
        return response
          .status(500)
          .send({ error: 'Impossible de récupérer la marque de la voiture' })
      }
    }
  }
}
