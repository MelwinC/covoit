import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'trajets'

  async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('id_user_proposeur')
      table.integer('prix').notNullable().defaultTo(5)
    })
  }

  async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.integer('id_user_proposeur')
      table.dropColumn('prix')
    })
  }
}
