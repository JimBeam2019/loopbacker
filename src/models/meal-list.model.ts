import {Entity, model, property, hasMany} from '@loopback/repository';
import {Meal} from './meal.model';

@model()
export class MealList extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: false,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
  })
  title: string;

  @property({
    type: 'string',
  })
  type?: string;

  @hasMany(() => Meal)
  meals: Meal[];

  constructor(data?: Partial<MealList>) {
    super(data);
  }
}

export interface MealListRelations {
  // describe navigational properties here
}

export type MealListWithRelations = MealList & MealListRelations;
