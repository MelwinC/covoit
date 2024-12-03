import Trajet from '#models/trajet'
import { DateTime } from 'luxon'

interface TrajetPayload {
  km: number
  place_proposees: number
  id_ville_1: number
  id_ville_2: number
  id_personne?: number
  dateT: DateTime
}
export class TrajetService {
  async index() {
    try {
      const trajets = await Trajet.query().preload('ville1').preload('ville2')
      return trajets.map((trajet) => ({
        id: trajet.id,
        km: trajet.km,
        place_proposeess: trajet.place_proposees,
        dateT: trajet.dateT,
        id_personne: trajet.id_personne,
        createdAt: trajet.createdAt,
        updatedAt: trajet.updatedAt,
        prix: trajet.prix,
        id_ville_1: trajet.id_ville_1,
        id_ville_2: trajet.id_ville_2,
        ville1: trajet.ville1.ville,
        ville2: trajet.ville2.ville,
      }))
    } catch (error) {
      console.warn(error)
      throw new Error('Erreur lors de la récupération des trajets.')
    }
  }
  async store(payload: TrajetPayload, idUser: number) {
    try {
      payload.id_personne = idUser
      const trajet = Trajet.create(payload)
      return trajet
    } catch (error) {
      console.warn(error)
      throw new Error('Erreur lors de la création de la ville.')
    }
  }
}
