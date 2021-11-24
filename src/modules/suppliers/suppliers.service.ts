import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateSupplierDto } from './dto/create-supplier.dto';
import { UpdateSupplierDto } from './dto/update-supplier.dto';
import { Supplier } from './entities/supplier.entity';

@Injectable()
export class SuppliersService {

  constructor(@InjectRepository(Supplier) private repository:Repository<Supplier>){}

  async create(createSupplierDto: CreateSupplierDto) {
    if(!await this.repository.findOne({nombre:createSupplierDto.nombre})){
      return this.repository.save(createSupplierDto);
    }else{
     throw new HttpException('El proveedor ya existe',HttpStatus.NOT_ACCEPTABLE);
   }
  }

  findAll() {
    return this.repository.find();
  }

  findOne(id: number) {
    return this.repository.findOne(id);
  }

  async update(id: number, updateSupplierDto: UpdateSupplierDto) {
    const inst = await this.repository.findOne({nombre:updateSupplierDto.nombre});
    if(!inst || inst.id == id){
      return (await this.repository.update(id,updateSupplierDto)).affected;
    }else{
     throw new HttpException('El proveedor ya existe',HttpStatus.NOT_ACCEPTABLE);
   }
  }

  async remove(id: number) {
    return (await this.repository.delete(id)).affected;
  }

  async findtoFill(){
    const fill = await this.repository.createQueryBuilder('obj')
    .select(["obj.id","obj.nombre"])
    .getMany();
    return fill;
  }

}
