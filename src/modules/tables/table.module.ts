import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { TableService } from "./table.service"
import { TableController } from "./table.controller"
import { Table } from "./entities/table.entity"
import { EventsModule } from "../events/events.module"

@Module({
  imports: [TypeOrmModule.forFeature([Table]), EventsModule],
  controllers: [TableController],
  providers: [TableService],
  exports: [TableService],
})
export class TableModule {}
