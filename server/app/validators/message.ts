import vine from '@vinejs/vine'

export const createMessageValidator = vine.compile(
  vine.object({
    contenu: vine.string(),
  })
)
