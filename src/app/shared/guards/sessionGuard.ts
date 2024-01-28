import {CanActivateFn, Router} from '@angular/router';
import {SessionService} from "../services/session.service";
import {inject} from "@angular/core";

export const SessionGuard: CanActivateFn = (route, state) => {
  const sessionService = inject(SessionService)
  const router = inject(Router)
  const isToken = sessionService.isToken();
  console.log(state)
  switch (state.url) {
    case "/login":
    case "/forget-password":
    case "/registration":
      if (isToken) {
        router.navigate(["products/All"])
        return false
      }
      return !isToken
    default:
      if (!isToken) {
        router.navigate(["login"])
      }

      return isToken;
  }
};
