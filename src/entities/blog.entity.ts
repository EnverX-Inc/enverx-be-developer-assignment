import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('blogs')
export class Blogs {
  @PrimaryGeneratedColumn('uuid')
  blog_id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  category: string;

  @CreateDateColumn()
  c_ts: Date;

  @UpdateDateColumn()
  u_ts: Date;
}
