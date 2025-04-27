import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ManagementComponent } from './components/management/management.component';
import { EventComponent } from './components/event/event.component';
import { ContactComponent } from './components/contact/contact.component';
import { AboutComponent } from './components/about/about.component';
import { MemberComponent } from './components/member-component/member/member.component';
import { MemberTypeComponent } from './components/member-type-component/member-type/member-type.component';
import { UserComponent } from './components/user/user.component';
import { MemberDetailsComponent } from './components/member-component/member-details/member-details.component';
import { MemberEditComponent } from './components/member-component/member-edit/member-edit.component';
import { MemberAddComponent } from './components/member-component/member-add/member-add.component';
import { AddMemberTypeComponent } from './components/member-type-component/add-member-type/add-member-type.component';
import { ContributionComponent } from './components/contributions/contribution/contribution.component';
import { EventDetailsComponent } from './components/events/event-details/event-details.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  {
    path: 'events',
    component: EventComponent
  },
  {
    path: 'events/:id',
    component: EventDetailsComponent
  },
  {
    path: 'management',
    component: ManagementComponent
  },
  {
    path: 'management/members',
    component: MemberComponent
  },
  {
    path: 'management/members/:id',
    component: MemberDetailsComponent
  },
  {
    path: 'management/members/:id/edit',
    component: MemberEditComponent
  },
  {
    path: 'management/add-member',
    component: MemberAddComponent
  },
  {
    path: 'management/member-types',
    component: MemberTypeComponent
  },
  {
    path: 'management/add-member-type',
    component: AddMemberTypeComponent
  },
  {
    path: 'management/contributions',
    component: ContributionComponent
  },
  {
    path: 'management/users',
    component: UserComponent
  },
  {
    path: 'contact',
    component: ContactComponent
  },
  {
    path: 'about',
    component: AboutComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
