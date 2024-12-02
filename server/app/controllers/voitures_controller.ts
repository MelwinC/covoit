import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'
import { VoitureService } from '#services/voitures_service'
import { createVoitureValidator } from '#validators/voiture'

@inject()
export default class VoituresController {
  constructor(private voistureService: VoitureService) {}
  /**
   * Display a list of resource
   */
  async index({ response }: HttpContext) {
    try {
      const voitures = await this.voistureService.index()
      return response.status(200).send(voitures)
    } catch (error) {
      return response.status(500).send({ error: 'Impossible de récupérer les voitures' })
    }
  }

  /**
   * Handle form submission for the create action
   */
  async store({ request, response, auth }: HttpContext) {
    try {
      const user = auth.getUserOrFail()
      const payload = await request.validateUsing(createVoitureValidator)
      const voiture = await this.voistureService.store(payload, user.id)
      response.status(201).send(voiture)
    } catch (err) {
      response.status(400).send({ error: err })
    }
  }

  /**
   * Show individual record
   */
  async show({ params, response }: HttpContext) {
    try {
      const voiture = await this.voistureService.show(params.id)
      response.status(200).send(voiture)
      return voiture
    } catch (error) {
      response.status(404).send({ error: 'Impossible de récupérer la voiture' })
    }
  }

  /**
   * Handle form submission for the edit action
   */
  async update({ params, request, auth, response }: HttpContext) {
    try {
      const payload = await request.validateUsing(createVoitureValidator)
      const user = auth.getUserOrFail()
      await this.voistureService.update(params.id, payload, user.id)
      response.status(200).send({ message: 'Voiture mise à jour avec succès' })
    } catch (err) {
      response.status(400).send({ error: err })
    }
  }

  /**
   * Delete record
   */
  async destroy({ params, auth, response }: HttpContext) {
    try {
      const user = auth.getUserOrFail()
      await this.voistureService.destroy(params.id, user.id)
      response.status(200).send({ message: 'Voiture supprimée avec succès' })
    } catch (err) {
      response.status(400).send({ error: err })
    }
  }
}
