import { FolderUserPermission } from 'src/share/file-permission.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  auth0Id: string;

  @OneToMany(() => FolderUserPermission, permission => permission.user)
  sharedPermission: FolderUserPermission[];
}
