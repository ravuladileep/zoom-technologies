import { Component, OnInit } from '@angular/core';
import { CommonConstants } from 'src/app/config/constants';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  public logOut(): void {
    CommonConstants.removeToken();
    this.router.navigate(['login']);
  }

}
