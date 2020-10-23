import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Meal,
  MealList,
} from '../models';
import {MealRepository} from '../repositories';

export class MealMealListController {
  constructor(
    @repository(MealRepository)
    public mealRepository: MealRepository,
  ) { }

  @get('/meals/{id}/meal-list', {
    responses: {
      '200': {
        description: 'MealList belonging to Meal',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(MealList)},
          },
        },
      },
    },
  })
  async getMealList(
    @param.path.number('id') id: typeof Meal.prototype.id,
  ): Promise<MealList> {
    return this.mealRepository.mealList(id);
  }
}
