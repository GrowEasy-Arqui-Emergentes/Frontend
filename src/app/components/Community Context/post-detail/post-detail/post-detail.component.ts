import {Component, OnInit} from '@angular/core';
import {PostModel} from "../../../../core/models/post.model";
import {ActivatedRoute} from "@angular/router";
import {DbService} from "../../../../core/services/db.service";

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.scss']
})
export class PostDetailComponent implements OnInit{
  post: any;

  constructor(
    private dbService: DbService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getPostDetail();
  }
  getPostDetail() {
    const postId = this.route.snapshot.paramMap.get('id');
    if (postId) {
      this.dbService.getPostById(+postId).subscribe((data: any) => {
        this.post = data;

        if (this.post) {
          this.post.views += 1;
          this.dbService.updatePost(+postId, this.post).subscribe(updatedPost => {
            this.post = updatedPost;
          });
        }
      });
    }
  }
}
