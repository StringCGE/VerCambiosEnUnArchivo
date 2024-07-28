import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';
//import { environment as environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';

import { ToolsService } from '../../../services/tools.service';
import { ConfSystemServiceService } from '../../../data/conf-system-service.service';
//import { BrigateFilter } from '../interfaces/brigate-filter';
import { BrigateFilter } from '../models/brigate-filter.interface';
import { BrigateDto } from '../interfaces/brigate-dto';
import { Result, ResultData, ResultList, ResultPaged } from '../../../core/interfaces/result';

@Injectable({
  providedIn: 'root'
})
export class BrigateService {
  private apiUrl = environment.serverAma+ 'api/Brigate';
  // private apiUrl = environment.serverAma+ 'api/Person';

  constructor(private http: HttpClient,
    private tool: ToolsService,
    private config:ConfSystemServiceService) { }

  getAllBrigate(filterrequest:BrigateFilter): Observable<ResultPaged<BrigateDto>> {
    const params = this.tool.getHttpParams(filterrequest);
    return this.http.get<ResultPaged<BrigateDto>>(this.apiUrl, { params:params });
  }
  getBrigateById(id: number): Observable<ResultData<BrigateDto>> {
    return this.http.get<ResultData<BrigateDto>>(`${this.apiUrl}/${id}`);
  }
  createBrigate(brigate: BrigateDto): Observable<Result> {
    return this.http.post<Result>(this.apiUrl, brigate);
  }
  updateBrigate(brigate: BrigateDto): Observable<Result> {
    return this.http.put<Result>(`${this.apiUrl}/${brigate.id}`, brigate);
  }
  deleteBrigate(id: number): Observable<Result> {
    return this.http.delete<Result>(`${this.apiUrl}/?id=${id}`);
  }
}
