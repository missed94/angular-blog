import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {fbCreateResponse, Post} from '../admin/shared/interfaces';
import {environment} from '../../environments/environment';
import {map} from 'rxjs/operators';

@Injectable({providedIn: 'root'})

export class PostService {

  constructor(private http: HttpClient) {
  }

  create(post: Post): Observable<Post> {
    return this.http.post<Post>(`${environment.fbDbUrl}/posts.json`, post)
      .pipe(map((response: Post) => {
          return {
            ...post,
            name: response.name,
            date: new Date(post.date)
          } as Post
      }))
  }

}
