<template>
  <div class="services-page">
    <!-- Hero -->
    <section class="page-hero">
      <div class="container">
        <h1 class="page-title">Services & Events</h1>
        <p class="page-subtitle">We bring the permanent jewelry experience to you</p>
      </div>
    </section>

    <!-- Intro -->
    <section class="section intro-section">
      <div class="container">
        <div class="intro-content">
          <h2>Events Made Memorable</h2>
          <p>
            From intimate gatherings to large-scale corporate events, CHAIND brings 
            the magic of permanent jewelry directly to you. Our mobile setup means 
            we can transform any space into a jewelry experience your guests will 
            never forget.
          </p>
        </div>
      </div>
    </section>

    <!-- Services Grid -->
    <section class="section services-section">
      <div class="container">
        <div class="services-grid">
          <!-- Private Parties -->
          <div class="service-card">
            <div class="service-image">
              <img src="https://images.unsplash.com/photo-1529543544277-750e0b43e56a?w=600" alt="Private party" />
            </div>
            <div class="service-content">
              <h3>Private Parties</h3>
              <p>
                Perfect for birthdays, bachelorette parties, girls' nights, and any 
                celebration. We'll set up at your home or venue and create a unique 
                experience for you and your guests.
              </p>
              <ul class="service-features">
                <li><i class="pi pi-check"></i> Minimum 6 guests</li>
                <li><i class="pi pi-check"></i> 2-hour experience</li>
                <li><i class="pi pi-check"></i> All supplies included</li>
                <li><i class="pi pi-check"></i> Variety of chain options</li>
              </ul>
              <router-link to="/book" class="service-link">
                Book a Party <i class="pi pi-arrow-right"></i>
              </router-link>
            </div>
          </div>

          <!-- Bridal Events -->
          <div class="service-card">
            <div class="service-image">
              <img src="https://images.unsplash.com/photo-1519741497674-611481863552?w=600" alt="Bridal party" />
            </div>
            <div class="service-content">
              <h3>Bridal Events</h3>
              <p>
                Give your bridal party a gift they'll cherish forever. Matching permanent 
                bracelets are the perfect way to bond with your bridesmaids before the big day.
              </p>
              <ul class="service-features">
                <li><i class="pi pi-check"></i> Bridal showers & rehearsals</li>
                <li><i class="pi pi-check"></i> Custom chain selections</li>
                <li><i class="pi pi-check"></i> Group packages available</li>
                <li><i class="pi pi-check"></i> On-location service</li>
              </ul>
              <router-link to="/book" class="service-link">
                Inquire About Bridal <i class="pi pi-arrow-right"></i>
              </router-link>
            </div>
          </div>

          <!-- Corporate Events -->
          <div class="service-card">
            <div class="service-image">
              <img src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600" alt="Corporate event" />
            </div>
            <div class="service-content">
              <h3>Corporate Events</h3>
              <p>
                Looking for a unique team-building activity? Permanent jewelry creates 
                lasting memories and bonds between team members. Perfect for retreats, 
                celebrations, and company milestones.
              </p>
              <ul class="service-features">
                <li><i class="pi pi-check"></i> Team building experience</li>
                <li><i class="pi pi-check"></i> Custom corporate packages</li>
                <li><i class="pi pi-check"></i> Multiple jewelers available</li>
                <li><i class="pi pi-check"></i> Invoice billing</li>
              </ul>
              <router-link to="/book" class="service-link">
                Get Corporate Quote <i class="pi pi-arrow-right"></i>
              </router-link>
            </div>
          </div>

          <!-- Markets & Pop-ups -->
          <div class="service-card">
            <div class="service-image">
              <img src="https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?w=600" alt="Market booth" />
            </div>
            <div class="service-content">
              <h3>Markets & Pop-ups</h3>
              <p>
                Find us at local farmers markets, art festivals, and pop-up events 
                throughout Los Angeles. Follow us on social media to see where we'll 
                be next!
              </p>
              <ul class="service-features">
                <li><i class="pi pi-check"></i> Walk-in friendly</li>
                <li><i class="pi pi-check"></i> No appointment needed</li>
                <li><i class="pi pi-check"></i> Special event pricing</li>
                <li><i class="pi pi-check"></i> Cash & card accepted</li>
              </ul>
              <a href="#" class="service-link">
                Follow for Updates <i class="pi pi-instagram"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Pricing Section -->
    <section class="section pricing-section">
      <div class="container">
        <h2 class="section-title">Pricing</h2>
        <p class="section-subtitle">
          Transparent pricing for lasting jewelry
        </p>

        <div class="pricing-grid">
          <div class="pricing-card">
            <h3>Bracelets</h3>
            <div class="price-range">$45 - $85</div>
            <ul>
              <li>Sterling silver from $45</li>
              <li>14k gold-filled from $65</li>
              <li>Add charms from $10</li>
            </ul>
          </div>

          <div class="pricing-card featured">
            <div class="featured-badge">Most Popular</div>
            <h3>Anklets</h3>
            <div class="price-range">$55 - $95</div>
            <ul>
              <li>Sterling silver from $55</li>
              <li>14k gold-filled from $75</li>
              <li>Extra length included</li>
            </ul>
          </div>

          <div class="pricing-card">
            <h3>Necklaces</h3>
            <div class="price-range">$75 - $150</div>
            <ul>
              <li>Sterling silver from $75</li>
              <li>14k gold-filled from $100</li>
              <li>Various chain styles</li>
            </ul>
          </div>
        </div>

        <div class="pricing-note">
          <p>
            <i class="pi pi-info-circle"></i>
            Event minimums may apply for private bookings. Contact us for custom 
            packages and group discounts.
          </p>
        </div>
      </div>
    </section>

    <!-- Past Events -->
    <section class="section past-events">
      <div class="container">
        <h2 class="section-title">Past Events</h2>
        <p class="section-subtitle">
          A glimpse at some of the amazing events we've been part of
        </p>

        <div class="events-grid">
          <div class="event-card">
            <img src="https://images.unsplash.com/photo-1531058020387-3be344556be6?w=400" alt="Event" />
            <div class="event-info">
              <span class="event-type">Corporate</span>
              <h4>Tech Company Team Day</h4>
              <p>50+ employees linked forever</p>
            </div>
          </div>
          <div class="event-card">
            <img src="https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?w=400" alt="Event" />
            <div class="event-info">
              <span class="event-type">Bridal</span>
              <h4>Sarah's Bachelorette</h4>
              <p>Matching bracelets for the whole squad</p>
            </div>
          </div>
          <div class="event-card">
            <img src="https://images.unsplash.com/photo-1511578314322-379afb476865?w=400" alt="Event" />
            <div class="event-info">
              <span class="event-type">Market</span>
              <h4>LA Art Walk</h4>
              <p>Weekend pop-up in DTLA</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="section cta-section">
      <div class="container">
        <div class="cta-content">
          <h2>Let's Create Something Special</h2>
          <p>Tell us about your event and we'll craft the perfect experience</p>
          <router-link to="/book" class="btn btn-primary btn-large">
            Book Your Event
          </router-link>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
</script>

<style scoped>
/* Page Hero */
.page-hero {
  padding: 6rem 0 4rem;
  background: linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.9)),
    url('https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1920') center/cover;
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

/* Intro Section */
.intro-content {
  max-width: 800px;
  margin: 0 auto;
  text-align: center;
}

.intro-content h2 {
  font-size: 2rem;
  font-weight: 300;
  letter-spacing: 0.1em;
  margin-bottom: 1.5rem;
}

.intro-content p {
  font-size: 1.125rem;
  color: rgba(255, 255, 255, 0.7);
  line-height: 1.8;
}

/* Services Grid */
.services-section {
  background: #0a0a0a;
}

.services-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
}

.service-card {
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.1);
  display: grid;
  grid-template-columns: 1fr 1fr;
  overflow: hidden;
}

.service-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  min-height: 300px;
}

.service-content {
  padding: 2rem;
  display: flex;
  flex-direction: column;
}

.service-content h3 {
  font-size: 1.5rem;
  font-weight: 400;
  margin-bottom: 1rem;
  letter-spacing: 0.05em;
}

.service-content > p {
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.95rem;
  line-height: 1.7;
  margin-bottom: 1.5rem;
}

.service-features {
  list-style: none;
  margin-bottom: 1.5rem;
  flex: 1;
}

.service-features li {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 0.75rem;
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.8);
}

.service-features i {
  color: #c0c0c0;
}

.service-link {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: #fff;
  text-decoration: none;
  font-size: 0.875rem;
  font-weight: 500;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  transition: color 0.3s ease;
}

.service-link:hover {
  color: #c0c0c0;
}

/* Pricing Section */
.pricing-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
}

.pricing-card {
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.1);
  padding: 2.5rem;
  text-align: center;
  position: relative;
}

.pricing-card.featured {
  border-color: #c0c0c0;
  transform: scale(1.05);
}

.featured-badge {
  position: absolute;
  top: 0;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #c0c0c0;
  color: #000;
  padding: 0.5rem 1.5rem;
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

.pricing-card h3 {
  font-size: 1.25rem;
  font-weight: 400;
  margin-bottom: 1rem;
  letter-spacing: 0.05em;
}

.price-range {
  font-size: 2rem;
  font-weight: 300;
  color: #c0c0c0;
  margin-bottom: 1.5rem;
}

.pricing-card ul {
  list-style: none;
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.9rem;
}

.pricing-card li {
  padding: 0.75rem 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

.pricing-card li:last-child {
  border-bottom: none;
}

.pricing-note {
  max-width: 600px;
  margin: 3rem auto 0;
  text-align: center;
}

.pricing-note p {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  color: rgba(255, 255, 255, 0.6);
  font-size: 0.9rem;
}

/* Past Events */
.past-events {
  background: #0a0a0a;
}

.events-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
}

.event-card {
  position: relative;
  overflow: hidden;
}

.event-card img {
  width: 100%;
  height: 300px;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.event-card:hover img {
  transform: scale(1.1);
}

.event-info {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 1.5rem;
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.9));
}

.event-type {
  font-size: 0.7rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: #c0c0c0;
}

.event-info h4 {
  font-size: 1.125rem;
  font-weight: 500;
  margin: 0.5rem 0 0.25rem;
}

.event-info p {
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.7);
}

/* CTA Section */
.cta-section {
  text-align: center;
}

.cta-content h2 {
  font-size: 2.5rem;
  font-weight: 300;
  letter-spacing: 0.1em;
  margin-bottom: 1rem;
}

.cta-content p {
  font-size: 1.125rem;
  color: rgba(255, 255, 255, 0.7);
  margin-bottom: 2rem;
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

.btn-large {
  padding: 1.25rem 2.5rem;
  font-size: 1rem;
}

/* Responsive */
@media (max-width: 1024px) {
  .service-card {
    grid-template-columns: 1fr;
  }

  .service-image img {
    height: 250px;
  }

  .pricing-card.featured {
    transform: none;
  }
}

@media (max-width: 768px) {
  .page-title {
    font-size: 2rem;
  }

  .services-grid {
    grid-template-columns: 1fr;
  }

  .pricing-grid,
  .events-grid {
    grid-template-columns: 1fr;
  }

  .cta-content h2 {
    font-size: 1.75rem;
  }
}
</style>
