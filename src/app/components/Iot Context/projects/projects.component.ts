import {Component, OnInit} from '@angular/core';
import {ProjectModel} from "../../../core/models/project.model";
import {PlantModel} from "../../../core/models/plant.model";
import {DeviceModel} from "../../../core/models/device.model";
import {IotService} from "../../../core/services/iot.service";
import {AuthService} from "../../../core/services/auth.service";
import {User} from "firebase/auth";
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit  {
  projects: ProjectModel[] = [];
  plants: PlantModel[] = [];
  devices: DeviceModel[] = [];
  userId: string = '2';
  user: User | null = null;
  plantId:  string = '';
  plantId2: string = '';
  deviceId:  string = '';
  showProjects: boolean = true;
  showDevices: boolean = false;
  showPlants: boolean = false;
  showNewProjectForm: boolean = false;
  showNewPlantForm: boolean = false;
  showNewDeviceForm: boolean = false;
  newPlant = {
    name: '', description: '', maxTemperature: '', minTemperature: '',
    maxHumidity: '', minHumidity: '', userId: '2'
  }
  newDevice = {
    name: '', description: '', temperature: 0,
    humidity: 0, userId: '2'
  }
  newProject ={
    name: '', description: '',userId: '2'
  }
  constructor(private iotService: IotService, private authService: AuthService,
              private toastr: ToastrService, private router: Router) {}
  ngOnInit(): void {
    this.authService.authState$.subscribe((user) => {
      if (user) {
        this.user = user;
      }
    });
    this.loadProjects();
    this.loadPlants();
    this.loadDevices();
  }

  loadProjects(): void {
    this.iotService.getProjectsByUserId(this.userId).subscribe({
      next: (data) => (this.projects = Array.isArray(data) ? data : [data]),
      error: (err) => console.error('Error al cargar proyectos', err)
    });
  }

  loadPlants(): void {
    this.iotService.getPlantsByUserId(this.userId).subscribe({
      next: (data) => (this.plants = Array.isArray(data) ? data : [data]),
      error: (err) => console.error('Error al cargar plantas', err)
    });
  }

  loadDevices(): void {
    this.iotService.getDevicesByUserId(this.userId).subscribe({
      next: (data) => (this.devices = Array.isArray(data) ? data : [data]),
      error: (err) => console.error('Error al cargar dispositivos', err)
    });
  }
  toggleProjects(): void {
    this.showProjects = !this.showProjects;
  }
  togglePlants(): void {
    this.showPlants = !this.showPlants;
  }
  toggleDevice(): void {
    this.showDevices = !this.showDevices;
  }
  toggleNewProjectForm(): void {
    this.showNewProjectForm = !this.showNewProjectForm;
  }
  toggleNewPlantForm(): void {
    this.showNewPlantForm = !this.showNewPlantForm;
  }
  toggleNewDeviceForm(): void {
    this.showNewDeviceForm = !this.showNewDeviceForm;
  }
  createPlant(){
    this.iotService.createPlant(this.newPlant).subscribe(
      ()=>{
        this.toastr.success('Plant created', 'Success');
      },()=>{
        this.toastr.error('Error creating the plant', 'Error');
      }
    )
  }
  createDevice(){
    this.iotService.createDevice(this.newDevice, this.plantId).subscribe(
      ()=>{
        this.toastr.success('Device created', 'Success');
      },()=>{
        this.toastr.error('Error creating the device', 'Error')
      }
    )
  }
  createProject(){
    this.iotService.createProject(this.newProject, this.deviceId, this.plantId2).subscribe(
      ()=>{
        this.toastr.success('Project created', 'Success');
      },()=>{
        this.toastr.error('Error creating the project', 'Error')
      }
    )
  }
  isOutOfRange(device: DeviceModel, plant: PlantModel): boolean {
    if (!device || !plant) return false;
    return (
      device.temperature < plant.minTemperature ||
      device.temperature > plant.maxTemperature ||
      device.humidity < plant.minHumidity ||
      device.humidity > plant.maxHumidity
    );
  }
}
