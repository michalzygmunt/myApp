import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import {NgForm} from "@angular/forms";

import { Comment} from '../comment.model';
import { from } from 'rxjs';
import { CommentsService } from '../comments.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
@Component({
  selector: 'app-comment-create',
  templateUrl: './comment-create.component.html',
  styleUrls: ['./comment-create.component.css']
})
export class CommentCreateComponent implements OnInit{
  enteredContent = '';
  enteredTitle = '';
  comment: Comment;
  private mode = 'create';
  private commentId: string;

  constructor(public commentsService: CommentsService, public route: ActivatedRoute){}

  ngOnInit(){
      this.route.paramMap.subscribe((paramMap: ParamMap) =>{
          if(paramMap.has('commentId')) {
              this.mode = 'edit';
              this.commentId = paramMap.get('commentId');
              this.commentsService.getComment(this.commentId).subscribe(postData =>{
                this.comment = {id: postData._id, title: postData.title, content: postData.content};
              });
          } else{
            this.mode = 'create';
            this.commentId = null;
          }
      });
  }

  onSaveComment(form: NgForm){
    if(form.invalid){
      return;
    }
      if(this.mode === 'create'){
        this.commentsService.addComment(form.value.title, form.value.content);
      } else {
        this.commentsService.updateComment(
          this.commentId,
          form.value.title,
          form.value.content
        );
      }
      form.resetForm();
  }
}
