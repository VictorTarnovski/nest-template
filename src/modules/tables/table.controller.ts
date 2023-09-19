import { Controller, Get, Post, Body, Param } from "@nestjs/common"
import { TableService } from "./table.service"
import { CreateTableDto } from "./dto/create-table.dto"

@Controller("tables")
export class TableController {
  constructor(private readonly tableService: TableService) {}

  @Post()
  create(@Body() createTableDto: CreateTableDto) {
    return this.tableService.create(createTableDto)
  }

  @Get()
  findAll() {
    return this.tableService.findAll()
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.tableService.findOne(id)
  }
}
