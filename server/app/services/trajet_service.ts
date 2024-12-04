import Trajet from '#models/trajet'
import Personne from '#models/personne'
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
      throw new Error('Erreur lors de la récupération des trajets.')
    }
  }
  async store(payload: TrajetPayload, idUser: number) {
    try {
      payload.id_personne = idUser
      const trajet = Trajet.create(payload)
      return trajet
    } catch (error) {
      throw new Error('Erreur lors de la création de la ville.')
    }
  }

  async update(payload: TrajetPayload, idUser: number, idTrajet: number) {
    try {
      const trajet = await Trajet.findOrFail(idTrajet)
      if (trajet.id_personne !== idUser) {
        throw new Error('Vous êtes pas autorisé à mettre à jour cette ressource')
      }
      trajet.merge(payload)
      await trajet.save()
    } catch (error) {
      throw new Error('Erreur lors de la modification du trajet.')
    }
  }

  async show(id: number) {
    try {
      const trajet = await Trajet.query().where('id', id).preload('ville1').preload('ville2')
      return trajet
    } catch (error) {
      throw new Error('Erreur lors de la récupération du trajet.')
    }
  }

  async destroy(idUser: number, idTrajet: number) {
    try {
      const trajet = await Trajet.findOrFail(idTrajet)
      if (trajet.id_personne !== idUser) {
        throw new Error('Vous êtes pas autorisé à supprimer cette ressource')
      }
      await trajet.delete()
    } catch (error) {
      throw new Error('Erreur lors de la suppresion du trajet, le trajet existe pas.')
    }
  }
  async inscrirePersonneAuTrajet(idPersonne: number, idTrajet: number) {
    try {
      const personne = await Personne.findOrFail(idPersonne)
      const trajet = await Trajet.findOrFail(idTrajet)
      const placesDisponibles = trajet.place_proposees

      // Vérifiez si la personne est déjà inscrite au trajet
      const personneInscrit = await personne
        .related('trajetsInscris')
        .query()
        .where('id_trajet', idTrajet)
        .first()
      if (personneInscrit) {
        throw new Error('La personne est déjà inscrite à ce trajet.')
      }

      // Vérifiez s'il y a encore des places disponibles
      const placesPrisesResult = await trajet.related('personnes').query().count('* as total')
      const placesPrises = placesPrisesResult[0].$extras.total
      if (placesDisponibles - placesPrises <= 0) {
        throw new Error("Il n'y a plus de places disponibles pour ce trajet.")
      }

      await personne.related('trajetsInscris').attach([idTrajet])
      return { message: 'Inscription réussie' }
    } catch (error) {
      throw error
    }
  }
  async getPersonnesInscrites(idTrajet: number) {
    try {
      const trajet = await Trajet.findOrFail(idTrajet)
      const personnes = await trajet
        .related('personnes')
        .query()
        .select('id', 'prenom', 'nom', 'username', 'id_ville')
      return personnes
    } catch (error) {
      throw new Error('Erreur lors de la récupération des personnes inscrites.')
    }
  }

  async getTrajetsCree(idUser: number) {
    try {
      const trajets = await Trajet.query().where('id_personne', idUser)
      return trajets
    } catch (error) {
      throw new Error('Erreur lors de la récupération des trajets cree par l utilisateur.')
    }
  }
}
