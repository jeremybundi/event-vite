import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '../stores/auth';

import Main from '../views/Main.vue';
import SignUp from '../views/SIgnUp.vue';
import EventDetails from '../views/EventDetails.vue';
import Login from '../views/Login.vue';
import AddEvent from '../views/AddEvent.vue';
import EventList from '../views/EventList.vue';
import EditForm from '../views/EventEditForm.vue';
import AdminView from '../views/AdminViewAllTicket.vue';
import AdminValidate from '../views/AdminValidateTicket.vue';
import ForgotPassword from '../views/ForgotPassword.vue';
import EventSummary from '../views/EventSummary.vue';
import UpdateRoles from '../views/UpdateRoles.vue';
import AdminDashboard from '../views/AdminDashboard.vue';
import OrganizerDashboard from '../views/OrganizerDashboard.vue';
import ValidatorDashboard from '../views/ValidatorDashboard.vue';
import CustomerDashboard from '../views/CustomerDashboard.vue';
import UserEventAccess from '../views/UserEventAccess.vue';
import CustomerGetTickets from '../views/CustomerGetTickets.vue';
import CustomerPaidTicket from '../views/CustomerPaidTicket.vue';
import EventAnalysis from '../views/EventAnalysis.vue';
import RedeemTicket from '../views/RedeemTicket.vue';
import CustomerLogin from '../views/CustomerLogin.vue';

const routes = [
  {
    path: '/',
    name: 'main',
    component: Main,
  },
  {
    path: '/signup',
    name: 'SignUp',
    component: SignUp,
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/customerlogin',
    name: 'CustomerLogin',
    component: CustomerLogin,
  },
  {
    path: '/event/:id',
    name: 'EventDetails',
    component: EventDetails,
    props: true,
    //meta: { requiresAuth: true, roles: ['System Admin', 'Super Admin', 'Event Organizers', 'Validator', 'Customer'] }
  },

  {
    path: '/add',
    name: 'Add',
    component: AddEvent,
    meta: {
      requiresAuth: true,
      roles: ['System Admin', 'Super Admin', 'Event Organizers'],
    },
  },
  {
    path: '/list',
    name: 'List',
    component: EventList,
    meta: {
      requiresAuth: true,
      roles: ['System Admin', 'Super Admin', 'Event Organizers'],
    },
  },
  {
    path: '/edit',
    name: 'Edit',
    component: EditForm,
    meta: {
      requiresAuth: true,
      roles: ['System Admin', 'Super Admin', 'Event Organizers'],
    },
  },
  {
    path: '/adminview',
    name: 'adminview',
    component: AdminView,
    meta: {
      requiresAuth: true,
      roles: ['System Admin', 'Super Admin', 'Event Organizers'],
    },
  },
  {
    path: '/adminvalidate',
    name: 'adminvalidate',
    component: AdminValidate,
    meta: {
      requiresAuth: true,
      roles: ['System Admin', 'Super Admin', 'Event Organizers', 'Validator'],
    },
  },
  {
    path: '/redeem',
    name: 'redeem',
    component: RedeemTicket,
    meta: {
      requiresAuth: true,
      roles: ['System Admin', 'Super Admin', 'Event Organizers', 'Validator'],
    },
  },
  {
    path: '/forgot',
    name: 'forgotpassword',
    component: ForgotPassword,
  },
  {
    path: '/summary',
    name: 'summary',
    component: EventSummary,
    meta: {
      requiresAuth: true,
      roles: ['System Admin', 'Super Admin', 'Event Organizers'],
    },
  },
  {
    path: '/analysis',
    name: 'analysis',
    component: EventAnalysis,
    meta: { requiresAuth: true, roles: ['System Admin', 'Super Admin'] },
  },
  {
    path: '/roles',
    name: 'roles',
    component: UpdateRoles,
    meta: { requiresAuth: true, roles: ['System Admin', 'Super Admin'] },
  },
  {
    path: '/usereventaccess',
    name: 'UserEvent',
    component: UserEventAccess,
    meta: {
      requiresAuth: true,
      roles: ['System Admin', 'Super Admin', 'Event Organizers'],
    },
  },
  {
    path: '/customergetticketsall',
    name: 'GetAll',
    component: CustomerGetTickets,
    // meta: { requiresAuth: true, roles: ['System Admin', 'Super Admin', 'Event Organizers', 'Validator', 'Customer'] }
  },
  {
    path: '/customerpaidtickets',
    name: 'GetPaid',
    component: CustomerPaidTicket,
    // meta: { requiresAuth: true, roles: ['System Admin', 'Super Admin', 'Event Organizers', 'Validator', 'Customer'] }
  },
  {
    path: '/admindashboard',
    name: 'admindashboard',
    component: AdminDashboard,
    meta: { requiresAuth: true, roles: ['System Admin', 'Super Admin'] },
  },
  {
    path: '/organizersdashboard',
    name: 'organizersdashboard',
    component: OrganizerDashboard,
    // meta: { requiresAuth: true, roles: ['Event Organizers'] }
  },
  {
    path: '/validatordashboard',
    name: 'validatordashboard',
    component: ValidatorDashboard,
    // meta: { requiresAuth: true, roles: ['Validator'] }
  },
  {
    path: '/customerdashboard',
    name: 'customerdashboard',
    component: CustomerDashboard,
    //meta: { requiresAuth: true, roles: ['System Admin', 'Super Admin', 'Event Organizers', 'Validator', 'Customer'] }
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  const user = authStore.getUser();
  const isAuthenticated = authStore.isAuthenticated;

  // Redirect to login if not authenticated and trying to access a protected route
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!isAuthenticated) {
      return next({ name: 'Login' });
    }

    // Role-based redirection after login
    if (user) {
      const role = user.role;
      const allowedRoles = to.meta.roles;

      if (allowedRoles && !allowedRoles.includes(role)) {
        // User role is not allowed to access this route
        return next({});
      }
    }
  }

  next();
});

export default router;
