import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SearchComponent } from './components/search/search.component';
import { RepoDetailsComponent } from './components/repo-details/repo-details.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SearchComponent, RepoDetailsComponent],
  template: `
    <div>
      <h1>GitHub Repository Search</h1>
      <router-outlet></router-outlet>
    </div>
  `,
  styles: [
    `
      h1 {
        text-align: center;
        margin-top: 20px;
      }
    `,
  ],
})
export class AppComponent {}
