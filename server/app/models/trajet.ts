import { DateTime } from 'luxon'
import { BaseModel, column, hasMany, manyToMany } from '@adonisjs/lucid/orm'
import type { HasMany, ManyToMany } from '@adonisjs/lucid/types/relations'
import Personne from '#models/personne'

export default class Trajet extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare km: number

  @column()
  declare place_proposees: number

  @column.dateTime()
  declare dateT: DateTime

  @column()
  declare prix: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

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
