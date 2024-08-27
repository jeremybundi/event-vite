import { createRouter, createWebHistory } from 'vue-router';
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
 }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
