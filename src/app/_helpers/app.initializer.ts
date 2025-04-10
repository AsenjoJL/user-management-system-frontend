import { AccountService } from '@app/_services'; 

export function appInitializer(accountService: AccountService) {
    return () => new Promise<void>(resolve => {
      accountService.refreshToken()
        .subscribe({
          next: () => resolve(),
          error: () => resolve() // ensure resolve is called even if there's an error
        });
    });
  }
  