import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {Meal, MealRelations, MealList} from '../models';
import {DbDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {MealListRepository} from './meal-list.repository';

export class MealRepository extends DefaultCrudRepository<
  Meal,
  typeof Meal.prototype.id,
  MealRelations
> {

  public readonly mealList: BelongsToAccessor<MealList, typeof Meal.prototype.id>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource, @repository.getter('MealListRepository') protected mealListRepositoryGetter: Getter<MealListRepository>,
  ) {
    super(Meal, dataSource);
    this.mealList = this.createBelongsToAccessorFor('mealList', mealListRepositoryGetter,);
    this.registerInclusionResolver('mealList', this.mealList.inclusionResolver);
  }
}
