import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { AppComponent } from './app/app.component';
import { routes } from './app/app-routing.module';
import { errorInterceptor, jwtInterceptor } from './app/_helpers';

bootstrapApplication(AppComponent, {
    providers: [
        provideRouter(routes),
        provideHttpClient(
            withInterceptors([
                jwtInterceptor,
                errorInterceptor
            ])
        )
    ]
}).catch(err => console.error('Error bootstrapping app:', err));