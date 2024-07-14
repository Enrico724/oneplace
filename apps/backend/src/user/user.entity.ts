import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Folder } from 'src/folder/folder.entity';
import { File } from 'src/file/file.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  auth0Id: string;

  @Column()
  email: string;

  @OneToMany(() => Folder, folder => folder.user)
  folders: Folder[];

  @OneToMany(() => File, file => file.user)
  files: File[];
}
