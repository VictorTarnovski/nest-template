import { Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { Repository } from "typeorm"
import { CreateTableDto } from "./dto/create-table.dto"
import { Table } from "./entities/table.entity"
import { EventsGateway } from "../events/events.gateway"

@Injectable()
export class TableService {
  constructor(
    @InjectRepository(Table)
    private readonly tableRepository: Repository<Table>,
    private readonly eventsGateway: EventsGateway,
  ) {}
  async create(createTableDto: CreateTableDto) {
    const table = await this.tableRepository.save(createTableDto)
    this.eventsGateway.sendNewResourceMessage("table", table)
    return table
  }

  async findAll(): Promise<Table[]> {
    return await this.tableRepository.find()
  }

  async findOne(id: string): Promise<Table> {
    return await this.tableRepository.findOneBy({ id })
  }
}
