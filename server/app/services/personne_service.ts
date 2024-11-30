import Personne from '#models/personne'

interface PersonnePayload {
  prenom: string
  nom: string
  email?: string
  telephone: string
  username: string
  password?: string
}

export class PersonneService {
  register(payload: PersonnePayload) {
    try {
      const personne = Personne.create(payload)
      return personne
    } catch (err) {
      console.error('Erreur lors de la création de la personne :', err)
      throw new Error('La création du compte a échoué.')
    }
  }
  async index() {
    try {
      const personnes = await Personne.all()
      return personnes
    } catch (error) {
      console.error('Erreur lors de la récupération des utilisateurs :', error)
      throw new Error('Erreur lors de la récupération des utilisateurs.')
    }
  }

  async show(id: number) {
    try {
      const personne = await Personne.findOrFail(id)
      return personne
    } catch (error) {
      console.error('Erreur lors de la récupération de la personne :', error)
      throw new Error('Erreur lors de la récupération de la personne.')
    }
  }

  async update(id: number, payload: PersonnePayload) {
    try {
      const personne = await Personne.findOrFail(id)
      personne.merge(payload)
      await personne.save()
      return personne
    } catch (error) {
      console.error('Erreur lors de la mise à jour de la personne :', error)
      throw new Error('Erreur lors de la mise à jour de la personne.')
    }
  }

  async destroy(id: number) {
    try {
      const personne = await Personne.findOrFail(id)
      await personne.delete()
    } catch (error) {
      console.error('Erreur lors de la suppression de la personne :', error)
      throw new Error('Erreur lors de la suppression de la personne.')
    }
  }

  async login(email: string, password: string) {
    try {
      const user = await Personne.verifyCredentials(email, password)
      const token = await Personne.accessTokens.create(user)
      return token
    } catch (err) {
      console.error('Erreur lors de la connexion de la personne :', err)
      throw new Error('La connexion du compte a échoué.')
    }
  }
}
