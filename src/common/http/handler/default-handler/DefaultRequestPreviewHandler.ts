import {Injectable} from "@angular/core";
import {RequestPreviewHandler} from "../RequestPreviewHandler";
import {HttpRequest} from "@angular/common/http";
import {Logger} from "../../../logger";
 
@Injectable()
export class DefaultRequestPreviewHandler extends RequestPreviewHandler {
  constructor(private logger: Logger) {
    super();
  }
 
 
  handle(request: HttpRequest<any>): HttpRequest<any> {
    this.logger.warn("未注入自定义请求前置处理类，使用默认前置处理");
    return request;
  }
}