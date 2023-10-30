import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';
import { Post } from './post.model';
import { PostService } from './posts.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  loadedPosts: Post[] = [];
  isFetching = false;

  constructor(private http: HttpClient, private postService: PostService) {}

  ngOnInit() {
    this.isFetching = true
    this.postService.fetchPost().subscribe(posts => {
      this.isFetching = false
      this.loadedPosts = posts
    })
  }

  onCreatePost(postData: { title: string; content: string }) {
    // Send Http request
    this.postService.createAndStorePost(postData.title, postData.content)
  }

  onFetchPosts() {
    // Send Http request - fetch posts
    this.isFetching = true
    this.postService.fetchPost().subscribe(posts => {
      this.isFetching = false
      this.loadedPosts = posts
    })
  }

  onClearPosts() {
    // Send Http request
  }


}
