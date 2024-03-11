import {Restaurant} from "../../shared/models/restaurant";
import {FoodItem} from "../../shared/models/foodItem";

export interface OrderDTO{

  foodItemsList?: FoodItem[];
  userId?: number;
  restaurant?: Restaurant;
}
