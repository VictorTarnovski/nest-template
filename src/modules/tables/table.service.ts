import { Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { Repository } from "typeorm"
import { CreateTableDto } from "./dto/create-table.dto"
import { Table } from "./entities/table.entity"

@Injectable()
export class TableService {
  constructor(
    @InjectRepository(Table)
    private readonly tableRepository: Repository<Table>,
  ) {}
  async create(createTableDto: CreateTableDto) {
    return await this.tableRepository.save(createTableDto)
  }

  async findAll(): Promise<Table[]> {
    return await this.tableRepository.find()
  }

  async findOne(id: string): Promise<Table> {
    return await this.tableRepository.findOneBy({ id })
  }
}
