import { Component, OnInit } from '@angular/core';
import {HttpProvider} from "../../common/http/http";
import {Logger} from "../../common/logger"
import {filter, map, catchError, tap} from "rxjs/operators";

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  ngOnInit() {
  }

  constructor(private http: HttpProvider, private logger: Logger) {
  }

  login(username, password){
    this.testHttp(username.value, password.value);
  }

  path: string = 'http://localhost:5000/login';

  testHttp(username, password){
    const header = {'Access-Control-Allow-Origin': '*','Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT'}
    this.http.get(this.path, {'username': username, 'password': password}, header).subscribe(
      info =>{
        var jsonData = JSON.stringify(info)
        var jsonObj = JSON.parse(jsonData)
        var status = jsonObj.login_status
        this.logger.log(status)
        if(status=='success'){
          alert(status)
        }
      }   
    )
  }

}
