import vine from '@vinejs/vine'

export const conversationValidator = vine.compile(
  vine.object({
    id_personne_2: vine.number(),
  })
)
