import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { Todo } from 'src/todos/entites/todo.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('users')
export class User {
  @ApiProperty({ example: 1, description: 'The unique identifier of the user' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    example: 'john@example.com',
    description: 'The email address of the user',
  })
  @Column({ unique: true })
  email: string;

  @Exclude()
  @Column()
  password: string;

  @ApiProperty({ example: 'John', description: 'The first name of the user' })
  @Column()
  firstName: string;

  @ApiProperty({ example: 'Doe', description: 'The last name of the user' })
  @Column()
  lastName: string;

  @ApiProperty({ description: 'The date when the user was created' })
  @CreateDateColumn()
  createAt: Date;

  @ApiProperty({ description: 'The date when the user was last updated' })
  @UpdateDateColumn()
  updateAt: Date;

  @ApiProperty({
    type: () => [Todo],
    description: 'The todos that belong to the user',
  })
  @OneToMany(() => Todo, (todo) => todo.user)
  todos: Todo[];
}
