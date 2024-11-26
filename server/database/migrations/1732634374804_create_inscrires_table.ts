import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'inscrire'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table
        .integer('id_personne')
        .unsigned()
        .references('id')
        .inTable('personnes')
        .onDelete('CASCADE')
      table.integer('id_trajet').unsigned().references('id').inTable('trajets').onDelete('CASCADE')
      table.unique(['id_personne', 'id_trajet'])

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
