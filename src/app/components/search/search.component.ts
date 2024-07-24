import { Component, HostBinding } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  FormsModule,
} from '@angular/forms';
import { Router } from '@angular/router';
import { GithubService } from '../../services/github.service';
import { Repo } from '../../models/repo.model';
import { trigger, style, transition, animate } from '@angular/animations';
import { NgFor, NgIf, NgClass } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule,
    NgFor,
    NgIf,
    NgClass,
    MatProgressSpinnerModule,
  ],
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent {
  searchForm: FormGroup;
  repos: Repo[] = [];
  isLoading = false;
  currentPage = 1;
  totalPages = 1;
  perPage = 10;
  selectedRepoIds: Set<number> = new Set<number>();

  @HostBinding('class.scrolled') isScrolled = false;

  constructor(
    private fb: FormBuilder,
    private githubService: GithubService,
    private router: Router
  ) {
    this.searchForm = this.fb.group({
      query: [''],
      language: [''],
    });
  }

  onSubmit(): void {
    this.currentPage = 1;
    this.isScrolled = true;
    this.searchRepos();
  }

  searchRepos(): void {
    const { query, language } = this.searchForm.value;
    this.isLoading = true;

    this.githubService
      .searchRepos(query, language, this.currentPage, this.perPage)
      .subscribe({
        next: (response: any) => {
          this.repos = response.items;
          this.totalPages = Math.ceil(response.total_count / this.perPage);
          this.isLoading = false;
        },
        error: (err: any) => {
          console.error('Ошибка при получении данных:', err);
          this.isLoading = false;
        },
      });
  }

  openRepo(repo: Repo): void {
    this.router.navigate(['/repo', repo.owner.login, repo.name]);
    this.selectedRepoIds.add(repo.id);
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.searchRepos();
  }
}
