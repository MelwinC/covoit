import type { HttpContext } from '@adonisjs/core/http'
import { createPersonneValidator, updatePersonneValidator } from '#validators/personne'
import { PersonneService } from '#services/personne_service'
import { inject } from '@adonisjs/core'

@inject()
export default class PersonnesController {
  constructor(private personneService: PersonneService) {}

  /**
   * Display a list of resource
   */
  async index({ response }: HttpContext) {
    try {
      const personnes = await this.personneService.index()
      return response.status(200).send(personnes)
    } catch (error) {
      console.error('Erreur lors de la récupération des utilisateurs :', error)
      return response.status(500).send({ error: 'Impossible de récupérer les utilisateurs' })
    }
  }

  /**
   * Handle form submission for the create action
   */
  async store({ request, response }: HttpContext) {
    try {
      const payload = await request.validateUsing(createPersonneValidator)
      await this.personneService.register(payload)
      return response.status(201).send({ message: 'Le compte a pu être créée' })
    } catch (error) {
      return response.status(400).send({ error: error.message })
    }
  }

  /**
   * Show individual record
   */
  async show({ params, response }: HttpContext) {
    try {
      const personne = await this.personneService.show(params.id)
      return response.status(200).send(personne)
    } catch (error) {
      console.error('Erreur lors de la récupération de la personne :', error)
      return response.status(400).send({ error: 'Impossible de récupérer la personne' })
    }
  }

  /**
   * Handle form submission for the edit action
   */
  async update({ params, request, response, auth }: HttpContext) {
    try {
      const user = auth.getUserOrFail()
      const payload = await request.validateUsing(updatePersonneValidator)
      await this.personneService.update(Number(params.id), user.id, payload)
      return response.status(200).send({ message: 'Le compte a pu être mis à jour' })
    } catch (error) {
      return response.status(400).send({ error: error.message })
    }
  }

  /**
   * Delete record
   */
  async destroy({ params, response, auth }: HttpContext) {
    try {
      const user = auth.getUserOrFail()
      await this.personneService.destroy(params.id, user.id)
      return response.status(200).send({ message: 'Le compte a pu être supprimé' })
    } catch (error) {
      return response.status(400).send({ error: error.message })
    }
  }

  /**
   * Handle login action
   */
  async login({ request, response }: HttpContext) {
    try {
      const { email, password } = request.all()
      const res = await this.personneService.login(email, password)
      return response.status(200).send(res)
    } catch (err) {
      return response.status(400).send({ error: err.message })
    }
  }
}
