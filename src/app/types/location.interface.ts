import {ISchedules} from "./schedules.interface";

export interface ILocation{
  id:number,
  title:string,
  content:string,
  opened:boolean,
  mask:string,
  towel:string,
  fountain:string,
  locker_room:string,
  schedules:ISchedules[]
}
