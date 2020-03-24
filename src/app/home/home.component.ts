import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  user = {"email":"test@example.com"}
  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.get().subscribe((data: any)=>{  
      console.log(data);  
      this.user = data;  
    });
  }

}
