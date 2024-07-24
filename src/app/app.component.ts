import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SearchComponent } from './components/search/search.component';
import { RepoDetailsComponent } from './components/repo-details/repo-details.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SearchComponent, RepoDetailsComponent],
  template: `
    <div class="content">
      <router-outlet></router-outlet>
    </div>
  `,
  styles: [
    `
      .content {
        display: flex;
        justify-content: center;
      }
    `,
  ],
})
export class AppComponent {}
