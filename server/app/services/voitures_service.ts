import Voiture from '#models/voiture'
interface VoiturePayload {
  immatriculation: string
  modele: string
  place: number
  id_marque: number
  id_personne?: number
}

export class VoitureService {
  async index() {
    return Voiture.all()
  }
  async store(payload: VoiturePayload, idUser: number) {
    payload.id_personne = idUser
    return Voiture.create(payload)
  }
  async show(id: number) {
    return Voiture.findOrFail(id)
  }
  async update(id: number, payload: VoiturePayload, userId: number) {
    const voiture = await Voiture.findOrFail(id)
    if (voiture.id_personne !== userId) {
      throw new Error('Vous êtes pas autorisé à mettre à jour cette ressource')
    }
    voiture.merge(payload)
    await voiture.save()
    return voiture
  }
  async destroy(id: number, userId: number) {
    const voiture = await Voiture.findOrFail(id)
    if (voiture.id_personne !== userId) {
      throw new Error('Vous êtes pas autorisé à mettre à jour cette ressource')
    }
    await voiture.delete()
    return voiture
  }
}
