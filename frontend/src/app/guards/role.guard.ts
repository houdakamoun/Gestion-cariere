import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router } from '@angular/router';

import { AuthService } from '../services/auth.service';

export const roleGuard: CanActivateFn = (route: ActivatedRouteSnapshot) => {
  const auth = inject(AuthService);
  const router = inject(Router);

  const expectedRole = route.data['role'];

  const userRole = auth.getRole().toUpperCase().trim();

  if (userRole === expectedRole) {
    return true;
  }

  return router.createUrlTree(['/acceuil']);
};
