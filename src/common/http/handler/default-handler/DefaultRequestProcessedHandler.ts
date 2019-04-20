import {HttpResponse} from "@angular/common/http";
import {Logger} from "../../../logger";
import {RequestProcessedHandler} from "../RequestProcessedHandler";
import {Injectable} from "@angular/core";
 
@Injectable()
export class DefaultRequestProcessedHandler extends RequestProcessedHandler {
  constructor(private logger: Logger) {
    super();
  }
 
  handle(req: HttpResponse<any>): any {
    this.logger.warn("未注入自定义请求后置处理类，使用默认后置处理");
    this.logger.log(req);
    return req.body;
  }
}