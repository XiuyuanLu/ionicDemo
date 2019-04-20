import {
    HttpClient,
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest,
    HttpResponse
  } from '@angular/common/http';
  import {Injectable} from '@angular/core';
  import {Logger} from "../../logger";
  import {filter, map, catchError, tap} from "rxjs/operators";
  import {Observable} from "rxjs";
  import {RequestProcessedHandler} from "../handler/RequestProcessedHandler";
  import {RequestPreviewHandler} from "../handler/RequestPreviewHandler";
  import {RequestExceptionHandler} from "../handler/RequestExceptionHandler";

  import { throwError } from 'rxjs';
   
  @Injectable()
  export class XyHttpInterceptor implements HttpInterceptor {
    private timeoutMillis;
   
    constructor(public http: HttpClient,
                public logger: Logger,
                private requestProcessedHandler: RequestProcessedHandler,
                private requestPreviewHandler: RequestPreviewHandler,
                private requestExceptionHandler: RequestExceptionHandler) {
      logger.log('Hello InterceptorProvider Provider');
      this.timeoutMillis = 3000;
    }
   
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      /**
       * 请求前置处理
       */
      this.requestPreviewHandler.handle(request);
      return next.handle(request)
        .pipe(
          tap(event => {
            if (event instanceof HttpResponse) {
              /**
               * 请求后置处理
               */
              this.requestProcessedHandler.handle(event);
            }
          }, error => {
            /**
             * 请求异常处理
             */
            this.requestExceptionHandler.handle(error);
          }),
          catchError((err: Response) => {
            this.requestExceptionHandler.handle(err);
            return throwError(err);
          })
        )
    };
  }