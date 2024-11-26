import { DateTime } from 'luxon'
import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import Personne from '#models/personne'

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
}
