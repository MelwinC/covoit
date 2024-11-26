import { DateTime } from 'luxon'
import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import type { HasMany } from '@adonisjs/lucid/types/relations'

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
}
