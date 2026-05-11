
export class HomeEntity {
  private readonly _id: number;
  private readonly _name: string;
  private readonly _type: string;
  private readonly _userId: number;

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

  get id(): number {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  get type(): string {
    return this._type;
  }

  get userId(): number {
    return this._userId;
  }
}
