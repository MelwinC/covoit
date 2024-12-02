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
      const trajets = await Trajet.all()
      return trajets
    } catch (error) {
      throw new Error('Erreur lors de la récupération des trajets.')
    }
  }
  async store(payload: TrajetPayload, idUser: number) {
    try {
      payload.id_personne = idUser
      payload.dateT = DateTime.now()
      const trajet = Trajet.create(payload)
      return trajet
    } catch (error) {
      console.warn(error)
      throw new Error('Erreur lors de la création de la ville.')
    }
  }
}
