import {BaseEntity} from '../../../shared/interface/base-entity';

export type SubscriptionPlan = 'free' | 'premium';

/** Subscription details for premium users. */
export class SubscriptionEntity {
  private _startedAt: string;
  private _expiresAt: string;

  constructor(subscription: {startedAt: string; expiresAt: string}) {
    this._startedAt = subscription.startedAt;
    this._expiresAt = subscription.expiresAt;
  }

  get startedAt(): string { return this._startedAt; }
  set startedAt(value: string) { this._startedAt = value; }

  get expiresAt(): string { return this._expiresAt; }
  set expiresAt(value: string) { this._expiresAt = value; }
}

/**
 * User profile aggregate root: extended user data including plan and
 * subscription. Mirrors the backend Profile `UserProfile`.
 */
export class UserProfileEntity implements BaseEntity {
  private _id: number;
  private _name: string;
  private _email: string;
  private _plan: string;
  private _createdAt: string;
  private _subscription: SubscriptionEntity | null;

  constructor(profile: {
    id: number;
    name: string;
    email: string;
    plan: string;
    createdAt: string;
    subscription?: SubscriptionEntity | null;
  }) {
    this._id = profile.id;
    this._name = profile.name;
    this._email = profile.email;
    this._plan = profile.plan;
    this._createdAt = profile.createdAt;
    this._subscription = profile.subscription ?? null;
  }

  get id(): number { return this._id; }
  set id(value: number) { this._id = value; }

  get name(): string { return this._name; }
  set name(value: string) { this._name = value; }

  get email(): string { return this._email; }
  set email(value: string) { this._email = value; }

  get plan(): string { return this._plan; }
  set plan(value: string) { this._plan = value; }

  get createdAt(): string { return this._createdAt; }
  set createdAt(value: string) { this._createdAt = value; }

  get subscription(): SubscriptionEntity | null { return this._subscription; }
  set subscription(value: SubscriptionEntity | null) { this._subscription = value; }

  get isPremium(): boolean {
    return this._plan === 'premium';
  }
}
