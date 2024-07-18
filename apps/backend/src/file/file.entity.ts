import { ApiProperty } from '@nestjs/swagger';
import { Folder } from 'src/folder/folder.entity';
import { User } from 'src/user/user.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne } from 'typeorm';

@Entity()
export class File {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @Column()
  name: string;

  @ApiProperty()
  @Column()
  size: number;

  @ApiProperty()
  @Column()
  mimeType: string;

  @ApiProperty()
  @OneToOne(() => User)
  user: User;

  @ManyToOne(() => Folder, folder => folder.files, { nullable: true })
  folder: Folder;
}
