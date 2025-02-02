import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/auth/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('todos')
export class Todo {
  @ApiProperty({ example: 1, description: 'The unique identifier of the todo' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    example: 'Buy groceries',
    description: 'The title of the todo',
  })
  @Column()
  title: string;

  @ApiProperty({
    example: 'Need to buy milk and bread',
    description: 'The detailed description of the todo',
    required: false,
  })
  @Column({ nullable: true })
  description: string;

  @ApiProperty({
    example: false,
    description: 'Whether the todo is completed',
    default: false,
  })
  @Column({ default: false })
  isComplete: boolean;

  @ApiProperty({
    example: '2024-12-31T23:59:59Z',
    description: 'The due date of the todo',
    required: false,
  })
  @Column({ nullable: true })
  dueDate: Date;

  @ApiProperty({ description: 'The date when the todo was created' })
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty({ description: 'The date when the todo was last updated' })
  @UpdateDateColumn()
  updatedAt: Date;

  @ApiProperty({ type: () => User, description: 'The user who owns this todo' })
  @ManyToOne(() => User, (user) => user.todos)
  user: User;

  @ApiProperty({
    example: 1,
    description: 'The ID of the user who owns this todo',
  })
  @Column()
  userId: number;
}
