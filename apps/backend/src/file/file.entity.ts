import { ApiProperty } from '@nestjs/swagger';
import { Folder } from 'src/folder/folder.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

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

  @ManyToOne(() => Folder, folder => folder.files, { nullable: true })
  folder: Folder;
}
