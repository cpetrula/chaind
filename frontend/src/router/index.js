import { createRouter, createWebHistory } from 'vue-router'

// Public pages
import HomePage from '@/views/HomePage.vue'
import AboutPage from '@/views/AboutPage.vue'
import GalleryPage from '@/views/GalleryPage.vue'
import ServicesPage from '@/views/ServicesPage.vue'
import FaqPage from '@/views/FaqPage.vue'
import ContactPage from '@/views/ContactPage.vue'
import BookingPage from '@/views/BookingPage.vue'

// Admin pages
import AdminLogin from '@/views/admin/AdminLogin.vue'
import AdminDashboard from '@/views/admin/AdminDashboard.vue'
import AdminGallery from '@/views/admin/AdminGallery.vue'
import AdminContacts from '@/views/admin/AdminContacts.vue'
import AdminBookings from '@/views/admin/AdminBookings.vue'

const routes = [
  // Public routes
  {
    path: '/',
    name: 'home',
    component: HomePage,
    meta: { title: 'CHAIND | Permanent Jewelry' }
  },
  {
    path: '/about',
    name: 'about',
    component: AboutPage,
    meta: { title: 'About Us | CHAIND' }
  },
  {
    path: '/gallery',
    name: 'gallery',
    component: GalleryPage,
    meta: { title: 'Gallery | CHAIND' }
  },
  {
    path: '/services',
    name: 'services',
    component: ServicesPage,
    meta: { title: 'Services & Events | CHAIND' }
  },
  {
    path: '/faq',
    name: 'faq',
    component: FaqPage,
    meta: { title: 'FAQ | CHAIND' }
  },
  {
    path: '/contact',
    name: 'contact',
    component: ContactPage,
    meta: { title: 'Contact Us | CHAIND' }
  },
  {
    path: '/book',
    name: 'book',
    component: BookingPage,
    meta: { title: 'Book an Event | CHAIND' }
  },

  // Admin routes
  {
    path: '/admin/login',
    name: 'admin-login',
    component: AdminLogin,
    meta: { title: 'Admin Login | CHAIND' }
  },
  {
    path: '/admin',
    name: 'admin-dashboard',
    component: AdminDashboard,
    meta: { title: 'Dashboard | CHAIND Admin', requiresAuth: true }
  },
  {
    path: '/admin/gallery',
    name: 'admin-gallery',
    component: AdminGallery,
    meta: { title: 'Gallery Management | CHAIND Admin', requiresAuth: true }
  },
  {
    path: '/admin/contacts',
    name: 'admin-contacts',
    component: AdminContacts,
    meta: { title: 'Contact Inquiries | CHAIND Admin', requiresAuth: true }
  },
  {
    path: '/admin/bookings',
    name: 'admin-bookings',
    component: AdminBookings,
    meta: { title: 'Booking Requests | CHAIND Admin', requiresAuth: true }
  },

  // Catch-all redirect
  {
    path: '/:pathMatch(.*)*',
    redirect: '/'
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  }
})

// Navigation guard for auth
router.beforeEach((to, from, next) => {
  // Update page title
  document.title = to.meta.title || 'CHAIND | Permanent Jewelry'

  // Check auth for protected routes
  if (to.meta.requiresAuth) {
    const token = localStorage.getItem('chaind_token')
    if (!token) {
      next({ name: 'admin-login', query: { redirect: to.fullPath } })
      return
    }
  }

  // Redirect from login if already authenticated
  if (to.name === 'admin-login') {
    const token = localStorage.getItem('chaind_token')
    if (token) {
      next({ name: 'admin-dashboard' })
      return
    }
  }

  next()
})

export default router
