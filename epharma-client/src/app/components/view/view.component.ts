import { Component, OnInit } from '@angular/core';
import { BlogService } from 'src/app/services/blog.service';
import { Router, ActivatedRoute } from '@angular/router';
import { EmitterService } from 'src/app/services/emitter.service';
import { Article } from 'src/app/model/article';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {

  article: Article;
  infoMessage:String;
  articleId:String;

  constructor(private blogService :BlogService, private router: Router, private emitterService: EmitterService,private route: ActivatedRoute) {
    
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      if(params.has('id')){
        this.articleId = params.get('id');
      }});

        this.blogService.allArticles()
        .subscribe(data=>{
          data.products.forEach(element => {
        if (String(element.id) == this.articleId){
          this.article = element;
        }
      })
    });
  }

}
