import { DateTime } from 'luxon'
import { BaseModel, column, hasMany, hasOne } from '@adonisjs/lucid/orm'
import type { HasMany, HasOne } from '@adonisjs/lucid/types/relations'
import Personne from '#models/personne'
import Trajet from '#models/trajet'

export default class Ville extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare ville: string

  @column({ columnName: 'code_postal' })
  declare codePostal: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @hasMany(() => Personne, { foreignKey: 'id_ville' })
  declare personne: HasMany<typeof Personne>

  @hasOne(() => Trajet, { foreignKey: 'id_ville_1' })
  declare trajet1: HasOne<typeof Trajet>

  @hasOne(() => Trajet, { foreignKey: 'id_ville_2' })
  declare trajet2: HasOne<typeof Trajet>
}
