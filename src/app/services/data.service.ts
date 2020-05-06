import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class DataService {
  endPoint = environment.apiUrl;
  
  token = sessionStorage.getItem('access_token')
  httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': `Token ${this.token}`
      })
  };
  constructor(private http: HttpClient) { 
  }

  repoList() {
    return this.http.get(`${this.endPoint}/api/repository/repositories`, this.httpOptions)
  }

  getLabels(id) {
    return this.http.get(`${this.endPoint}/api/repository/${id}/labels`, this.httpOptions)
  }

  getCollaborators(id) {
    return this.http.get(`${this.endPoint}/api/repository/${id}/collaborators`, this.httpOptions)
  }

  getMilestones(id) {
    return this.http.get(`${this.endPoint}/api/repository/${id}/milestones`, this.httpOptions)
  }

  getIssues(id, pageno, pagesize, labels, author, assignee, milestone, state, mentioned, since) {
    let params = new HttpParams();
    params = params.append('pagesize', pagesize);
    params = params.append('pageno', pageno);
    if(labels.length > 0) params = params.append('labels', labels);
    if(author.length !== 0) params = params.append('creator', author);
    if(assignee.length!== 0)  params = params.append(`assignee`, assignee);
    if(milestone.length !== 0)  params = params.append(`milestone`, milestone);
    if(mentioned.length !== 0)  params = params.append(`mentioned`, mentioned);
    if(state)  params = params.append(`state`, state);
    if(since) params = params.append(`since`, since.toISOString());
    return this.http.get(`${this.endPoint}/api/repository/${id}/issues`, {...this.httpOptions, params: params})
  }

  getIssuesFilter(pageno, pagesize, labels, author, ids, assignee, milestone) {
    let params = new HttpParams();
    console.log(author, assignee, milestone)
    params = params.append('pagesize', pagesize);
    params = params.append('pageno', pageno);
    if(labels.length > 0) params = params.append('labels', labels);
    // if(ids.length > 0)  {
    //   ids.forEach((id, index) => {
    //     params = params.append(`repository_ids[${index}]`, id);
    //   })
    // } 
    params = params.append(`repository_ids`, ids);
    if(author.length !== 0) params = params.append('creator', author);
    if(assignee.length!== 0)  params = params.append(`assignee`, assignee);
    if(milestone.length !== 0)  params = params.append(`milestone`, milestone);
    return this.http.get(`${this.endPoint}/api/repository/issues`, {...this.httpOptions, params: params})
  }

  getUserIssues() {
    let params = new HttpParams();
    params = params.append('pagesize', '100');
    params = params.append('pageno', '1');
    return this.http.get(`${this.endPoint}/api/repository/issues`, {...this.httpOptions, params: params})
  }

  downloadFile(data) {

   return fetch(data.downloadlink, {
    method: `GET`,
    headers: {
      'Authorization': `Bearer ${this.token}`,
      'Content-Type': `application/json; charset=utf-8`,
    },
   })
  }

  export(issues, repo_id) {
    let sendData = []
    issues.forEach(item => {
      sendData.push({
        repositoryid: repo_id,
        issueno: item.number
      })
    });
    return this.http.post(`${this.endPoint}/api/export/export`, sendData, {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': `Token ${sessionStorage.getItem('access_token')}`
      })
  })    
  } 

}
