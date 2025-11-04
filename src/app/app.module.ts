import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import {BaseChartDirective, provideCharts, withDefaultRegisterables} from 'ng2-charts';
import {StatCardListComponent} from "./components/stat-card-list/stat-card-list.component";
import {PageHeaderComponent} from "./components/page-header/page-header.component";
import {DetailsComponent} from "./pages/details/details.component";
import {ErrorBannerComponent} from "./components/error-banner/error-banner.component";

@NgModule({
  declarations: [AppComponent, HomeComponent, DetailsComponent, NotFoundComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, BaseChartDirective, StatCardListComponent, PageHeaderComponent, ErrorBannerComponent],
  providers: [
    provideCharts(withDefaultRegisterables())
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
