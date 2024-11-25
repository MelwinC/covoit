import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column, hasMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import Message from '#models/message'
import Personne from './personne.js'

export default class Conversation extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @hasMany(() => Message)
  declare messages: HasMany<typeof Message>

  @column()
  declare id_personne_1: number

  @column()
  declare id_personne_2: number

  @belongsTo(() => Personne, { foreignKey: 'id_personne_1' })
  declare personne1: BelongsTo<typeof Personne>

  @belongsTo(() => Personne, { foreignKey: 'id_personne_2' })
  declare personne2: BelongsTo<typeof Personne>
}
