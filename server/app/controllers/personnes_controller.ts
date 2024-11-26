import type { HttpContext } from '@adonisjs/core/http'
import { createPersonneValidator } from '#validators/personne'
import Personne from '#models/personne'
import { PersonneService } from '#services/personne_service'
import { inject } from '@adonisjs/core'

@inject()
export default class PersonnesController {
  constructor(private personneService: PersonneService) {}

  /**
   * Display a list of resource
   */
  async index({}: HttpContext) {}

  /**
   * Display form to create a new record
   */
  async create({}: HttpContext) {}

  /**
   * Handle form submission for the create action
   */
  async store({ request, response }: HttpContext) {
    try {
      const payload = await request.validateUsing(createPersonneValidator)
      this.personneService.register(payload)
      return response.status(201).send({ message: 'Le compte a pu être créée' })
    } catch (error) {
      console.error('Erreur lors de la création de la personne :', error)
      return response.status(400).send({ error: error.message })
    }
  }

  /**
   * Show individual record
   */
  async show({ params }: HttpContext) {}

  /**
   * Edit individual record
   */
  async edit({ params }: HttpContext) {}

  /**
   * Handle form submission for the edit action
   */
  async update({ params, request }: HttpContext) {}

  /**
   * Delete record
   */
  async destroy({ params }: HttpContext) {}
}
