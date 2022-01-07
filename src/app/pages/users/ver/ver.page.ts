import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/modules/users.service';

@Component({
  selector: 'app-ver',
  templateUrl: './ver.page.html',
  styleUrls: ['./ver.page.scss'],
})
export class VerPage implements OnInit {
  params:User
  constructor(route : ActivatedRoute) {
    this.params=route.snapshot.params
   }

  ngOnInit() {
  }

}
