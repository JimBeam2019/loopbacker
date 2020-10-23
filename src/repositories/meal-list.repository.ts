import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MealList, MealListRelations, Meal} from '../models';
import {DbDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {MealRepository} from './meal.repository';

export class MealListRepository extends DefaultCrudRepository<
  MealList,
  typeof MealList.prototype.id,
  MealListRelations
> {

  public readonly meals: HasManyRepositoryFactory<Meal, typeof MealList.prototype.id>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource, @repository.getter('MealRepository') protected mealRepositoryGetter: Getter<MealRepository>,
  ) {
    super(MealList, dataSource);
    this.meals = this.createHasManyRepositoryFactoryFor('meals', mealRepositoryGetter,);
    this.registerInclusionResolver('meals', this.meals.inclusionResolver);
  }

  /**
   * findByTitle
   *
   * @param {string} title
   * @returns
   * @memberof MealListRepository
   */
  public findByTitle(title: string) {
    return this.findOne({where: {title}})
  }
}
