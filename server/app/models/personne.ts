import { DateTime } from 'luxon'
import { BaseModel, column, hasOne } from '@adonisjs/lucid/orm'
import type { HasOne } from '@adonisjs/lucid/types/relations'
import Voiture from '#models/voiture'

export default class Personne extends BaseModel {
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

  @hasOne(() => Voiture)
  declare voiture: HasOne<typeof Voiture>
}
