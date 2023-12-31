import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subscription, map } from 'rxjs';
import { Post } from './post.model';
import { PostService } from './posts.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {

  loadedPosts: Post[] = [];
  isFetching = false;
  error = null
  private errorSub: Subscription

  constructor(private http: HttpClient, private postService: PostService) {}

  ngOnInit() {
    this.errorSub = this.postService.errorSubject.subscribe(errorMessage => this.error = errorMessage)

    this.isFetching = true
    this.postService.fetchPost().subscribe(posts => {
      this.isFetching = false
      this.loadedPosts = posts
    }, error => {
      // Handling error
      this.error = error.message
      this.isFetching = false
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
    }, error => {
      // Handling error
      this.error = error.message
      this.isFetching = false
    })
  }

  onClearPosts() {
    // Send Http request
    this.postService.deletePosts().subscribe(() => this.loadedPosts = [])
  }

  onHandleError() {
    this.error = null
    this.isFetching = false
  }

  ngOnDestroy(): void {
    this.errorSub.unsubscribe()
  }

}
