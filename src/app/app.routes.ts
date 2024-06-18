import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: ``,
    redirectTo: `home`,
    pathMatch: `full`,
  },
  { path: `home`, loadComponent: () => import(`./pages/home-page/home-page.component`).then(module => module.HomePageComponent) },
  { path: `settings`, loadComponent: () => import(`./pages/settings-page/settings-page.component`).then(module => module.SettingsPageComponent) }
];
