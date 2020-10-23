import {Entity, model, property, belongsTo} from '@loopback/repository';
import {MealList, MealListRelations, MealListWithRelations} from './meal-list.model';

@model()
export class Meal extends Entity {
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
    type: 'number',
    required: true,
  })
  price: number;

  @belongsTo(() => MealList)
  mealListId: number;

  constructor(data?: Partial<Meal>) {
    super(data);
  }
}

export interface MealRelations {
  // describe navigational properties here
  mealList?: MealListWithRelations;
}

export type MealWithRelations = Meal & MealRelations;
