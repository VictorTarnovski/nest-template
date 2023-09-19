import { maxNameLength } from "../../contants"
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity("tables")
export class Table {
  @PrimaryGeneratedColumn("uuid")
  id: string

  @Column({ type: "varchar", length: maxNameLength, nullable: false })
  name: string
}
