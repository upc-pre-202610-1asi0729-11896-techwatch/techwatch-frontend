import {BaseEntity} from '../../../../shared/interface/base-entity';
import {SpaceEntity} from './space-entity';

export type PropertyType = 'HOUSE' | 'APARTMENT';

/**
 * Property aggregate root: a house or apartment owned by a user, composed of
 * spaces (ambients). Mirrors the backend Device Management `Property`.
 */
export class PropertyEntity implements BaseEntity {
  private _id: number;
  private _userId: number;
  private _name: string;
  private _address: string;
  private _type: string;
  private _spaces: SpaceEntity[];

  constructor(property: {
    id: number;
    userId: number;
    name: string;
    address: string;
    type: string;
    spaces?: SpaceEntity[];
  }) {
    this._id = property.id;
    this._userId = property.userId;
    this._name = property.name;
    this._address = property.address;
    this._type = property.type;
    this._spaces = property.spaces ?? [];
  }

  get id(): number { return this._id; }
  set id(value: number) { this._id = value; }

  get userId(): number { return this._userId; }
  set userId(value: number) { this._userId = value; }

  get name(): string { return this._name; }
  set name(value: string) { this._name = value; }

  get address(): string { return this._address; }
  set address(value: string) { this._address = value; }

  get type(): string { return this._type; }
  set type(value: string) { this._type = value; }

  get spaces(): SpaceEntity[] { return this._spaces; }
  set spaces(value: SpaceEntity[]) { this._spaces = value; }
}
