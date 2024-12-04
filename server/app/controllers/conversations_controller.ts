import { ConversationService } from '#services/conversation_service'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'
import { conversationValidator } from '#validators/conversation'

@inject()
export default class ConversationsController {
  constructor(private conversationService: ConversationService) {}
  /**
   * Display a list of resource
   */
  async index({ response, auth }: HttpContext) {
    try {
      const user = auth.getUserOrFail()
      const conversations = await this.conversationService.index(user.id)
      return response.status(200).send(conversations)
    } catch (error) {
      return response.status(500).send({ error: 'Impossible de récupérer les conversations' })
    }
  }

  /**
   * Handle form submission for the create action
   */
  async store({ request, response, auth }: HttpContext) {
    try {
      const payload = await request.validateUsing(conversationValidator)
      const user = auth.getUserOrFail()
      await this.conversationService.store(payload, user.id)
      return response.status(201).send({ message: 'La conversation a pu être créée' })
    } catch (error) {
      return response.status(400).send({ error: error.message })
    }
  }

  /**
   * Show individual record
   */
  async show({ params, response }: HttpContext) {
    try {
      const conversation = await this.conversationService.show(params.id)
      return response.status(200).send(conversation)
    } catch (error) {
      return response.status(500).send({ error: 'Impossible de récupérer la conversation' })
    }
  }
}
