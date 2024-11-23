import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';

@Injectable()
export class ClientService {
  constructor(private prisma: PrismaService) {}

  async getAllClients() {
    return this.prisma.client.findMany();
  }

  async createClient(createClientDto: CreateClientDto) {
    return this.prisma.client.create({
      data: {
        ...createClientDto,
        birthday: createClientDto.birthday
          ? new Date(createClientDto.birthday)
          : undefined,
      },
    });
  }

  async getClientByPhone(phone: string) {
    return this.prisma.client.findUnique({
      where: { phone },
    });
  }

  async updateClient(id: number, updateClientDto: UpdateClientDto) {
    return this.prisma.client.update({
      where: { id },
      data: {
        ...updateClientDto,
        birthday: updateClientDto.birthday
          ? new Date(updateClientDto.birthday)
          : undefined,
      },
    });
  }

  async deleteClient(id: number) {
    return this.prisma.client.delete({
      where: { id },
    });
  }
}
