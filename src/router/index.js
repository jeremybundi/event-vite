import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '../stores/auth';

import Main from '../views/Main.vue';
import SignUp from '../views/SIgnUp.vue'
import EventDetails from '../views/EventDetails.vue';
import Login from '../views/Login.vue';
import AddEvent from '../views/AddEvent.vue';
import EventList from '../views/EventList.vue';
import EditForm from '../views/EventEditForm.vue';
import AdminView from '../views/AdminViewAllTicket.vue'
import AdminValidate from '../views/AdminValidateTicket.vue'
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

const routes = [
  {
    path: '/',
    name: 'main',
    component: Main
  },
  {
    path: '/signup',
    name: 'SignUp',
    component: SignUp
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/event/:id',
    name: 'EventDetails',
    component: EventDetails,
    props: true
  },
  {
    path: '/add',
    name: 'Add',
    component: AddEvent
  },
  {
    path: '/list',
    name: 'List',
    component: EventList
  },
  {
    path: '/edit',
    name: 'Edit',
    component: EditForm
  },
  {
    path: '/adminview',
    name: 'adminview',
    component: AdminView
  },
  {
    path: '/adminvalidate',
    name: 'adminvalidate',
    component: AdminValidate
  },
  {
    path: '/forgot',
    name: 'forgotpassword',
    component: ForgotPassword
  },
  {
    path: '/summary',
    name: 'summary',
    component: EventSummary
  },
  {
    path: '/analysis',
    name: 'analysis',
    component: EventAnalysis
  },
  {
    path: '/roles',
    name: 'roles',
    component: UpdateRoles
  },
  {
    path: '/usereventaccess',
    name: 'UserEvent',
    component: UserEventAccess
  },
  {
    path: '/customergetticketsall',
    name: 'GetAll',
    component: CustomerGetTickets
  },
  {
    path: '/customerpaidtickets',
    name: 'GetPaid',
    component: CustomerPaidTicket
  },
  {
    path: '/admindashboard',
    name: 'admindashboard',
    component: AdminDashboard,
    meta: { requiresAuth: true, roles: ['System Admin', 'Super Admin'] } 
  },
  {
    path: '/organizersdashboard',
    name: 'organizersdashboard',
    component: OrganizerDashboard,
    meta: { requiresAuth: true, roles: ['Event Organizers'] } // Added roles
  },
  {
    path: '/validatordashboard',
    name: 'validatordashboard',
    component: ValidatorDashboard,
    meta: { requiresAuth: true, roles: ['Validator'] } // Added roles
  },
  {
    path: '/customerdashboard',
    name: 'customerdashboard',
    component: CustomerDashboard,
    meta: { requiresAuth: true, roles: ['Customer'] } // Added roles
  }
];


const router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  const user = authStore.getUser();
  const isAuthenticated = authStore.isAuthenticated;

  // Redirect to login if not authenticated and trying to access a protected route
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!isAuthenticated) {
      return next({ name: 'Login' });
    }

    // Role-based redirection after login
    if (user) {
      const role = user.role;
      const allowedRoles = to.meta.roles;

      if (allowedRoles && !allowedRoles.includes(role)) {
        // User role is not allowed to access this route
        return next({ name: 'Login' }); // or redirect to an error page or homepage
      }
    }
  }

  next();
});


export default router;
