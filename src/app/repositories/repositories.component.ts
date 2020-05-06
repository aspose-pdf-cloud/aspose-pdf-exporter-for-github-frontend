import { Component, OnInit } from '@angular/core';
import { Subscriber } from 'rxjs';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-repositories',
  templateUrl: './repositories.component.html',
  styleUrls: ['./repositories.component.scss']
})
export class RepositoriesComponent implements OnInit {

  repositories: any = []

  constructor(private data: DataService) { }

  ngOnInit() {
    this.data.repoList()
      .subscribe((repos: any) => {
        this.repositories = repos.result
      });
  }

}
