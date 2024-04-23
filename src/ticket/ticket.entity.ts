import { BaseEntity } from 'src/database/base.entity';
import { User } from 'src/user/user.entity';
import { Entity, Column, ManyToOne, Index } from 'typeorm';

@Entity()
export class Ticket extends BaseEntity {
  @ManyToOne(() => User, (user) => user.tickets, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  holder: User | null;

  @Column()
  event: string;

  @Index('ticket_date')
  @Column()
  date: Date;
}
