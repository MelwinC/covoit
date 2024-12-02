import vine from '@vinejs/vine'
import { DateTime } from 'luxon'

export const createTrajetValidator = vine.compile(
  vine.object({
    km: vine.number().min(0),
    place_proposees: vine.number().min(0),
    prix: vine.number().min(0),
    id_ville_1: vine.number().min(0),
    id_ville_2: vine.number().min(0),
  })
)
