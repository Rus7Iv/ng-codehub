import { Routes } from '@angular/router';
import { SearchComponent } from './components/search/search.component';
import { RepoDetailsComponent } from './components/repo-details/repo-details.component';

export const appRoutes: Routes = [
  { path: '', component: SearchComponent },
  { path: 'repo/:owner/:repo', component: RepoDetailsComponent },
];
