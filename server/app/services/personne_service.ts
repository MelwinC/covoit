import Personne from '#models/personne'

interface PersonnePayload {
  prenom: string
  nom: string
  email: string
  telephone: string
  username: string
  password: string
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
}
