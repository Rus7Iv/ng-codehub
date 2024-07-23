import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GithubService } from '../../services/github.service';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-repo-details',
  standalone: true,
  imports: [CommonModule, MatProgressSpinnerModule, RouterModule],
  templateUrl: './repo-details.component.html',
  styleUrls: ['./repo-details.component.scss'],
})
export class RepoDetailsComponent implements OnInit {
  repo: any | null = null;
  readmeContent: string | null = null;
  fileStructure: any[] = [];
  isLoading = false;
  error: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private githubService: GithubService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const owner = params.get('owner');
      const repo = params.get('repo');
      if (owner && repo) {
        this.loadRepoDetails(owner, repo);
        this.loadFileStructure(owner, repo);
        this.loadReadmeContent(owner, repo);
      }
    });
  }

  loadRepoDetails(owner: string, repo: string): void {
    this.isLoading = true;
    this.githubService.getRepoDetails(owner, repo).subscribe({
      next: (repo) => {
        this.repo = repo;
        this.isLoading = false;
      },
      error: (err) => {
        this.error = 'Ошибка при загрузке данных';
        this.isLoading = false;
      },
    });
  }

  loadFileStructure(owner: string, repo: string): void {
    this.githubService.getRepoFileStructure(owner, repo).subscribe({
      next: (files) => {
        this.fileStructure = files;
      },
      error: (err) => {
        this.error = 'Ошибка при загрузке структуры файлов';
      },
    });
  }

  loadReadmeContent(owner: string, repo: string): void {
    this.githubService.getReadmeContent(owner, repo).subscribe({
      next: (content) => {
        this.readmeContent = content;
      },
      error: (err) => {
        this.error = 'Ошибка при загрузке README.md';
      },
    });
  }
}
