import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  MealList,
  Meal,
} from '../models';
import {MealListRepository} from '../repositories';

export class MealListMealController {
  constructor(
    @repository(MealListRepository) protected mealListRepository: MealListRepository,
  ) { }

  @get('/meal-lists/{id}/meals', {
    responses: {
      '200': {
        description: 'Array of MealList has many Meal',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Meal)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Meal>,
  ): Promise<Meal[]> {
    return this.mealListRepository.meals(id).find(filter);
  }

  @post('/meal-lists/{id}/meals', {
    responses: {
      '200': {
        description: 'MealList model instance',
        content: {'application/json': {schema: getModelSchemaRef(Meal)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof MealList.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Meal, {
            title: 'NewMealInMealList',
            exclude: ['id'],
            optional: ['mealListId']
          }),
        },
      },
    }) meal: Omit<Meal, 'id'>,
  ): Promise<Meal> {
    return this.mealListRepository.meals(id).create(meal);
  }

  @patch('/meal-lists/{id}/meals', {
    responses: {
      '200': {
        description: 'MealList.Meal PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Meal, {partial: true}),
        },
      },
    })
    meal: Partial<Meal>,
    @param.query.object('where', getWhereSchemaFor(Meal)) where?: Where<Meal>,
  ): Promise<Count> {
    return this.mealListRepository.meals(id).patch(meal, where);
  }

  @del('/meal-lists/{id}/meals', {
    responses: {
      '200': {
        description: 'MealList.Meal DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Meal)) where?: Where<Meal>,
  ): Promise<Count> {
    return this.mealListRepository.meals(id).delete(where);
  }
}
