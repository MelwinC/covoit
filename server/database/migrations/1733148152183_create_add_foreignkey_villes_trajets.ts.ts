import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'trajets'

  async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.integer('id_ville_1').unsigned().references('id').inTable('villes').onDelete('CASCADE')
      table.integer('id_ville_2').unsigned().references('id').inTable('villes').onDelete('CASCADE')
    })
  }

  async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropForeign('id_ville_1')
      table.dropForeign('id_ville_2')
    })
  }
}
