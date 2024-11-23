import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ClientService } from './client.service';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';

@Controller('clients')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @Get()
  async getAllClients() {
    return this.clientService.getAllClients();
  }

  @Post()
  async create(@Body() createClientDto: CreateClientDto) {
    return this.clientService.createClient(createClientDto);
  }

  @Get(':phone')
  async getByPhone(@Param('phone') phone: string) {
    return this.clientService.getClientByPhone(phone);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateClientDto: UpdateClientDto,
  ) {
    return this.clientService.updateClient(+id, updateClientDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.clientService.deleteClient(+id);
  }
}
