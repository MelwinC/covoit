import type { HttpContext } from '@adonisjs/core/http'
import { VilleService } from '#services/ville_service'
import { inject } from '@adonisjs/core'
import { createVilleValidator } from '#validators/ville'
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
  async store({ request, response }: HttpContext) {
    try {
      const payload = await request.validateUsing(createVilleValidator)
      const ville = await this.villeService.store(payload)
      response.status(201).send(ville)
    } catch (err) {
      response.status(400).send({ error: err })
    }
  }

  /**
   * Show individual record
   */
  async show({ params, response }: HttpContext) {
    try {
      const ville = await this.villeService.show(params.id)
      response.status(200).send(ville)
      return ville
    } catch (error) {
      response.status(404).send({ error: 'Impossible de récupérer la ville' })
    }
  }
}
