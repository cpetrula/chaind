<template>
  <div class="about-page">
    <!-- Hero -->
    <section class="page-hero">
      <div class="container">
        <h1 class="page-title">Our Story</h1>
        <p class="page-subtitle">Creating connections, one link at a time</p>
      </div>
    </section>

    <!-- Story Section -->
    <section class="section story-section">
      <div class="container">
        <div class="story-content">
          <div class="story-image">
            <img 
              src="https://images.unsplash.com/photo-1556745753-b2904692b3cd?w=600" 
              alt="Our workspace"
            />
          </div>
          <div class="story-text">
            <h2>How It All Started</h2>
            <p>
              CHAIND was born from a simple idea: jewelry should tell a story. 
              What started as a passion project at local markets has grown into 
              something much bigger — a way to help people celebrate their most 
              meaningful relationships.
            </p>
            <p>
              We believe that the best accessories are the ones you never want to 
              take off. That's why we specialize in permanent jewelry — pieces that 
              become a part of you, symbolizing bonds that last a lifetime.
            </p>
            <p>
              From bachelorette parties to corporate team-building events, we've had 
              the privilege of being part of thousands of special moments. Each weld 
              we make isn't just jewelry — it's a memory sealed in precious metal.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Values Section -->
    <section class="section values-section">
      <div class="container">
        <h2 class="section-title">What We Stand For</h2>
        <div class="values-grid">
          <div class="value-card">
            <div class="value-icon">
              <i class="pi pi-heart-fill"></i>
            </div>
            <h3>Connection</h3>
            <p>
              Every piece we create represents a bond — friendship, love, family, 
              or self-celebration. We're honored to be part of those stories.
            </p>
          </div>
          <div class="value-card">
            <div class="value-icon">
              <i class="pi pi-star-fill"></i>
            </div>
            <h3>Quality</h3>
            <p>
              We use only the finest materials — 14k gold-filled and sterling silver 
              chains that are built to last as long as your relationships.
            </p>
          </div>
          <div class="value-card">
            <div class="value-icon">
              <i class="pi pi-sparkles"></i>
            </div>
            <h3>Experience</h3>
            <p>
              We don't just create jewelry; we create memories. From the moment we 
              arrive until the last weld is complete, we make it special.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Team Section -->
    <section class="section team-section">
      <div class="container">
        <h2 class="section-title">Meet the Team</h2>
        <p class="section-subtitle">
          The creative minds behind every link
        </p>
        
        <div class="team-grid">
          <div class="team-member">
            <div class="member-image">
              <img 
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400" 
                alt="Team member"
              />
            </div>
            <h3>Sarah Johnson</h3>
            <span class="member-role">Founder & Lead Jeweler</span>
            <p>
              With over 10 years in jewelry design, Sarah brings expertise and 
              passion to every piece she creates.
            </p>
          </div>
          <div class="team-member">
            <div class="member-image">
              <img 
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400" 
                alt="Team member"
              />
            </div>
            <h3>Mike Chen</h3>
            <span class="member-role">Events Coordinator</span>
            <p>
              Mike ensures every event runs smoothly, bringing positive energy 
              and attention to detail wherever he goes.
            </p>
          </div>
          <div class="team-member">
            <div class="member-image">
              <img 
                src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400" 
                alt="Team member"
              />
            </div>
            <h3>Emily Rodriguez</h3>
            <span class="member-role">Jeweler & Stylist</span>
            <p>
              Emily helps clients find the perfect chain to match their style 
              and the occasion they're celebrating.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Process Section -->
    <section class="section process-section">
      <div class="container">
        <h2 class="section-title">Our Process</h2>
        <p class="section-subtitle">
          Simple, quick, and completely painless
        </p>

        <div class="process-steps">
          <div class="process-step">
            <div class="step-number">01</div>
            <h3>Choose Your Chain</h3>
            <p>
              Browse our selection of 14k gold-filled and sterling silver chains. 
              We'll help you pick the perfect style and weight for your look.
            </p>
          </div>
          <div class="process-step">
            <div class="step-number">02</div>
            <h3>Custom Fit</h3>
            <p>
              We measure and cut the chain to fit your wrist, ankle, or neck 
              perfectly. No gaps, no tightness — just right.
            </p>
          </div>
          <div class="process-step">
            <div class="step-number">03</div>
            <h3>The Weld</h3>
            <p>
              Using a specialized micro-welding tool, we fuse the chain ends 
              together. It takes seconds and you feel nothing but a tiny spark.
            </p>
          </div>
          <div class="process-step">
            <div class="step-number">04</div>
            <h3>Forever Linked</h3>
            <p>
              That's it! Your permanent jewelry is now part of you. Wear it in 
              the shower, pool, everywhere — it's built to last.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="section cta-section">
      <div class="container">
        <div class="cta-content">
          <h2>Ready to Get Linked?</h2>
          <p>Book an event or visit us at one of our upcoming pop-ups</p>
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

/* Story Section */
.story-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
}

.story-image img {
  width: 100%;
  height: 500px;
  object-fit: cover;
}

.story-text h2 {
  font-size: 2rem;
  font-weight: 300;
  letter-spacing: 0.1em;
  margin-bottom: 2rem;
}

.story-text p {
  color: rgba(255, 255, 255, 0.7);
  margin-bottom: 1.5rem;
  font-size: 1.05rem;
  line-height: 1.8;
}

/* Values Section */
.values-section {
  background: #0a0a0a;
}

.values-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
}

.value-card {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.1);
  padding: 3rem 2rem;
  text-align: center;
}

.value-icon {
  width: 70px;
  height: 70px;
  margin: 0 auto 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(192, 192, 192, 0.1);
  border-radius: 50%;
}

.value-icon i {
  font-size: 1.75rem;
  color: #c0c0c0;
}

.value-card h3 {
  font-size: 1.25rem;
  font-weight: 500;
  margin-bottom: 1rem;
  letter-spacing: 0.05em;
}

.value-card p {
  color: rgba(255, 255, 255, 0.6);
  line-height: 1.7;
}

/* Team Section */
.team-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 3rem;
}

.team-member {
  text-align: center;
}

.member-image {
  width: 200px;
  height: 200px;
  margin: 0 auto 1.5rem;
  border-radius: 50%;
  overflow: hidden;
  border: 3px solid rgba(192, 192, 192, 0.3);
}

.member-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.team-member h3 {
  font-size: 1.25rem;
  font-weight: 500;
  margin-bottom: 0.5rem;
}

.member-role {
  display: block;
  font-size: 0.875rem;
  color: #c0c0c0;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  margin-bottom: 1rem;
}

.team-member p {
  color: rgba(255, 255, 255, 0.6);
  font-size: 0.9rem;
  line-height: 1.7;
  max-width: 280px;
  margin: 0 auto;
}

/* Process Section */
.process-section {
  background: #0a0a0a;
}

.process-steps {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2rem;
  margin-top: 3rem;
}

.process-step {
  position: relative;
  padding: 2rem;
  text-align: center;
}

.step-number {
  font-size: 3rem;
  font-weight: 200;
  color: rgba(192, 192, 192, 0.3);
  margin-bottom: 1rem;
}

.process-step h3 {
  font-size: 1.125rem;
  font-weight: 500;
  margin-bottom: 1rem;
  letter-spacing: 0.05em;
}

.process-step p {
  color: rgba(255, 255, 255, 0.6);
  font-size: 0.9rem;
  line-height: 1.7;
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
  .process-steps {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .page-title {
    font-size: 2rem;
  }

  .story-content {
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  .story-image img {
    height: 300px;
  }

  .values-grid,
  .team-grid {
    grid-template-columns: 1fr;
  }

  .process-steps {
    grid-template-columns: 1fr;
  }

  .cta-content h2 {
    font-size: 1.75rem;
  }
}
</style>
