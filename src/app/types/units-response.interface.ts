import {ILocation} from "./location.interface";

export interface IUnitsResponse{
  current_country_id:number,
  locations:ILocation[]
}
