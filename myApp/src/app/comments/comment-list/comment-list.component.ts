import { Component, Input, OnInit, OnDestroy } from '@angular/core';

import {Subscription} from 'rxjs';
import {Comment} from '../comment.model';
import { CommentsService } from '../comments.service';
@Component({
  selector: 'app-comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.css']
})
export class CommentListComponent implements OnInit, OnDestroy{
  //posts = [
  //  {title: 'First Post', content: 'This is the first post'},
  //  {title: 'Second Post', content: 'This is the 2 post'},
  //  {title: 'TYhird Post', content: 'This is the 3 post'},
  //  {title: 'foruyth Post', content: 'This is the 4 post'}
  //]

  @Input() comments: Comment[] = [];
  private commentsSubb: Subscription;


  constructor(public commentsService: CommentsService){
}

  ngOnInit(){
      this.commentsService.getComments();
      this.commentsSubb = this.commentsService.getCommentUpdateListener().subscribe((comments: Comment[])=>{
          this.comments = comments;
      });
  }

  onDelete(commentId: string){
this.commentsService.deleteComment(commentId);
  }

  ngOnDestroy(){
    this.commentsSubb.unsubscribe();
  }
}
