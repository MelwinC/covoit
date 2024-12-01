import type { HttpContext } from '@adonisjs/core/http'
import { VilleService } from '#services/ville_service'
import { inject } from '@adonisjs/core'

@inject()
export default class VillesController {
  constructor(private villeService: VilleService) {}
  /**
   * Display a list of resource
   */
  async index({ response }: HttpContext) {
    try {
      const villes = await this.villeService.index()
      return response.status(200).send(villes)
    } catch (error) {
      return response.status(500).send({ error: 'Impossible de récupérer les villes' })
    }
  }

  /**
   * Handle form submission for the create action
   */
  async store({ request }: HttpContext) {}

  /**
   * Show individual record
   */
  async show({ params }: HttpContext) {}
}
