import {Injectable} from "@angular/core";
import {HttpResponse} from "@angular/common/http";
import {Logger} from "../../../logger";
import {RequestExceptionHandler} from "../RequestExceptionHandler";
import {TimeoutError} from "rxjs";
 
@Injectable()
export class DefaultRequestExceptionHandler extends RequestExceptionHandler {
  constructor(private logger: Logger) {
    super();
  }
 
 
  handle(res: any): any {
    this.logger.warn("未注入自定义请求异常处理类，使用默认异常处理");
    if (res instanceof HttpResponse) {
      switch (res.status) {
        case 200:
          this.logger.log("业务异常")
          break;
        case 404:
          this.logger.log("请求失败，未找到请求地址!");
        case 500:
          this.logger.log("请求失败，服务器出错，请稍后再试!");
        case 0:
          this.logger.log("请求失败，请求响应出错!");
        default:
          this.logger.log(res);
      }
    } else {
      if(res instanceof TimeoutError){
        this.logger.log("请求失败，超时TimeOut!");
      }
      this.logger.log(res);
    }
    return res;
  }
}