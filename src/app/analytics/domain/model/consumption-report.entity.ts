import {BaseEntity} from '../../../shared/interface/base-entity';
import {ReportItem} from './report-item.entity';

/** A consumption report generated for a property over a period. */
export class ConsumptionReport implements BaseEntity {
  private _id: number;
  private _userId: number;
  private _propertyId: number;
  private _periodStart: string;
  private _periodEnd: string;
  private _totalConsumption: number;
  private _unit: string;
  private _generatedAt: string;
  private _items: ReportItem[];

  constructor(report: {
    id: number;
    userId: number;
    propertyId: number;
    periodStart: string;
    periodEnd: string;
    totalConsumption: number;
    unit: string;
    generatedAt: string;
    items?: ReportItem[];
  }) {
    this._id = report.id;
    this._userId = report.userId;
    this._propertyId = report.propertyId;
    this._periodStart = report.periodStart;
    this._periodEnd = report.periodEnd;
    this._totalConsumption = report.totalConsumption;
    this._unit = report.unit;
    this._generatedAt = report.generatedAt;
    this._items = report.items ?? [];
  }

  get id(): number { return this._id; }
  set id(value: number) { this._id = value; }

  get userId(): number { return this._userId; }
  set userId(value: number) { this._userId = value; }

  get propertyId(): number { return this._propertyId; }
  set propertyId(value: number) { this._propertyId = value; }

  get periodStart(): string { return this._periodStart; }
  set periodStart(value: string) { this._periodStart = value; }

  get periodEnd(): string { return this._periodEnd; }
  set periodEnd(value: string) { this._periodEnd = value; }

  get totalConsumption(): number { return this._totalConsumption; }
  set totalConsumption(value: number) { this._totalConsumption = value; }

  get unit(): string { return this._unit; }
  set unit(value: string) { this._unit = value; }

  get generatedAt(): string { return this._generatedAt; }
  set generatedAt(value: string) { this._generatedAt = value; }

  get items(): ReportItem[] { return this._items; }
  set items(value: ReportItem[]) { this._items = value; }
}
