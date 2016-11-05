import { Injectable }     from '@angular/core';
import { Http, Response } from '@angular/http';
import { Music }          from './music';
import { Observable }     from 'rxjs/Observable';

@Injectable()
export class MusicService {
  private url = 'https://script.googleusercontent.com/macros/echo?user_content_key=BHiCdmxy6OKIWccFRyIC4nTsjxGMufXb1L5jfFQUfDLh1iAITeJ4QGcZ7BYdmzv1zsxy9kmW1ud66rLPSgftsn1u5b2t2rfOm5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnLffLqlr5ivXusgdBjs5-rgh3ZqTo421hrb0bJgfd0TTQM9xlr4ROPngJpqDLXa31g&lib=MPr2BTqc6u0bGJAp6ZcsDAo9SgudKYMVV&callback=callback';  // URL to web API
  constructor (private http: Http) {}
  getMusics(): Observable<Music[]> {
    return this.http.get(this.url)
                    .map(this.extractData)
                    .catch(this.handleError);
  }
  private extractData(res: Response) {
    let body = res.json();
    return body.data || { };
  }
  private handleError (error: Response | any) {
    // In a real world app, we might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }
}
