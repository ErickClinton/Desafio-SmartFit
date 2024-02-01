import { Injectable } from '@angular/core';
import {ILocation} from "../types/location.interface";

const OPPENING_HOURS={
  morning:{
    first:'06',
    last:'12'
  },
  afternoon:{
    first:'12',
    last:'18'
  },
  night:{
    first:'18',
    last:'23'
  }
}
type  HOUR_INDEX = 'morning' | 'afternoon' | 'night'

@Injectable({
  providedIn: 'root'
})
export class FilterUnitsService {

  constructor() { }

  transformWeekDay(weekDay: number){
    switch (weekDay){
      case 0:
        return "Dom."
      case 6:
        return "Sáb."
      default:
        return "Seg. à Sex."
    }
  }

  filterUnits(unit:ILocation, open_hour:string, close_hour:string,){
    if(!unit.schedules) return true;
    let openHourFilter = parseInt(open_hour,10)
    let closeHourFilter = parseInt(close_hour,10)
    let todaysWeekDay = this.transformWeekDay(new Date().getDay())

    for(let i = 0; i< unit.schedules.length ; i++){
      let scheduleHour = unit.schedules[i].hour
      let scheduleWeekDay = unit.schedules[i].weekdays
      if(todaysWeekDay == scheduleWeekDay){
        if(scheduleHour != "Fechada"){
          let [unitOpenHour,unitCloseHour] = scheduleHour.split(' às ')
          let unitOpenHourInt = parseInt(unitOpenHour.replace('h',''),10)
          let unitCloseHourInt = parseInt(unitCloseHour.replace('h',''),10)
          if(unitOpenHourInt <= openHourFilter && unitCloseHourInt >= closeHourFilter){
            return true
          }else{
            return false
          }
        }
      }
    }
    return false
  }
  filter(results:ILocation[],showClosed:boolean,hour:string){
    let intermediateResults = results

    if(!showClosed){
      intermediateResults = results.filter(location =>location.opened == true)
    }
    if(hour){
      const openHour = OPPENING_HOURS[hour as HOUR_INDEX].first
      const clouseHour = OPPENING_HOURS[hour as HOUR_INDEX].last
      return intermediateResults.filter(location=> this.filterUnits(location,openHour,clouseHour))
    }else{
      return intermediateResults
    }
  }
}
