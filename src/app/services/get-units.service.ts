import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {IUnitsResponse} from "../types/units-response.interface";

@Injectable({
  providedIn: 'root',
})
export class GetUnitsService {
  readonly api = "https://test-frontend-developer.s3.amazonaws.com/data/locations.json"
  httpClient = inject(HttpClient)

  getAllUnites(): Observable<IUnitsResponse>{
    return this.httpClient.get<IUnitsResponse>(this.api)
  }
}
