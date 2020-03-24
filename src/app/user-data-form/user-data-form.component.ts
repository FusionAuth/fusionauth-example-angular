import { Component, Input } from '@angular/core';
import { UserData }    from '../user-data';
import { UserDataService } from '../user-data.service';

@Component({
  selector: 'app-user-data-form',
  templateUrl: './user-data-form.component.html',
  styleUrls: ['./user-data-form.component.css']
})

export class UserDataFormComponent {

  @Input() userdata: string;
  model = new UserData('user data');
  constructor(private userDataService: UserDataService) { }

  submitted = false;

  onSubmit() { 
    this.submitted = true; 
    let userdata = this.model.userdata;
    let body = JSON.stringify( { userData: userdata });
    console.log(body);
    return this.userDataService.post(body).subscribe(); 
  }

  ngOnInit(): void {
    this.model = new UserData(this.userdata);
  }

}
