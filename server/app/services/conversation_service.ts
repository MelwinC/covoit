import Conversation from '#models/conversation'

interface ConversationPayload {
  id_personne_1?: number
  id_personne_2: number
}

export class ConversationService {
  async store(payload: ConversationPayload, idPersonne1: number) {
    try {
      payload.id_personne_1 = idPersonne1
      const conversationAldreadyExist = await Conversation.query()
        .where('id_personne_1', payload.id_personne_1)
        .andWhere('id_personne_2', payload.id_personne_2)
        .first()
      if (conversationAldreadyExist) {
        throw new Error('La conversation existe déjà.')
      }
      const conversation = await Conversation.create(payload)
      return conversation
    } catch (err) {
      throw new Error(err.message)
    }
  }
  async index(idPersonne: number) {
    try {
      const conversations = (await Conversation.findBy('id_personne_1', idPersonne)) || []
      return conversations
    } catch (error) {
      console.error('Erreur lors de la récupération des conversations :', error)
      throw new Error('Erreur lors de la récupération des conversations.')
    }
  }

  async show(id: number) {
    try {
      const conversation = await Conversation.findOrFail(id)
      return conversation
    } catch (error) {
      console.error('Erreur lors de la récupération de la conversation :', error)
      throw new Error('Erreur lors de la récupération de la conversation.')
    }
  }

  async destroy(id: number) {
    try {
      const conversation = await Conversation.findOrFail(id)
      await conversation.delete()
    } catch (error) {
      console.error('Erreur lors de la suppression de la conversation :', error)
      throw new Error('Erreur lors de la suppression de la conversation.')
    }
  }
}
