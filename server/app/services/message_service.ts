import Message from '#models/message'
import Conversation from '#models/conversation'

interface MessagePayload {
  contenu: string
}

export class MessageService {
  async index(userId: number, conversationId: number) {
    const conversation = await Conversation.find(conversationId)

    if (!conversation) {
      throw new Error('Conversation non trouvée')
    }
    if (conversation.id_personne_1 !== userId && conversation.id_personne_2 !== userId) {
      throw new Error("Vous n'avez pas accès à cette conversation")
    }
    return await conversation.related('messages').query()
  }

  async store(payload: MessagePayload, userId: number, conversationId: number) {
    const conversation = await Conversation.find(conversationId)

    if (!conversation) {
      throw new Error('Conversation non trouvée')
    }

    if (conversation.id_personne_1 !== userId && conversation.id_personne_2 !== userId) {
      throw new Error('Vous pouvez pas créée de message dans cette conversation')
    }

    const message = new Message()
    message.id_conversation = conversationId
    message.id_personne = userId
    message.contenu = payload.contenu
    await message.save()
  }
}
