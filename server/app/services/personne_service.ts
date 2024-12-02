import Personne from '#models/personne'
import Ville from '#models/ville'
import db from '@adonisjs/lucid/services/db'
interface PersonnePayload {
  prenom: string
  nom: string
  email?: string
  telephone: string
  username: string
  password?: string
  id_ville: number
}

interface PersonneUpdatePayload {
  prenom?: string
  nom?: string
  email?: string
  telephone?: string
  username?: string
  password?: string
  id_ville?: number
}

const trx = await db.transaction()

export class PersonneService {
  async register(payload: PersonnePayload) {
    try {
      const user = await Personne.findBy('email', payload.email)
      if (user !== null) {
        throw new Error('Un utilisateur avec cet email existe déjà.')
      }
      const ville = await Ville.findBy('id', payload.id_ville)
      if (ville === null) {
        throw new Error("Cette ville n'existe pas.")
      }
      await trx.insertQuery().table('personnes').insert(payload)
      await trx.commit()
    } catch (err) {
      await trx.rollback()
      throw err
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

  async update(id: number, idUser: number, payload: PersonneUpdatePayload) {
    try {
      if (idUser !== id) {
        throw new Error('Vous pouvez pas supprimer un compte d un autre utilisateur.')
      }
      const personne = await Personne.findOrFail(id)
      personne.merge(payload)
      await personne.save()
      return personne
    } catch (error) {
      console.error('Erreur lors de la mise à jour de la personne :', error)
      throw new Error('Erreur lors de la mise à jour de la personne.')
    }
  }

  async destroy(id: number, idUser: number) {
    try {
      if (idUser !== id) {
        throw new Error('Vous pouvez pas supprimer un compte d un autre utilisateur.')
      }
      const personne = await Personne.findOrFail(id)
      await personne.delete()
    } catch (error) {
      throw new Error(error.message)
    }
  }

  async login(email: string, password: string) {
    try {
      const user = await Personne.verifyCredentials(email, password)
      const token = await Personne.accessTokens.create(user)
      return { token, user }
    } catch (err) {
      console.log(err)
      throw new Error('La connexion du compte a échoué.')
    }
  }
}
