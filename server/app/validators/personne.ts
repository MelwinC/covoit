import vine from '@vinejs/vine'

/**
 * Validates the post's creation action
 */
export const createPersonneValidator = vine.compile(
  vine.object({
    prenom: vine.string().minLength(2).maxLength(50).alpha(),
    nom: vine.string().minLength(2).maxLength(50).alpha(),
    email: vine.string().email(),
    telephone: vine.string(),
    username: vine.string(),
    password: vine.string(),
  })
)
