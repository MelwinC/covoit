import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column, hasMany, manyToMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasMany, ManyToMany } from '@adonisjs/lucid/types/relations'
import Personne from '#models/personne'
import Ville from '#models/ville'

export default class Trajet extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare km: number

  @column()
  declare place_proposees: number

  @column.dateTime({ columnName: 'dateT' })
  declare dateT: DateTime

  @column()
  declare prix: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @column()
  declare id_ville_1: number

  @column()
  declare id_ville_2: number

  @column()
  declare id_personne: number

  @column()
  declare id_user_proposeur: number

  @belongsTo(() => Ville, { foreignKey: 'id_ville_1' })
  declare ville1: BelongsTo<typeof Ville>

  @belongsTo(() => Ville, { foreignKey: 'id_ville_2' })
  declare ville2: BelongsTo<typeof Ville>

  @hasMany(() => Trajet, { foreignKey: 'id_personne' })
  declare personne: HasMany<typeof Trajet>

  @manyToMany(() => Personne, {
    localKey: 'id',
    relatedKey: 'id',
    pivotForeignKey: 'id_trajet',
    pivotRelatedForeignKey: 'id_personne',
    pivotTable: 'inscrire',
  })
  declare personnes: ManyToMany<typeof Personne>
}
