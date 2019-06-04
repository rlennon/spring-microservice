import { Component, OnInit, ViewChild } from '@angular/core';
import { DatePipe} from '@angular/common';
import {AuthService} from "../../services/auth.service";
import {User} from "../../model/user";
import {Router} from "@angular/router";
import {MatPaginator, MatTableDataSource, MatSort} from '@angular/material';
import {Article} from "../../model/article";
import {BlogService} from "../../services/blog.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  currentUser: User;
  constructor(public authService: AuthService, public router: Router, private blogService: BlogService) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }

  ngOnInit() {
    if(!this.currentUser){
      return;
    }
  }

}
