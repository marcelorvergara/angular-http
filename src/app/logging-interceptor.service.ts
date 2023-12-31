import { HttpEventType, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { tap } from "rxjs";

export class LoggingInterceptorService implements HttpInterceptor{
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    console.log('Outgoing request', req.url)
    return next.handle(req).pipe(tap(event => {
      if (event.type === HttpEventType.Response) {
        console.log('Incoming response', event.body)
      }
    }))
  }
}
