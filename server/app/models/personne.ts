import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column, hasMany, hasOne, manyToMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasMany, HasOne, ManyToMany } from '@adonisjs/lucid/types/relations'
import Voiture from '#models/voiture'
import Conversation from '#models/conversation'
import Ville from '#models/ville'
import Trajet from '#models/trajet'
import { withAuthFinder } from '@adonisjs/auth/mixins/lucid'
import hash from '@adonisjs/core/services/hash'
import { compose } from '@adonisjs/core/helpers'

const AuthFinder = withAuthFinder(() => hash.use('scrypt'), {
  uids: ['email'],
  passwordColumnName: 'password',
})

export default class Personne extends compose(BaseModel, AuthFinder) {
  @column({ isPrimary: true })
  declare id: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @column()
  declare prenom: string

  @column()
  declare nom: string

  @column()
  declare email: string

  @column()
  declare telephone: string

  @column()
  declare username: string

  @column()
  declare password: string

  @column()
  declare role: string

  @column()
  declare id_ville: number

  @hasOne(() => Voiture)
  declare voiture: HasOne<typeof Voiture>

  @hasMany(() => Conversation, {
    foreignKey: 'id_personne_1',
  })
  declare personne1: HasMany<typeof Conversation>

  @hasMany(() => Conversation, {
    foreignKey: 'id_personne_2',
  })
  declare personne2: HasMany<typeof Conversation>

  @hasMany(() => Trajet, { foreignKey: 'id_personne' })
  declare trajets: HasMany<typeof Trajet>

  @belongsTo(() => Ville, { foreignKey: 'id_ville' })
  declare ville: BelongsTo<typeof Ville>

  @manyToMany(() => Trajet, {
    localKey: 'id',
    relatedKey: 'id',
    pivotForeignKey: 'id_personne',
    pivotRelatedForeignKey: 'id_trajet',
    pivotTable: 'inscrire',
  })
  declare trajetsInscris: ManyToMany<typeof Trajet>
}
