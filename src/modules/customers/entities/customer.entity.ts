import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name:'cliente'})
export class Customer {

    @PrimaryGeneratedColumn()
    id:number;

    @Column({nullable:false})
    nombre_completo:string;

    @Column()
    direccion:string;

    @Column()
    telefono:string;

    @Column()
    email:string;

    @Column()
    nit:string;

    @Column()
    notas:string;

    @Column()
    fecha_creacion:Date;

}
