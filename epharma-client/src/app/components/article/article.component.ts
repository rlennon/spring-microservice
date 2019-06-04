import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Article } from 'src/app/model/article';
import { User } from 'src/app/model/user';
import { EmitterService } from 'src/app/services/emitter.service';
import { Router } from '@angular/router';
import { BlogService } from 'src/app/services/blog.service';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {

  article: Article= new Article();
  currentUser: User;
  articleForm:FormGroup;
  errorMessage:String;

  constructor(private blogService :BlogService, private router: Router, private emitterService: EmitterService) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }

  editorStyle = {
    height : '700px'
  }

  ngOnInit() {
    if (this.currentUser){
      this.articleForm= new FormGroup({
        'articleTitle': new FormControl(null),
        'articleContent': new FormControl(null)
      })
    }else{
      this.router.navigate(['/login']);
    }
    
  }

  onSubmit(){
    this.article.author = this.currentUser.name;
    this.article.authorId = this.currentUser.id;
    this.article.content = this.articleForm.get('articleContent').value;
    this.article.title = this.articleForm.get('articleTitle').value;
    this.blogService.createArticle(this.article)
    .subscribe(data=>{
      this.router.navigate(['/profile']);
    },err=>{
      this.errorMessage="Error :  Article not created";
    })
  }

}
