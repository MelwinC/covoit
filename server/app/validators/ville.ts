import vine from '@vinejs/vine'

export const createVilleValidator = vine.compile(
  vine.object({
    ville: vine.string().minLength(2).maxLength(50).alpha(),
    codePostal: vine.number().min(1000).max(99999),
  })
)
