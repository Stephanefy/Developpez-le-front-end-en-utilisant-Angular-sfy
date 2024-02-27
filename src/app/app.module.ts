import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { PieComponent } from './components/pie/pie.component';
import { DetailsComponent } from './pages/details/details.component';
import { LineComponent } from './components/line/line.component';
import { HeaderComponent } from './components/header/header.component';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';

@NgModule({
  declarations: [AppComponent, HomeComponent, NotFoundComponent, DashboardComponent, PieComponent, DetailsComponent, LineComponent, HeaderComponent, LoadingSpinnerComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
