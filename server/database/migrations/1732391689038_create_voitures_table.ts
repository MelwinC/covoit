import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'voitures'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.string('immatriculation').notNullable().unique()
      table.string('modele').notNullable()
      table.integer('place').notNullable()
      table.integer('id_personne').unsigned().references('personnes.id').onDelete('CASCADE')
      table.integer('id_marque').unsigned().references('marques.id').onDelete('CASCADE')
      table.timestamp('created_at', { useTz: true }).notNullable().defaultTo(this.now())
      table.timestamp('updated_at', { useTz: true }).notNullable().defaultTo(this.now())
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
