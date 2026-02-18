<template>
  <div class="contact-page">
    <!-- Hero -->
    <section class="page-hero">
      <div class="container">
        <h1 class="page-title">Contact Us</h1>
        <p class="page-subtitle">We'd love to hear from you</p>
      </div>
    </section>

    <!-- Contact Section -->
    <section class="section contact-section">
      <div class="container">
        <div class="contact-grid">
          <!-- Contact Form -->
          <div class="contact-form-wrapper">
            <h2>Send Us a Message</h2>
            <p>Have a question? Fill out the form below and we'll get back to you soon.</p>

            <form @submit.prevent="submitForm" class="contact-form">
              <div class="form-group">
                <label for="name">Name *</label>
                <InputText 
                  id="name" 
                  v-model="form.name" 
                  placeholder="Your name"
                  :class="{ 'p-invalid': errors.name }"
                />
                <small v-if="errors.name" class="error-text">{{ errors.name }}</small>
              </div>

              <div class="form-row">
                <div class="form-group">
                  <label for="email">Email *</label>
                  <InputText 
                    id="email" 
                    v-model="form.email" 
                    type="email"
                    placeholder="your@email.com"
                    :class="{ 'p-invalid': errors.email }"
                  />
                  <small v-if="errors.email" class="error-text">{{ errors.email }}</small>
                </div>

                <div class="form-group">
                  <label for="phone">Phone</label>
                  <InputText 
                    id="phone" 
                    v-model="form.phone" 
                    placeholder="(555) 123-4567"
                  />
                </div>
              </div>

              <div class="form-group">
                <label for="event_type">What are you interested in?</label>
                <Select 
                  id="event_type" 
                  v-model="form.event_type"
                  :options="eventTypes"
                  optionLabel="label"
                  optionValue="value"
                  placeholder="Select an option"
                />
              </div>

              <div class="form-group">
                <label for="message">Message *</label>
                <Textarea 
                  id="message" 
                  v-model="form.message" 
                  rows="5"
                  placeholder="Tell us how we can help..."
                  :class="{ 'p-invalid': errors.message }"
                />
                <small v-if="errors.message" class="error-text">{{ errors.message }}</small>
              </div>

              <Message v-if="submitError" severity="error" :closable="false">
                {{ submitError }}
              </Message>

              <Message v-if="submitSuccess" severity="success" :closable="false">
                Thanks for reaching out! We'll get back to you within 24-48 hours.
              </Message>

              <Button 
                type="submit" 
                label="Send Message"
                :loading="loading"
                :disabled="submitSuccess"
                class="submit-btn"
              />
            </form>
          </div>

          <!-- Contact Info -->
          <div class="contact-info">
            <div class="info-card">
              <h3>Get in Touch</h3>
              <ul class="contact-list">
                <li>
                  <i class="pi pi-envelope"></i>
                  <div>
                    <span>Email</span>
                    <a href="mailto:hello@chaind.com">hello@chaind.com</a>
                  </div>
                </li>
                <li>
                  <i class="pi pi-phone"></i>
                  <div>
                    <span>Phone</span>
                    <a href="tel:+15551234567">(555) 123-4567</a>
                  </div>
                </li>
                <li>
                  <i class="pi pi-map-marker"></i>
                  <div>
                    <span>Location</span>
                    <p>Los Angeles, CA<br/>Mobile service throughout LA County</p>
                  </div>
                </li>
                <li>
                  <i class="pi pi-clock"></i>
                  <div>
                    <span>Response Time</span>
                    <p>We typically respond within 24-48 hours</p>
                  </div>
                </li>
              </ul>
            </div>

            <div class="social-card">
              <h3>Follow Us</h3>
              <p>Stay updated on our latest events and pop-ups</p>
              <div class="social-links">
                <a href="#" class="social-link" aria-label="Instagram">
                  <i class="pi pi-instagram"></i>
                </a>
                <a href="#" class="social-link" aria-label="Facebook">
                  <i class="pi pi-facebook"></i>
                </a>
                <a href="#" class="social-link" aria-label="TikTok">
                  <i class="pi pi-play"></i>
                </a>
                <a href="#" class="social-link" aria-label="Pinterest">
                  <i class="pi pi-pinterest"></i>
                </a>
              </div>
            </div>

            <div class="booking-card">
              <h3>Ready to Book?</h3>
              <p>Planning an event? Head to our booking page for a detailed inquiry form.</p>
              <router-link to="/book" class="btn btn-primary">
                Book an Event
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useApi } from '@/composables/useApi'

const api = useApi()
const loading = ref(false)
const submitSuccess = ref(false)
const submitError = ref('')

const form = reactive({
  name: '',
  email: '',
  phone: '',
  event_type: '',
  message: ''
})

const errors = reactive({
  name: '',
  email: '',
  message: ''
})

const eventTypes = [
  { label: 'General Inquiry', value: 'general' },
  { label: 'Private Party', value: 'private_party' },
  { label: 'Corporate Event', value: 'corporate' },
  { label: 'Bridal Event', value: 'bridal' },
  { label: 'Market/Pop-up', value: 'market' },
  { label: 'Collaboration', value: 'collaboration' },
  { label: 'Other', value: 'other' }
]

const validateForm = () => {
  let valid = true
  errors.name = ''
  errors.email = ''
  errors.message = ''

  if (!form.name.trim()) {
    errors.name = 'Name is required'
    valid = false
  }

  if (!form.email.trim()) {
    errors.email = 'Email is required'
    valid = false
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    errors.email = 'Please enter a valid email'
    valid = false
  }

  if (!form.message.trim()) {
    errors.message = 'Message is required'
    valid = false
  }

  return valid
}

const submitForm = async () => {
  submitError.value = ''
  
  if (!validateForm()) {
    return
  }

  loading.value = true

  try {
    await api.post('/contact', {
      name: form.name,
      email: form.email,
      phone: form.phone,
      event_type: form.event_type,
      message: form.message
    })

    submitSuccess.value = true
    
    // Reset form
    form.name = ''
    form.email = ''
    form.phone = ''
    form.event_type = ''
    form.message = ''
  } catch (err) {
    submitError.value = err.message || 'Something went wrong. Please try again.'
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
/* Page Hero */
.page-hero {
  padding: 6rem 0 4rem;
  background: linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.9)),
    url('https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=1920') center/cover;
  text-align: center;
}

.page-title {
  font-size: 3rem;
  font-weight: 200;
  letter-spacing: 0.3em;
  text-transform: uppercase;
  margin-bottom: 1rem;
}

.page-subtitle {
  font-size: 1.125rem;
  color: rgba(255, 255, 255, 0.7);
  letter-spacing: 0.05em;
}

/* Contact Section */
.contact-section {
  background: #0a0a0a;
}

.contact-grid {
  display: grid;
  grid-template-columns: 1fr 400px;
  gap: 4rem;
}

/* Contact Form */
.contact-form-wrapper {
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.1);
  padding: 3rem;
}

.contact-form-wrapper h2 {
  font-size: 1.75rem;
  font-weight: 300;
  letter-spacing: 0.1em;
  margin-bottom: 0.75rem;
}

.contact-form-wrapper > p {
  color: rgba(255, 255, 255, 0.6);
  margin-bottom: 2rem;
}

.contact-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-group label {
  font-size: 0.875rem;
  font-weight: 500;
  letter-spacing: 0.05em;
  color: rgba(255, 255, 255, 0.9);
}

/* PrimeVue Input Overrides */
:deep(.p-inputtext),
:deep(.p-textarea),
:deep(.p-select) {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: #fff;
  padding: 0.875rem 1rem;
  font-size: 1rem;
  border-radius: 0;
}

:deep(.p-inputtext:focus),
:deep(.p-textarea:focus),
:deep(.p-select:focus) {
  border-color: #c0c0c0;
  box-shadow: none;
}

:deep(.p-inputtext::placeholder),
:deep(.p-textarea::placeholder) {
  color: rgba(255, 255, 255, 0.4);
}

:deep(.p-inputtext.p-invalid),
:deep(.p-textarea.p-invalid) {
  border-color: #ef4444;
}

:deep(.p-select-label) {
  color: #fff;
}

:deep(.p-select-dropdown) {
  color: #fff;
}

.error-text {
  color: #ef4444;
  font-size: 0.8rem;
}

.submit-btn {
  background: #fff;
  color: #000;
  border: none;
  padding: 1rem 2rem;
  font-size: 0.875rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  cursor: pointer;
  transition: all 0.3s ease;
  border-radius: 0;
  align-self: flex-start;
}

.submit-btn:hover:not(:disabled) {
  background: #c0c0c0;
}

.submit-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

/* Contact Info */
.contact-info {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.info-card,
.social-card,
.booking-card {
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.1);
  padding: 2rem;
}

.info-card h3,
.social-card h3,
.booking-card h3 {
  font-size: 1.25rem;
  font-weight: 400;
  margin-bottom: 1.5rem;
  letter-spacing: 0.05em;
}

.contact-list {
  list-style: none;
}

.contact-list li {
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.contact-list li:last-child {
  margin-bottom: 0;
}

.contact-list i {
  font-size: 1.25rem;
  color: #c0c0c0;
  margin-top: 0.25rem;
}

.contact-list span {
  display: block;
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: rgba(255, 255, 255, 0.5);
  margin-bottom: 0.25rem;
}

.contact-list a {
  color: #fff;
  text-decoration: none;
  transition: color 0.3s ease;
}

.contact-list a:hover {
  color: #c0c0c0;
}

.contact-list p {
  color: rgba(255, 255, 255, 0.8);
  font-size: 0.9rem;
  line-height: 1.6;
}

.social-card p {
  color: rgba(255, 255, 255, 0.6);
  margin-bottom: 1.5rem;
  font-size: 0.9rem;
}

.social-links {
  display: flex;
  gap: 0.75rem;
}

.social-link {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 45px;
  height: 45px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  color: #fff;
  text-decoration: none;
  transition: all 0.3s ease;
}

.social-link:hover {
  background: #fff;
  color: #000;
  border-color: #fff;
}

.booking-card p {
  color: rgba(255, 255, 255, 0.6);
  margin-bottom: 1.5rem;
  font-size: 0.9rem;
  line-height: 1.6;
}

/* Buttons */
.btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 2rem;
  font-size: 0.875rem;
  font-weight: 500;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  text-decoration: none;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-primary {
  background: #fff;
  color: #000;
}

.btn-primary:hover {
  background: #c0c0c0;
}

/* Responsive */
@media (max-width: 1024px) {
  .contact-grid {
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  .contact-info {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
  }
}

@media (max-width: 768px) {
  .page-title {
    font-size: 2rem;
  }

  .contact-form-wrapper {
    padding: 2rem;
  }

  .form-row {
    grid-template-columns: 1fr;
  }

  .contact-info {
    grid-template-columns: 1fr;
  }
}
</style>
