import { Injectable } from '@angular/core';
import { catchError, Observable, retry, throwError } from 'rxjs';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { DataModel } from '../models/data.model';
import {PostModel} from "../models/post.model";

@Injectable({
  providedIn: 'root',
})
export class DbService {
  baseUrl = 'https://greengrow.zeabur.app/api/green-grow/v1';

  constructor(private http: HttpClient) {}

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.log(`An error ocurred ${error.status}, body was ${error.error}`);
    } else {
      console.log(
        `Backend returned code ${error.status}, body was ${error.error}`
      );
    }
    return throwError(
      'Something happened with request, please try again later'
    );
  }

  //GET
  getCourses() {
    return this.http.get<any[]>('https://coursesservice-eya8hpewa9cgh9ay.canadacentral-01.azurewebsites.net/courses');
  }

  //GET POSTS
  getPosts() {
    return this.http.get<any[]>('https://community-grow-easy-hbcfche6ffabe6be.canadacentral-01.azurewebsites.net/posts');
  }

  getPostById(id: number) {
    return this.http.get<any[]>(`https://community-grow-easy-hbcfche6ffabe6be.canadacentral-01.azurewebsites.net/posts/${id}`);
  }
  updatePost(id: number, updatedPost: PostModel): Observable<PostModel> {
    return this.http.patch<PostModel>(`https://community-grow-easy-hbcfche6ffabe6be.canadacentral-01.azurewebsites.net/posts/${id}/update`, updatedPost);
  }
  //GET TRENDS
  getTrends() {
    return this.http.get<any[]>('https://community-grow-easy-hbcfche6ffabe6be.canadacentral-01.azurewebsites.net/grow-easy/trends');
  }

  // POST POSTS
  createPost(post: any) {
    return this.http.post<any>('https://community-grow-easy-hbcfche6ffabe6be.canadacentral-01.azurewebsites.net/posts', post, this.httpOptions);
  }
}
