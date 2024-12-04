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
      return response.status(500).send({ error: error.message })
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
  async show({ params, response }: HttpContext) {
    try {
      const trajet = await this.trajetService.show(params.id)
      return response.status(200).send(trajet)
    } catch (error) {
      console.warn(error)
      return response.status(400).send({ error: error.message })
    }
  }

  /**
   * Handle form submission for the edit action
   */
  async update({ params, request, response, auth }: HttpContext) {
    try {
      const payload = await request.validateUsing(createTrajetValidator)
      const user = auth.getUserOrFail()
      await this.trajetService.update(payload, user.id, params.id)
      return response.status(201).send({ message: 'Trajet mis à jour avec succès' })
    } catch (error) {
      console.warn(error)
      return response.status(400).send({ error: error })
    }
  }

  /**
   * Delete record
   */
  async destroy({ params, auth, response }: HttpContext) {
    try {
      const user = auth.getUserOrFail()
      await this.trajetService.destroy(user.id, params.id)
      return response.status(200).send({ message: 'Trajet supprimé avec succès' })
    } catch (error) {
      console.warn(error)
      return response.status(400).send({ error: error.message })
    }
  }

  /**
   * inscrpiton trajet
   */
  async inscription({ params, auth, response }: HttpContext) {
    try {
      const user = auth.getUserOrFail()
      await this.trajetService.inscrirePersonneAuTrajet(user.id, params.id)
      return response.status(200).send({ message: 'Personne incris au trajet' })
    } catch (error) {
      console.warn(error)
      return response.status(400).send({ error: error.message })
    }
  }

  /**
   * inscrpiton trajet
   */
  async indexInscription({ params, response }: HttpContext) {
    try {
      const personnes = await this.trajetService.getPersonnesInscrites(params.id)
      return response.status(200).send(personnes)
    } catch (error) {
      console.warn(error)
      return response.status(400).send({ error: error.message })
    }
  }

  /**
   * inscrpiton trajet
   */
  async indexCreateur({ response, auth }: HttpContext) {
    try {
      const user = auth.getUserOrFail()
      const personnes = await this.trajetService.getTrajetsCree(user.id)
      return response.status(200).send(personnes)
    } catch (error) {
      console.warn(error)
      return response.status(400).send({ error: error.message })
    }
  }
}
