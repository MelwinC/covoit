import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'trajets'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.integer('km').notNullable()
      table.integer('place_proposees').notNullable()
      table.dateTime('dateT').notNullable()
      table
        .integer('id_personne')
        .unsigned()
        .references('id')
        .inTable('personnes')
        .onDelete('CASCADE')
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
