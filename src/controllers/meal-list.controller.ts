import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
} from '@loopback/rest';
import {MealList} from '../models';
import {MealListRepository} from '../repositories';

export class MealListController {
  constructor(
    @repository(MealListRepository)
    public mealListRepository : MealListRepository,
  ) {}

  @post('/meal-lists', {
    responses: {
      '200': {
        description: 'MealList model instance',
        content: {'application/json': {schema: getModelSchemaRef(MealList)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(MealList, {
            title: 'NewMealList',
            exclude: ['id'],
          }),
        },
      },
    })
    mealList: Omit<MealList, 'id'>,
  ): Promise<MealList> {
    return this.mealListRepository.create(mealList);
  }

  @get('/meal-lists/count', {
    responses: {
      '200': {
        description: 'MealList model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(MealList) where?: Where<MealList>,
  ): Promise<Count> {
    return this.mealListRepository.count(where);
  }

  @get('/meal-lists', {
    responses: {
      '200': {
        description: 'Array of MealList model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(MealList, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(MealList) filter?: Filter<MealList>,
  ): Promise<MealList[]> {
    return this.mealListRepository.find(filter);
  }

  @patch('/meal-lists', {
    responses: {
      '200': {
        description: 'MealList PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(MealList, {partial: true}),
        },
      },
    })
    mealList: MealList,
    @param.where(MealList) where?: Where<MealList>,
  ): Promise<Count> {
    return this.mealListRepository.updateAll(mealList, where);
  }

  @get('/meal-lists/{id}', {
    responses: {
      '200': {
        description: 'MealList model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(MealList, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(MealList, {exclude: 'where'}) filter?: FilterExcludingWhere<MealList>
  ): Promise<MealList> {
    return this.mealListRepository.findById(id, filter);
  }

  @patch('/meal-lists/{id}', {
    responses: {
      '204': {
        description: 'MealList PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(MealList, {partial: true}),
        },
      },
    })
    mealList: MealList,
  ): Promise<void> {
    await this.mealListRepository.updateById(id, mealList);
  }

  @put('/meal-lists/{id}', {
    responses: {
      '204': {
        description: 'MealList PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() mealList: MealList,
  ): Promise<void> {
    await this.mealListRepository.replaceById(id, mealList);
  }

  @del('/meal-lists/{id}', {
    responses: {
      '204': {
        description: 'MealList DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.mealListRepository.deleteById(id);
  }
}
