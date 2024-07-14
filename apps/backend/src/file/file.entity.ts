import { Folder } from 'src/folder/folder.entity';
import { User } from 'src/user/user.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@Entity()
export class File {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  path: string;

  @Column()
  size: number;

  @Column()
  mimeType: string;

  @ManyToOne(() => User, user => user.files)
  user: User;

  @ManyToOne(() => Folder, folder => folder.files, { nullable: true })
  folder: Folder;
}
