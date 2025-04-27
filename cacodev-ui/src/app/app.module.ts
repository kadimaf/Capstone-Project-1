import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideHttpClient, withFetch } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MemberComponent } from './components/member-component/member/member.component';

import { ReactiveFormsModule  } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTabsModule } from '@angular/material/tabs';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, NativeDateAdapter } from '@angular/material/core';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule  } from '@angular/material/sort';
import { MatDividerModule  } from '@angular/material/divider';
import { MatAutocompleteModule  } from '@angular/material/autocomplete';

import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ContributionComponent } from './components/contributions/contribution/contribution.component';
import { EventComponent } from './components/event/event.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ManagementComponent } from './components/management/management.component';
import { AboutComponent } from './components/about/about.component';
import { ContactComponent } from './components/contact/contact.component';
import { FooterComponent } from './components/footer/footer.component';
import { MemberTypeComponent } from './components/member-type-component/member-type/member-type.component';
import { UserComponent } from './components/user/user.component';
import { MemberDetailsComponent } from './components/member-component/member-details/member-details.component';
import { MemberEditComponent } from './components/member-component/member-edit/member-edit.component';
import { MemberAddComponent } from './components/member-component/member-add/member-add.component';
import { AddMemberTypeComponent } from './components/member-type-component/add-member-type/add-member-type.component';
import { AddContributionDialogComponent } from './components/contributions/add-contribution-dialog/add-contribution-dialog.component';
import { AddEventDialogComponent } from './components/events/add-event-dialog/add-event-dialog.component';
import { EventDetailsComponent } from './components/events/event-details/event-details.component';
import { AddParticipantDialogComponent } from './components/events/add-participant-dialog/add-participant-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    MemberComponent,
    HomeComponent,
    DashboardComponent,
    ContributionComponent,
    EventComponent,
    NavbarComponent,
    ManagementComponent,
    AboutComponent,
    ContactComponent,
    FooterComponent,
    MemberTypeComponent,
    UserComponent,
    MemberDetailsComponent,
    MemberEditComponent,
    MemberAddComponent,
    AddMemberTypeComponent,
    AddContributionDialogComponent,
    AddEventDialogComponent,
    EventDetailsComponent,
    AddParticipantDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatSlideToggleModule,
    MatTooltipModule,
    MatTabsModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatDialogModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonToggleModule,
    MatTableModule,
    MatSortModule,
    MatDividerModule,
    MatAutocompleteModule
  ],
  providers: [
    provideClientHydration(withEventReplay()),
    provideHttpClient(withFetch())
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
