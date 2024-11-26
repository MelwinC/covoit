import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'personnes'

  async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.integer('id_ville').unsigned().references('id').inTable('villes').onDelete('CASCADE')
    })
  }

  async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropForeign('id_ville')
    })
  }
}
