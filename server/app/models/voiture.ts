import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Personne from '#models/personne'
import Marque from '#models/marque'

export default class Voiture extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @column()
  declare immatriculation: string

  @column()
  declare modele: string

  @column()
  declare place: number

  @column()
  declare id_personne: number

  @column()
  declare id_marque: number

  @belongsTo(() => Personne)
  declare personne: BelongsTo<typeof Personne>

  @belongsTo(() => Marque)
  declare marque: BelongsTo<typeof Marque>
}
