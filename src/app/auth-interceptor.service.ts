import { HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";

export class AuthInterceptorService implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    // if(req.url)
    console.log('Req is on its way', req.url)
    const modifiedRequest = req.clone({headers: req.headers.append('auth', 'bearer szxv')})
    return next.handle(modifiedRequest)
  }
}
