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
      this.personneService.register(payload)
      return response.status(201).send({ message: 'Le compte a pu être créée' })
    } catch (error) {
      console.error('Erreur lors de la création de la personne :', error)
      return response.status(400).send({ error: error })
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
      return response.status(500).send({ error: 'Impossible de récupérer la personne' })
    }
  }

  /**
   * Handle form submission for the edit action
   */
  async update({ params, request, response }: HttpContext) {
    try {
      const payload = await request.validateUsing(updatePersonneValidator)
      await this.personneService.update(params.id, payload)
      return response.status(200).send({ message: 'Le compte a pu être mis à jour' })
    } catch (error) {
      console.error('Erreur lors de la mise à jour de la personne :', error)
      return response.status(400).send({ error: error })
    }
  }

  /**
   * Delete record
   */
  async destroy({ params, response }: HttpContext) {
    try {
      await this.personneService.destroy(params.id)
      return response.status(200).send({ message: 'Le compte a pu être supprimé' })
    } catch (error) {
      console.error('Erreur lors de la suppression de la personne :', error)
      return response.status(400).send({ error: error })
    }
  }

  /**
   * Handle login action
   */
  async login({ request, response }: HttpContext) {
    try {
      const { email, password } = request.all()
      const token = await this.personneService.login(email, password)
      return response.status(200).send(token)
    } catch (error) {
      console.error('Erreur lors de la connexion :', error)
      return response.status(400).send({ error: error })
    }
  }
}
