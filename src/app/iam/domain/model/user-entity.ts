import {BaseEntity} from '../../../shared/interface/base-entity';

/**
 * User aggregate root for the IAM context: the identity returned after
 * authentication. Mirrors the backend IAM `User`.
 */
export class UserEntity implements BaseEntity {
  private _id: number;
  private _name: string;
  private _email: string;

  constructor(user: {id: number; name: string; email: string}) {
    this._id = user.id;
    this._name = user.name;
    this._email = user.email;
  }

  get id(): number { return this._id; }
  set id(value: number) { this._id = value; }

  get name(): string { return this._name; }
  set name(value: string) { this._name = value; }

  get email(): string { return this._email; }
  set email(value: string) { this._email = value; }
}
