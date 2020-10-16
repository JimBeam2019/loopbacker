import {Entity, model, property} from '@loopback/repository';

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


  constructor(data?: Partial<Meal>) {
    super(data);
  }
}

export interface MealRelations {
  // describe navigational properties here
}

export type MealWithRelations = Meal & MealRelations;
