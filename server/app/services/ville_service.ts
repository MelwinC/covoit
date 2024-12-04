import Ville from '#models/ville'

interface VillePayload {
  ville: string
  codePostal: number
}
export class VilleService {
  async index() {
    try {
      const villes = await Ville.all()
      return villes
    } catch (error) {
      throw new Error('Erreur lors de la récupération des villes.')
    }
  }
  async store(payload: VillePayload) {
    try {
      const ville = new Ville()
      ville.ville = payload.ville
      ville.codePostal = payload.codePostal
      await ville.save()
      return ville
    } catch (error) {
      throw new Error('Erreur lors de la création de la ville.')
    }
  }
  async show(id: number) {
    try {
      const ville = await Ville.findOrFail(id)
      return ville
    } catch (error) {
      throw new Error('Erreur lors de la récupération de la ville.')
    }
  }
}
