<template>
  <div class="booking-page">
    <!-- Hero -->
    <section class="page-hero">
      <div class="container">
        <h1 class="page-title">Book an Event</h1>
        <p class="page-subtitle">Let's bring permanent jewelry to your celebration</p>
      </div>
    </section>

    <!-- Booking Form Section -->
    <section class="section booking-section">
      <div class="container">
        <div class="booking-grid">
          <!-- Booking Form -->
          <div class="booking-form-wrapper">
            <h2>Event Inquiry</h2>
            <p>Tell us about your event and we'll get back to you with availability and pricing.</p>

            <form @submit.prevent="submitForm" class="booking-form">
              <!-- Contact Info -->
              <div class="form-section">
                <h3>Your Information</h3>
                
                <div class="form-group">
                  <label for="name">Name *</label>
                  <InputText 
                    id="name" 
                    v-model="form.name" 
                    placeholder="Your full name"
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
                    <label for="phone">Phone *</label>
                    <InputText 
                      id="phone" 
                      v-model="form.phone" 
                      placeholder="(555) 123-4567"
                      :class="{ 'p-invalid': errors.phone }"
                    />
                    <small v-if="errors.phone" class="error-text">{{ errors.phone }}</small>
                  </div>
                </div>
              </div>

              <!-- Event Details -->
              <div class="form-section">
                <h3>Event Details</h3>

                <div class="form-group">
                  <label for="event_type">Event Type *</label>
                  <Select 
                    id="event_type" 
                    v-model="form.event_type"
                    :options="eventTypes"
                    optionLabel="label"
                    optionValue="value"
                    placeholder="Select event type"
                    :class="{ 'p-invalid': errors.event_type }"
                  />
                  <small v-if="errors.event_type" class="error-text">{{ errors.event_type }}</small>
                </div>

                <div class="form-row">
                  <div class="form-group">
                    <label for="event_date">Preferred Date</label>
                    <DatePicker 
                      id="event_date" 
                      v-model="form.event_date"
                      dateFormat="mm/dd/yy"
                      placeholder="Select a date"
                      :minDate="minDate"
                    />
                  </div>

                  <div class="form-group">
                    <label for="event_time">Preferred Time</label>
                    <Select 
                      id="event_time" 
                      v-model="form.event_time"
                      :options="timeSlots"
                      placeholder="Select time"
                    />
                  </div>
                </div>

                <div class="form-row">
                  <div class="form-group">
                    <label for="location">Event Location</label>
                    <InputText 
                      id="location" 
                      v-model="form.location" 
                      placeholder="City or venue name"
                    />
                  </div>

                  <div class="form-group">
                    <label for="guest_count">Expected Guests</label>
                    <InputNumber 
                      id="guest_count" 
                      v-model="form.guest_count"
                      :min="1"
                      :max="500"
                      placeholder="Number of guests"
                    />
                  </div>
                </div>

                <div class="form-group">
                  <label for="budget_range">Budget Range</label>
                  <Select 
                    id="budget_range" 
                    v-model="form.budget_range"
                    :options="budgetRanges"
                    placeholder="Select budget range"
                  />
                </div>
              </div>

              <!-- Additional Info -->
              <div class="form-section">
                <h3>Additional Information</h3>

                <div class="form-group">
                  <label for="message">Tell Us More</label>
                  <Textarea 
                    id="message" 
                    v-model="form.message" 
                    rows="4"
                    placeholder="Any special requests, themes, or questions?"
                  />
                </div>

                <div class="form-group">
                  <label for="how_heard">How did you hear about us?</label>
                  <Select 
                    id="how_heard" 
                    v-model="form.how_heard"
                    :options="referralSources"
                    placeholder="Select an option"
                  />
                </div>
              </div>

              <Message v-if="submitError" severity="error" :closable="false">
                {{ submitError }}
              </Message>

              <Message v-if="submitSuccess" severity="success" :closable="false">
                🎉 Thanks for your inquiry! We'll review your request and get back to you within 24-48 hours.
              </Message>

              <Button 
                type="submit" 
                label="Submit Inquiry"
                :loading="loading"
                :disabled="submitSuccess"
                class="submit-btn"
              />
            </form>
          </div>

          <!-- Sidebar -->
          <div class="booking-sidebar">
            <div class="info-card">
              <h3>What to Expect</h3>
              <ol class="expect-list">
                <li>
                  <span>1</span>
                  <div>
                    <strong>Submit Inquiry</strong>
                    <p>Fill out the form with your event details</p>
                  </div>
                </li>
                <li>
                  <span>2</span>
                  <div>
                    <strong>We'll Reach Out</strong>
                    <p>Within 24-48 hours to discuss details</p>
                  </div>
                </li>
                <li>
                  <span>3</span>
                  <div>
                    <strong>Confirm & Book</strong>
                    <p>Finalize details and secure your date</p>
                  </div>
                </li>
                <li>
                  <span>4</span>
                  <div>
                    <strong>Event Day!</strong>
                    <p>We arrive and create magic</p>
                  </div>
                </li>
              </ol>
            </div>

            <div class="info-card">
              <h3>Event Minimums</h3>
              <ul class="minimum-list">
                <li>
                  <strong>Private Parties</strong>
                  <span>6+ guests</span>
                </li>
                <li>
                  <strong>Bridal Events</strong>
                  <span>4+ guests</span>
                </li>
                <li>
                  <strong>Corporate Events</strong>
                  <span>10+ guests</span>
                </li>
              </ul>
              <p class="note">Travel fees may apply for locations outside LA County.</p>
            </div>

            <div class="info-card highlight">
              <h3>Questions?</h3>
              <p>Not ready to book yet? Feel free to reach out with any questions.</p>
              <router-link to="/contact" class="link">
                Contact Us <i class="pi pi-arrow-right"></i>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'
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
  event_date: null,
  event_time: '',
  location: '',
  guest_count: null,
  budget_range: '',
  message: '',
  how_heard: ''
})

const errors = reactive({
  name: '',
  email: '',
  phone: '',
  event_type: ''
})

const minDate = computed(() => {
  const date = new Date()
  date.setDate(date.getDate() + 7) // At least 1 week out
  return date
})

const eventTypes = [
  { label: 'Private Party (Birthday, Girls Night, etc.)', value: 'private_party' },
  { label: 'Bachelorette / Bridal Shower', value: 'bridal' },
  { label: 'Corporate Event / Team Building', value: 'corporate' },
  { label: 'Market / Festival Vendor', value: 'market' },
  { label: 'Pop-up at Business', value: 'popup' },
  { label: 'Other', value: 'other' }
]

const timeSlots = [
  'Morning (9am - 12pm)',
  'Afternoon (12pm - 4pm)',
  'Evening (4pm - 8pm)',
  'Flexible'
]

const budgetRanges = [
  'Under $500',
  '$500 - $1,000',
  '$1,000 - $2,500',
  '$2,500 - $5,000',
  '$5,000+',
  'Not sure yet'
]

const referralSources = [
  'Instagram',
  'Facebook',
  'TikTok',
  'Google Search',
  'Friend/Family',
  'Previous Event',
  'Market/Pop-up',
  'Other'
]

const validateForm = () => {
  let valid = true
  errors.name = ''
  errors.email = ''
  errors.phone = ''
  errors.event_type = ''

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

  if (!form.phone.trim()) {
    errors.phone = 'Phone is required'
    valid = false
  }

  if (!form.event_type) {
    errors.event_type = 'Please select an event type'
    valid = false
  }

  return valid
}

const formatDate = (date) => {
  if (!date) return null
  const d = new Date(date)
  return d.toISOString().split('T')[0]
}

const submitForm = async () => {
  submitError.value = ''
  
  if (!validateForm()) {
    return
  }

  loading.value = true

  try {
    await api.post('/bookings', {
      name: form.name,
      email: form.email,
      phone: form.phone,
      event_type: form.event_type,
      event_date: formatDate(form.event_date),
      event_time: form.event_time,
      location: form.location,
      guest_count: form.guest_count,
      budget_range: form.budget_range,
      message: form.message,
      how_heard: form.how_heard
    })

    submitSuccess.value = true
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
    url('https://images.unsplash.com/photo-1519741497674-611481863552?w=1920') center/cover;
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

/* Booking Section */
.booking-section {
  background: #0a0a0a;
}

.booking-grid {
  display: grid;
  grid-template-columns: 1fr 380px;
  gap: 3rem;
}

/* Booking Form */
.booking-form-wrapper {
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.1);
  padding: 3rem;
}

.booking-form-wrapper > h2 {
  font-size: 1.75rem;
  font-weight: 300;
  letter-spacing: 0.1em;
  margin-bottom: 0.75rem;
}

.booking-form-wrapper > p {
  color: rgba(255, 255, 255, 0.6);
  margin-bottom: 2rem;
}

.booking-form {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.form-section {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-section h3 {
  font-size: 1rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: #c0c0c0;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
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
:deep(.p-select),
:deep(.p-datepicker-input),
:deep(.p-inputnumber-input) {
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
:deep(.p-select.p-invalid) {
  border-color: #ef4444;
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

/* Sidebar */
.booking-sidebar {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.info-card {
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.1);
  padding: 2rem;
}

.info-card.highlight {
  border-color: #c0c0c0;
}

.info-card h3 {
  font-size: 1.125rem;
  font-weight: 400;
  margin-bottom: 1.5rem;
  letter-spacing: 0.05em;
}

.expect-list {
  list-style: none;
}

.expect-list li {
  display: flex;
  gap: 1rem;
  margin-bottom: 1.25rem;
}

.expect-list li:last-child {
  margin-bottom: 0;
}

.expect-list span {
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(192, 192, 192, 0.2);
  color: #c0c0c0;
  font-size: 0.8rem;
  font-weight: 600;
  flex-shrink: 0;
}

.expect-list strong {
  display: block;
  font-weight: 500;
  margin-bottom: 0.25rem;
}

.expect-list p {
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.6);
}

.minimum-list {
  list-style: none;
  margin-bottom: 1rem;
}

.minimum-list li {
  display: flex;
  justify-content: space-between;
  padding: 0.75rem 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  font-size: 0.9rem;
}

.minimum-list li:last-child {
  border-bottom: none;
}

.minimum-list span {
  color: #c0c0c0;
}

.note {
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.5);
  font-style: italic;
}

.info-card.highlight p {
  color: rgba(255, 255, 255, 0.7);
  margin-bottom: 1rem;
  font-size: 0.9rem;
}

.link {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: #fff;
  text-decoration: none;
  font-size: 0.875rem;
  font-weight: 500;
  letter-spacing: 0.05em;
  transition: color 0.3s ease;
}

.link:hover {
  color: #c0c0c0;
}

/* Responsive */
@media (max-width: 1024px) {
  .booking-grid {
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  .booking-sidebar {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
  }
}

@media (max-width: 768px) {
  .page-title {
    font-size: 2rem;
  }

  .booking-form-wrapper {
    padding: 2rem;
  }

  .form-row {
    grid-template-columns: 1fr;
  }

  .booking-sidebar {
    grid-template-columns: 1fr;
  }
}
</style>
