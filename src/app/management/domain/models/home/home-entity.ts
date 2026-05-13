import {BaseEntity} from '../../../../shared/interface/base-entity';

export class HomeEntity implements BaseEntity{
  private  _id: number;
  private  _name: string;
  private  _type: string;
  private  _userId: number;

  constructor(homes: {
    id: number;
    name: string;
    type: string;
    userId: number;
  }) {

    this._id = homes.id;
    this._name = homes.name;
    this._type = homes.type;
    this._userId = homes.userId;
  }

  get id(): number {return this._id;}
  set id(value: number) {this._id = value;}


  get name(): string {return this._name;}
  set name(value: string) {this._name = value;}

  get type(): string {return this._type;}
  set type(value: string) {this._type = value;}

  get userId(): number {return this._userId;}
  set userId(value: number) {this._userId = value;}
}
