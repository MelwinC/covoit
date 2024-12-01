import Ville from '#models/ville'

export class VilleService {
  async index() {
    try {
      const villes = await Ville.all()
      return villes
    } catch (error) {
      throw new Error('Erreur lors de la récupération des villes.')
    }
  }
}
