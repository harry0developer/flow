import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core"
import { Observable } from "rxjs";
import { DataService } from "./data.service";


@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private dataService: DataService) {}
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = this.dataService.getToken();
        if(!token) {
            return next.handle(req);
        } else {
            const authReq = req.clone({
                headers: req.headers.set('authorization', token)
            })
            return next.handle(authReq);
        }
    }

}