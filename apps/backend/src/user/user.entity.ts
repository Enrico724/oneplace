import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { FolderUserPermission } from 'src/share/share.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  auth0Id: string;

  @OneToMany(() => FolderUserPermission, permission => permission.user)
  sharedPermission: FolderUserPermission[];
}
