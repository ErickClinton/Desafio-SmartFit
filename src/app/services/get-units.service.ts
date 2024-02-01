import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable} from "rxjs";
import {IUnitsResponse} from "../types/units-response.interface";
import {ILocation} from "../types/location.interface";

@Injectable({
  providedIn: 'root',
})
export class GetUnitsService {
  readonly api = "https://test-frontend-developer.s3.amazonaws.com/data/locations.json"
  httpClient = inject(HttpClient)

  private allUnitsSubject: BehaviorSubject<ILocation[]> = new BehaviorSubject<ILocation[]>([])
  private allUnits$:Observable<ILocation[]> = this.allUnitsSubject.asObservable()
  private filteredUnits:ILocation[] = []

  constructor() {
     this.httpClient.get<IUnitsResponse>(this.api).subscribe(data=>{
        this.allUnitsSubject.next(data.locations)
        this.filteredUnits = data.locations
    })
  }
  getAllUnits(): Observable<ILocation[]>{
    return this.allUnits$
  }

  getFilterUnites(){
    return this.filteredUnits
  }

  setFilteredUnits(value:ILocation[]){
    this.filteredUnits=value
  }
}
