import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Conversation from '#models/conversation'
import Personne from '#models/personne'

export default class Message extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare contenu: string

  @column()
  declare id_conversation: number

  @column()
  declare id_personne: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => Conversation, { foreignKey: 'id_conversation' })
  declare conversation: BelongsTo<typeof Conversation>

  @belongsTo(() => Personne, { foreignKey: 'id_personne' })
  declare personne: BelongsTo<typeof Personne>
}
