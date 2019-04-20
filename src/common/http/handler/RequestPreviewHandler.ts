import {HttpRequest} from "@angular/common/http";
import {Injectable} from "@angular/core";
 
@Injectable()
export class RequestPreviewHandler {
  handle(request: HttpRequest<any>): HttpRequest<any> {
    return request;
  };
}