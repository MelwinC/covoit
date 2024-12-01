import type { HttpContext } from '@adonisjs/core/http'
import { createMessageValidator } from '#validators/message'
import { MessageService } from '#services/message_service'
import { inject } from '@adonisjs/fold'

@inject()
export default class MessagesController {
  constructor(private messageService: MessageService) {}
  /**
   * Display a list of resource
   */
  async index({ params, auth, response }: HttpContext) {
    try {
      const user = auth.getUserOrFail()
      const messages = await this.messageService.index(user.id, params.conversation_id)
      return response.status(200).send(messages)
    } catch (error) {
      console.error('Erreur lors de la récupération des messages :', error)
      if (error.message === 'Conversation non trouvée') {
        return response.status(404).send({ error: error.message })
      } else if (error.message === "Vous n'avez pas accès à cette conversation") {
        return response.status(403).send({ error: error.message })
      } else {
        return response.status(500).send({ error: 'Impossible de récupérer les messages' })
      }
    }
  }

  /**
   * Handle form submission for the create action
   */
  async store({ response, auth, params, request }: HttpContext) {
    try {
      const user = auth.getUserOrFail()
      const payload = await request.validateUsing(createMessageValidator)
      await this.messageService.store(payload, user.id, params.conversation_id)
      return response.status(200).send({ message: 'Message créé avec succès' })
    } catch (error) {
      console.error('Erreur lors de la récupération des messages :', error)
      if (error.message === 'Conversation non trouvée') {
        return response.status(404).send({ error: error.message })
      } else if (error.message === "Vous n'avez pas accès à cette conversation") {
        return response.status(403).send({ error: error.message })
      } else {
        return response.status(500).send({ error: 'Impossible de récupérer les messages' })
      }
    }
  }
}
