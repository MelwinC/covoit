import vine from '@vinejs/vine'

export const createVoitureValidator = vine.compile(
  vine.object({
    immatriculation: vine.string(),
    modele: vine.string(),
    place: vine.number(),
    id_marque: vine.number(),
  })
)
