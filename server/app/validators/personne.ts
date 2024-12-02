import vine from '@vinejs/vine'

export const createPersonneValidator = vine.compile(
  vine.object({
    prenom: vine.string().minLength(2).maxLength(50).alpha(),
    nom: vine.string().minLength(2).maxLength(50).alpha(),
    email: vine.string().email(),
    telephone: vine.string(),
    username: vine.string(),
    password: vine.string(),
    id_ville: vine.number(),
  })
)

export const updatePersonneValidator = vine.compile(
  vine.object({
    prenom: vine.string().minLength(2).maxLength(50).alpha().optional(),
    nom: vine.string().minLength(2).maxLength(50).alpha().optional(),
    telephone: vine.string().optional(),
    username: vine.string().optional(),
    id_ville: vine.number().optional(),
  })
)
