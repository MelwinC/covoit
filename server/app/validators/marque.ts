import vine from '@vinejs/vine'

export const createMarqueValidator = vine.compile(
  vine.object({
    nom: vine.string(),
  })
)
