import {Injectable} from "@angular/core";
 
@Injectable()
export class RequestExceptionHandler {
  handle(request: any): any {
    return request;
  };
}