import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'
import { TrajetService } from '#services/trajet_service'
import { createTrajetValidator } from '#validators/trajet'

@inject()
export default class TrajetController {
  constructor(private trajetService: TrajetService) {}
  /**
   * Display a list of resource
   */
  async index({ response }: HttpContext) {
    try {
      const trajets = await this.trajetService.index()
      return response.status(200).send(trajets)
    } catch (error) {
      return response.status(500).send({ error: 'Impossible de récupérer les trajets' })
    }
  }

  /**
   * Handle form submission for the create action
   */
  async store({ request, response, auth }: HttpContext) {
    try {
      const payload = await request.validateUsing(createTrajetValidator)
      const user = auth.getUserOrFail()
      const trajet = await this.trajetService.store(payload, user.id)
      return response.status(201).send(trajet)
    } catch (error) {
      console.warn(error)
      return response.status(400).send({ error: error })
    }
  }

  /**
   * Show individual record
   */
  async show({ params }: HttpContext) {}

  /**
   * Handle form submission for the edit action
   */
  async update({ params, request }: HttpContext) {}

  /**
   * Delete record
   */
  async destroy({ params }: HttpContext) {}
}
