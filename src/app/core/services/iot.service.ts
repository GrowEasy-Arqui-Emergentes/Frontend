import { Injectable } from '@angular/core';
import { catchError, Observable, retry, throwError} from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import {ProjectModel} from "../models/project.model";
import {DataModel} from "../models/data.model";
import {CreatePlantModel} from "../models/create.plant.model";
import {PlantModel} from "../models/plant.model";
import {CreateDeviceModel} from "../models/create.device.model";
import {DeviceModel} from "../models/device.model";
import {CreateProjectModel} from "../models/create.project.model";
@Injectable({
  providedIn: 'root'
})
export class IotService{
  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  handleError(error: HttpErrorResponse){
    if(error.error instanceof ErrorEvent){
      console.log(`An error ocurred ${error.status}, body was ${error.error}`);
    }
    else{
      console.log(`Backend returned code ${error.status}, body was ${error.error}`);
    }
    return throwError(
      'Something happened with request, please try again later'
    );
  }

  getProjectsByUserId(userId: any): Observable<ProjectModel>{
    return this.http.get<ProjectModel>('https://iot-service-f5c0fphaeugmbaah.canadacentral-01.azurewebsites.net/api/v1/iot-service/projects/user/' + userId)
      .pipe(retry(2),catchError(this.handleError))
  }

  createProject(data: CreateProjectModel, deviceId: any, plantId: any): Observable<ProjectModel>{
    return this.http.post<ProjectModel>('https://iot-service-f5c0fphaeugmbaah.canadacentral-01.azurewebsites.net/api/v1/iot-service/projects/generate/'+deviceId
      +'/'+plantId, data, this.httpOptions)
      .pipe(retry(2),catchError(this.handleError))
  }

  createPlant(data: CreatePlantModel): Observable<CreatePlantModel>{
    return this.http.post<CreatePlantModel>('https://iot-service-f5c0fphaeugmbaah.canadacentral-01.azurewebsites.net/api/v1/iot-service/plants/generate', data, this.httpOptions)
      .pipe(retry(2),catchError(this.handleError))
  }

  getPlantsByUserId(userId: any): Observable<PlantModel>{
    return this.http.get<PlantModel>('https://iot-service-f5c0fphaeugmbaah.canadacentral-01.azurewebsites.net/api/v1/iot-service/plants/user/' + userId)
      .pipe(retry(2),catchError(this.handleError))
  }

  createDevice(data: CreateDeviceModel, plantId: any): Observable<CreateDeviceModel>{
    return this.http.post<CreateDeviceModel>('https://iot-service-f5c0fphaeugmbaah.canadacentral-01.azurewebsites.net/api/v1/iot-service/devices/generate/'+plantId,
      data, this.httpOptions)
      .pipe(retry(2),catchError(this.handleError))
  }

  getDevicesByUserId(userId: any): Observable<DeviceModel>{
    return this.http.get<DeviceModel>('https://iot-service-f5c0fphaeugmbaah.canadacentral-01.azurewebsites.net/api/v1/iot-service/devices/user/' + userId)
      .pipe(retry(2),catchError(this.handleError))
  }
}
