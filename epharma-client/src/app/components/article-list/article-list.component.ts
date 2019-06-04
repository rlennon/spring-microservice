import { Component, OnInit } from '@angular/core';
import { Article } from 'src/app/model/article';
import { User } from 'src/app/model/user';
import { BlogService } from 'src/app/services/blog.service';
import { Router } from '@angular/router';
import { EmitterService } from 'src/app/services/emitter.service';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.css']
})
export class ArticleListComponent implements OnInit {

  articles: Array<Article>;
  infoMessage:String;

  constructor(private blogService :BlogService, private router: Router, private emitterService: EmitterService) {
    
  }

  ngOnInit() {
    this.blogService.allArticles()
    .subscribe(data=>{
      this.articles=data;
    },err=>{
      this.infoMessage='No Posts to Show';
    })
  }

}
