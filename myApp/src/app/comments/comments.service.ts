import {Comment} from './comment.model';
import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import { Content } from '@angular/compiler/src/render3/r3_ast';

@Injectable({providedIn: 'root'})
export class CommentsService{
  private comments: Comment[] = [];
  private commentsUpdated = new Subject<Comment[]>();

constructor(private http: HttpClient){}

  getComments(){
    this.http.get<{message: string, comments: any}>
    ('http://localhost:3000/api/comments')
    .pipe(map((commentData) =>{
        return commentData.comments.map(comment =>{
          return{
            title: comment.title,
            content: comment.content,
            id: comment._id
          };
        });
    }))
    .subscribe(transformedComents =>{
     this.comments = transformedComents
      this.commentsUpdated.next([...this.comments]);
    });
  }

  getCommentUpdateListener(){
    return this.commentsUpdated.asObservable();
  }

  getComment(id: string){
    return this.http.get<{_id: string, title: string; content: string}>("http://localhost:3000/api/comments/" + id);
  }


  addComment(title: string, content: string){
    const comment: Comment = {id: null, title: title, content: content};
    this.http.post<{message: string, commentId: string}>('http://localhost:3000/api/comments', comment)
    .subscribe((responseData) =>{
        const id = responseData.commentId;
        comment.id = id;
        this.comments.push(comment);
        this.commentsUpdated.next([...this.comments]);
    });
  }

  updateComment(id: string, title: string, content: string){
    const comment: Comment = {
      id: id,
      title: title,
      content: content
    };
    this.http.put("http://localhost:3000/api/comments/" + id, comment)
    .subscribe(response =>{
      const updatedComments = [...this.comments];
      const oldCommentIndex = updatedComments.findIndex(p => p.id === comment.id);
      updatedComments[oldCommentIndex] = comment;
      this.comments = updatedComments;
      this.commentsUpdated.next([...this.comments]);
    });
  }

  deleteComment(commentId: string){
    this.http.delete("http://localhost:3000/api/comments/" + commentId)
    .subscribe(() =>{
      const updatedComments = this.comments.filter(comment => comment.id !== commentId);
      this.comments = updatedComments;
      this.commentsUpdated.next([...this.comments]);
    });
  }
}
