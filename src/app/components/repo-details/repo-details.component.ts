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
      const repoId = params.get('id');
      if (repoId) {
        this.loadRepoDetails(repoId);
        this.loadFileStructure(repoId);
        this.loadReadmeContent(repoId);
      }
    });
  }

  loadRepoDetails(repoId: string): void {
    this.isLoading = true;
    this.githubService.getRepoDetails(repoId).subscribe({
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

  loadFileStructure(repoId: string): void {
    this.githubService.getRepoFileStructure(repoId).subscribe({
      next: (files) => {
        this.fileStructure = files;
      },
      error: (err) => {
        this.error = 'Ошибка при загрузке структуры файлов';
      },
    });
  }

  loadReadmeContent(repoId: string): void {
    this.githubService.getReadmeContent(repoId).subscribe({
      next: (content) => {
        this.readmeContent = content;
      },
      error: (err) => {
        this.error = 'Ошибка при загрузке README.md';
      },
    });
  }
}
