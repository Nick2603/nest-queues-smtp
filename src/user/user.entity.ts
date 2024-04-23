import { BaseEntity } from 'src/database/base.entity';
import { Ticket } from 'src/ticket/ticket.entity';
import { Entity, Column, OneToMany, Index } from 'typeorm';

@Index(['firstName', 'lastName'], { unique: true })
@Entity()
export class User extends BaseEntity {
  @Column({ name: 'first_name' })
  firstName: string;

  @Column({ name: 'last_name' })
  lastName: string;

  @Column({ default: true, name: 'is_active' })
  isActive: boolean;

  @OneToMany(() => Ticket, (ticket) => ticket.holder, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  tickets: Ticket[];

  // Alternative
  // @OneToMany('Ticket', 'holder', {
  //   onUpdate: 'CASCADE',
  //   onDelete: 'CASCADE',
  // })
  // tickets: Ticket[];
}
