import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { User } from 'src/user/user.entity';
import { File } from 'src/file/file.entity';

@Entity()
export class Folder {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @ManyToOne(() => User, user => user.folders)
  user: User;

  @ManyToOne(() => Folder, folder => folder.subfolders, { nullable: true })
  parentFolder: Folder;

  @OneToMany(() => Folder, folder => folder.parentFolder)
  subfolders: Folder[];

  @OneToMany(() => File, file => file.folder)
  files: File[];
}
