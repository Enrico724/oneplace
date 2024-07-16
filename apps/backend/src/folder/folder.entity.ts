import { Entity, PrimaryGeneratedColumn, Column, OneToMany, Tree, TreeChildren, TreeParent, ManyToOne } from 'typeorm';
import { User } from 'src/user/user.entity';
import { File } from 'src/file/file.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
@Tree("closure-table")
export class Folder {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @Column()
  name: string;

  @TreeParent()
  parent: Folder;

  @ManyToOne(() => User)
  owner: User;

  @ApiProperty()
  @TreeChildren()
  subfolders: Folder[];

  @ApiProperty()
  @OneToMany(() => File, file => file.folder)
  files: File[];
}
