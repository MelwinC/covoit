import Voiture from '#models/voiture'
import Marque from '#models/marque'

interface MarquePayload {
  nom: string
}

export class MarqueService {
  async index(userId: number, voitureId: number) {
    const voiture = await Voiture.find(voitureId)

    if (!voiture) {
      throw new Error('Voiture non trouvée')
    }
    if (voiture.id_personne !== userId) {
      throw new Error("Vous n'avez pas accès à cette voiture")
    }
    return await voiture.related('marque').query()
  }

  async store(payload: MarquePayload, userId: number, voitureId: number) {
    const voiture = await Voiture.find(voitureId)

    if (!voiture) {
      throw new Error('Voiture non trouvée')
    }

    if (voiture.id_personne !== userId) {
      throw new Error('Vous pouvez pas créée de marque pour cette voiture')
    }

    const marque = new Marque()
    marque.nom = payload.nom
    await marque.save()
    return marque
  }

  async all() {
    const marques = Marque.all()
    return marques
  }

  async update(payload: MarquePayload, userId: number, voitureId: number, marqueId: number) {
    const voiture = await Voiture.find(voitureId)

    if (!voiture) {
      throw new Error('Voiture non trouvée')
    }

    if (voiture.id_personne !== userId) {
      throw new Error('Vous pouvez pas modifier de marque pour cette voiture')
    }

    const marque = await Marque.findOrFail(marqueId)
    marque.merge(payload)
    await marque.save()
    return marque
  }
}
