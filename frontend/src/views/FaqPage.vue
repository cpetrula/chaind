<template>
  <div class="faq-page">
    <!-- Hero -->
    <section class="page-hero">
      <div class="container">
        <h1 class="page-title">FAQ</h1>
        <p class="page-subtitle">Everything you need to know about permanent jewelry</p>
      </div>
    </section>

    <!-- FAQ Section -->
    <section class="section faq-section">
      <div class="container">
        <div class="faq-container">
          <Accordion multiple>
            <AccordionPanel 
              v-for="(faq, index) in faqs" 
              :key="index"
              :value="index.toString()"
            >
              <AccordionHeader>{{ faq.question }}</AccordionHeader>
              <AccordionContent>
                <p v-html="faq.answer"></p>
              </AccordionContent>
            </AccordionPanel>
          </Accordion>
        </div>
      </div>
    </section>

    <!-- Still Have Questions -->
    <section class="section contact-section">
      <div class="container">
        <div class="contact-content">
          <h2>Still Have Questions?</h2>
          <p>We're here to help! Reach out and we'll get back to you as soon as possible.</p>
          <div class="contact-options">
            <router-link to="/contact" class="btn btn-primary">
              Contact Us
            </router-link>
            <a href="mailto:hello@chaind.com" class="btn btn-secondary">
              <i class="pi pi-envelope"></i>
              Email Us
            </a>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
const faqs = [
  {
    question: "What is permanent jewelry?",
    answer: `Permanent jewelry is a seamless, clasp-free piece of jewelry that's custom-fitted to your wrist, ankle, or neck and welded closed while you wear it. Using a quick, painless micro-weld, we create a secure bond that's meant to last forever — or until you choose to remove it.`
  },
  {
    question: "Does it hurt?",
    answer: `Not at all! The welding process is completely painless. You might feel a tiny spark of warmth, but it's so quick (less than a second) that most people don't feel anything. The weld is made on the chain itself, not your skin, so there's no risk of burns.`
  },
  {
    question: "Can I remove permanent jewelry?",
    answer: `While it's designed to be permanent, you can absolutely remove it if needed. Simply use scissors or wire cutters to carefully cut the chain. If you want to wear it again, bring it back to us and we can re-weld it for a small fee!`
  },
  {
    question: "Is it waterproof?",
    answer: `Yes! Our 14k gold-filled and sterling silver chains are designed to withstand daily wear, including showers, swimming, and even the ocean. We do recommend removing any chains with delicate charms before extended water exposure.`
  },
  {
    question: "What materials do you use?",
    answer: `We use high-quality 14k gold-filled and sterling silver chains. Gold-filled jewelry has a thick layer of real gold bonded to a base metal, making it much more durable and tarnish-resistant than gold-plated alternatives. Sterling silver is .925 pure silver and will patina naturally over time.`
  },
  {
    question: "Will it set off metal detectors?",
    answer: `In most cases, no. Our chains are thin enough that they rarely trigger standard security scanners. However, if you travel frequently or work in high-security environments, you may want to consider placement that's easy to show to security if needed.`
  },
  {
    question: "What if I'm allergic to certain metals?",
    answer: `Our 14k gold-filled chains are hypoallergenic and safe for most people with metal sensitivities. If you have a known nickel allergy, we recommend the gold-filled option over sterling silver. Let us know about any allergies beforehand and we'll help you choose the best option.`
  },
  {
    question: "How long does the process take?",
    answer: `The entire process takes about 5-10 minutes per person. This includes selecting your chain, fitting it to your desired length, and the welding process itself (which takes less than a second!).`
  },
  {
    question: "Can I get multiple pieces at once?",
    answer: `Absolutely! Many people get matching bracelets and anklets, or coordinate pieces with friends or family. We offer bundle discounts for multiple pieces purchased at the same time.`
  },
  {
    question: "What's your minimum for private events?",
    answer: `For private events (at your home or venue), we typically require a minimum of 6 guests. This ensures the event is worthwhile for everyone involved. Corporate events may have different minimums — <a href='/contact'>contact us</a> for details.`
  },
  {
    question: "Do you offer gift cards?",
    answer: `Yes! Gift cards are perfect for birthdays, holidays, or any occasion. You can purchase them in any denomination and they can be redeemed at any of our events or pop-ups.`
  },
  {
    question: "What areas do you serve?",
    answer: `We're based in Los Angeles and primarily serve the greater LA area, including Orange County, Ventura County, and the Inland Empire. For events outside this area, please <a href='/contact'>contact us</a> to discuss travel arrangements.`
  },
  {
    question: "Can I add charms or pendants?",
    answer: `Yes! We offer a selection of small charms that can be added to your chain before welding. These include initials, birthstones, hearts, stars, and more. Charms range from $10-$35 depending on the design.`
  },
  {
    question: "Is there a warranty?",
    answer: `We stand behind our work. If your chain breaks within 30 days due to a welding defect (not normal wear or accidental damage), we'll re-weld it for free. After 30 days, re-welds are available for a small service fee.`
  }
]
</script>

<style scoped>
/* Page Hero */
.page-hero {
  padding: 6rem 0 4rem;
  background: linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.9)),
    url('https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=1920') center/cover;
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

/* FAQ Section */
.faq-section {
  background: #0a0a0a;
}

.faq-container {
  max-width: 900px;
  margin: 0 auto;
}

/* PrimeVue Accordion Overrides */
:deep(.p-accordion) {
  border: none;
}

:deep(.p-accordionpanel) {
  border: 1px solid rgba(255, 255, 255, 0.1);
  margin-bottom: 0.5rem;
  background: rgba(255, 255, 255, 0.02);
}

:deep(.p-accordionheader) {
  background: transparent;
  border: none;
  padding: 1.5rem;
  color: #fff;
  font-size: 1.1rem;
  font-weight: 400;
  cursor: pointer;
  transition: all 0.3s ease;
}

:deep(.p-accordionheader:hover) {
  background: rgba(255, 255, 255, 0.03);
}

:deep(.p-accordionheader-toggle-icon) {
  color: #c0c0c0;
}

:deep(.p-accordioncontent-content) {
  background: transparent;
  border: none;
  padding: 0 1.5rem 1.5rem;
  color: rgba(255, 255, 255, 0.7);
  line-height: 1.8;
  font-size: 1rem;
}

:deep(.p-accordioncontent-content a) {
  color: #c0c0c0;
  text-decoration: underline;
}

/* Contact Section */
.contact-section {
  text-align: center;
}

.contact-content h2 {
  font-size: 2rem;
  font-weight: 300;
  letter-spacing: 0.1em;
  margin-bottom: 1rem;
}

.contact-content > p {
  font-size: 1.125rem;
  color: rgba(255, 255, 255, 0.7);
  margin-bottom: 2rem;
}

.contact-options {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
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

.btn-secondary {
  background: transparent;
  color: #fff;
  border: 1px solid rgba(255, 255, 255, 0.5);
}

.btn-secondary:hover {
  background: rgba(255, 255, 255, 0.1);
  border-color: #fff;
}

/* Responsive */
@media (max-width: 768px) {
  .page-title {
    font-size: 2rem;
  }

  :deep(.p-accordionheader) {
    font-size: 1rem;
    padding: 1.25rem;
  }

  :deep(.p-accordioncontent-content) {
    padding: 0 1.25rem 1.25rem;
    font-size: 0.9rem;
  }
}
</style>
