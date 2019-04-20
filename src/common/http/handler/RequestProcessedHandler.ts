import {HttpResponse} from "@angular/common/http";
import {Injectable} from "@angular/core";
 
@Injectable()
export class RequestProcessedHandler {
 
  handle(req: HttpResponse<any>): any {
    return undefined;
  };
}