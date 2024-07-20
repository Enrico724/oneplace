import { Entity, PrimaryGeneratedColumn, Column, OneToMany, Tree, TreeChildren, TreeParent, ManyToOne, OneToOne } from 'typeorm';
import { User } from 'src/user/user.entity';
import { File } from 'src/file/file.entity';
import { ApiProperty } from '@nestjs/swagger';
import { SharedFolder } from 'src/share/share.entity';
import { share } from 'rxjs';

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

  @ApiProperty({ type: Folder, isArray: true })
  @TreeChildren()
  subfolders: Folder[];

  @ApiProperty({ type: File, isArray: true })
  @OneToMany(() => File, file => file.folder)
  files: File[];

  @ApiProperty({ type: SharedFolder })
  @OneToOne(() =>  SharedFolder, share => share.folder)
  share: SharedFolder
}
