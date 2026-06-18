import {BaseEntity} from '../../../../shared/interface/base-entity';

/**
 * Space (ambient) of a property. Internal entity of the Property aggregate;
 * it has no lifecycle of its own outside its property.
 */
export class SpaceEntity implements BaseEntity {
  private _id: number;
  private _name: string;
  private _description: string;

  constructor(space: { id: number; name: string; description: string }) {
    this._id = space.id;
    this._name = space.name;
    this._description = space.description;
  }

  get id(): number { return this._id; }
  set id(value: number) { this._id = value; }

  get name(): string { return this._name; }
  set name(value: string) { this._name = value; }

  get description(): string { return this._description; }
  set description(value: string) { this._description = value; }
}
