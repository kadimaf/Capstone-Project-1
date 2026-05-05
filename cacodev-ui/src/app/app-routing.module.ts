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
import { UserDetailComponent } from './components/user/user-detail/user-detail.component';
import { MemberDetailsComponent } from './components/member-component/member-details/member-details.component';
import { MemberEditComponent } from './components/member-component/member-edit/member-edit.component';
import { MemberAddComponent } from './components/member-component/member-add/member-add.component';
import { AddMemberTypeComponent } from './components/member-type-component/add-member-type/add-member-type.component';
import { ContributionComponent } from './components/contributions/contribution/contribution.component';
import { EventDetailsComponent } from './components/events/event-details/event-details.component';
import { DonateComponent } from './components/donate/donate.component';
import { PaymentSuccessComponent } from './components/payment/payment-success/payment-success.component';
import { PaymentCancelComponent } from './components/payment/payment-cancel/payment-cancel.component';
import { LoginComponent } from './components/login/login.component';
import { AiChatComponent } from './components/ai-chat/ai-chat.component';
import { authGuard } from './guards/auth.guard';
import { adminGuard } from './guards/admin.guard';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [authGuard]
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
    component: ManagementComponent,
    canActivate: [authGuard]
  },
  {
    path: 'management/members',
    component: MemberComponent,
    canActivate: [adminGuard]
  },
  {
    path: 'management/members/:id',
    component: MemberDetailsComponent,
    canActivate: [authGuard]
  },
  {
    path: 'management/members/:id/edit',
    component: MemberEditComponent,
    canActivate: [authGuard]
  },
  {
    path: 'management/add-member',
    component: MemberAddComponent,
    canActivate: [adminGuard]
  },
  {
    path: 'management/member-types',
    component: MemberTypeComponent,
    canActivate: [adminGuard]
  },
  {
    path: 'management/add-member-type',
    component: AddMemberTypeComponent,
    canActivate: [adminGuard]
  },
  {
    path: 'management/contributions',
    component: ContributionComponent,
    canActivate: [adminGuard]
  },
  {
    path: 'management/users',
    component: UserComponent,
    canActivate: [adminGuard]
  },
  {
    path: 'management/users/:id',
    component: UserDetailComponent,
    canActivate: [adminGuard]
  },
  {
    path: 'contact',
    component: ContactComponent
  },
  {
    path: 'about',
    component: AboutComponent
  },
  {
    path: 'donate',
    component: DonateComponent
  },
  {
    path: 'payment/success',
    component: PaymentSuccessComponent
  },
  {
    path: 'payment/cancel',
    component: PaymentCancelComponent
  },
  {
    path: 'chat',
    component: AiChatComponent,
    canActivate: [authGuard]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
