/**
 * Juniper Mesa Air - Interactive Script
 * Modern, Lightweight Vanilla JS Logic
 */

document.addEventListener('DOMContentLoaded', () => {
  // ==========================================================================
  // 1. Mobile Menu Toggle
  // ==========================================================================
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', !isExpanded);
      navLinks.classList.toggle('is-open');
    });

    // Close mobile menu on clicking any link
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navToggle.setAttribute('aria-expanded', 'false');
        navLinks.classList.remove('is-open');
      });
    });
  }

  // ==========================================================================
  // 2. FAQ Accordion Logic
  // ==========================================================================
  const faqTriggers = document.querySelectorAll('.faq-trigger');
  faqTriggers.forEach(trigger => {
    trigger.addEventListener('click', () => {
      const isExpanded = trigger.getAttribute('aria-expanded') === 'true';
      const targetId = trigger.getAttribute('aria-controls');
      const panel = document.getElementById(targetId);

      if (panel) {
        if (isExpanded) {
          trigger.setAttribute('aria-expanded', 'false');
          panel.hidden = true;
        } else {
          // Close other open panels for clean single-view accordion
          faqTriggers.forEach(otherTrigger => {
            if (otherTrigger !== trigger) {
              otherTrigger.setAttribute('aria-expanded', 'false');
              const otherId = otherTrigger.getAttribute('aria-controls');
              const otherPanel = document.getElementById(otherId);
              if (otherPanel) otherPanel.hidden = true;
            }
          });

          trigger.setAttribute('aria-expanded', 'true');
          panel.hidden = false;
        }
      }
    });
  });

  // ==========================================================================
  // 3. Service Mode Switcher (Repair vs Installation)
  // ==========================================================================
  const tabRepair = document.getElementById('tabRepair');
  const tabInstall = document.getElementById('tabInstall');
  const repairFields = document.getElementById('repairFields');
  const installFields = document.getElementById('installFields');
  const serviceTypeInput = document.getElementById('serviceType');

  function setServiceMode(mode) {
    if (mode === 'repair') {
      if (tabRepair) {
        tabRepair.setAttribute('aria-selected', 'true');
        tabRepair.classList.add('active');
      }
      if (tabInstall) {
        tabInstall.setAttribute('aria-selected', 'false');
        tabInstall.classList.remove('active');
      }
      if (repairFields) repairFields.style.display = 'block';
      if (installFields) installFields.style.display = 'none';
      if (serviceTypeInput) serviceTypeInput.value = 'repair';
    } else {
      if (tabRepair) {
        tabRepair.setAttribute('aria-selected', 'false');
        tabRepair.classList.remove('active');
      }
      if (tabInstall) {
        tabInstall.setAttribute('aria-selected', 'true');
        tabInstall.classList.add('active');
      }
      if (repairFields) repairFields.style.display = 'none';
      if (installFields) installFields.style.display = 'block';
      if (serviceTypeInput) serviceTypeInput.value = 'installation';
    }
  }

  if (tabRepair && tabInstall) {
    tabRepair.addEventListener('click', () => setServiceMode('repair'));
    tabInstall.addEventListener('click', () => setServiceMode('installation'));
  }

  // Handle external trigger buttons for mode (hero, pathways, sticky bar)
  document.querySelectorAll('[data-switch-service]').forEach(btn => {
    btn.addEventListener('click', () => {
      const targetMode = btn.getAttribute('data-switch-service');
      setServiceMode(targetMode);
    });
  });

  // ==========================================================================
  // 4. Interactive Symptom Troubleshooter
  // ==========================================================================
  const symptomAdviceData = {
    'Blowing warm or lukewarm air while the fan is running': "Daniel's field tip: Check if your outside condenser fan is spinning. If it isn't, you likely have a failed dual-run capacitor—a fast, straightforward repair we stock on the truck.",
    'Loud humming, clicking, or rattling noise from outdoor condenser': "Daniel's field tip: If you hear a loud continuous hum without the fan turning, shut the system off at the thermostat immediately to avoid burning out the compressor motor.",
    'Frozen copper lines or ice buildup visible on the indoor evaporator coil': "Daniel's field tip: Turn your thermostat from COOL to OFF, and set FAN to ON to melt the ice before we arrive. Ice usually indicates a dirty filter, restricted airflow, or low refrigerant.",
    'Water leaking from indoor air handler or overflowing condensation drain pan': "Daniel's field tip: Monsoon humidity creates heavy condensation that clogs algae-filled drain traps. Turn the system off to prevent water damage to your ceiling or drywall.",
    'AC constantly trips the electrical breaker or outdoor unit won\'t turn on': "Daniel's field tip: Do not repeatedly reset a tripping HVAC breaker—it is protecting your home's wiring. A grounded compressor or shorted contactor needs multimeter diagnosis.",
    'Unit runs non-stop without reaching thermostat target temperature': "Daniel's field tip: If your AC runs 12+ hours straight and can't get below 82°, you likely have leaky ductwork, dirty coils, or a system past its 12-15 year desert lifespan."
  };

  const symptomChips = document.querySelectorAll('.symptom-chip');
  const symptomAdviceText = document.getElementById('symptomAdviceText');
  const detailsTextarea = document.getElementById('projectDetails');
  const symptomJumpBtn = document.getElementById('symptomJumpBtn');

  symptomChips.forEach(chip => {
    chip.addEventListener('click', () => {
      const symptomDesc = chip.getAttribute('data-symptom');
      const isAlreadyActive = chip.classList.contains('is-active');

      symptomChips.forEach(c => c.classList.remove('is-active'));

      if (!isAlreadyActive && symptomDesc) {
        chip.classList.add('is-active');
        if (symptomAdviceText && symptomAdviceData[symptomDesc]) {
          symptomAdviceText.textContent = symptomAdviceData[symptomDesc];
        }
        if (detailsTextarea) {
          detailsTextarea.value = `Symptom reported: ${symptomDesc}. `;
        }
        setServiceMode('repair');
      } else {
        if (symptomAdviceText) {
          symptomAdviceText.textContent = "Select any symptom above, or tap the button to jump straight to our diagnostic booking form.";
        }
      }
    });
  });

  if (symptomJumpBtn) {
    symptomJumpBtn.addEventListener('click', () => {
      setServiceMode('repair');
    });
  }

  // ==========================================================================
  // 5. Contact Preference Email Toggle
  // ==========================================================================
  const contactPref = document.getElementById('preferredContact');
  const emailInput = document.getElementById('emailAddress');
  const emailGroup = document.getElementById('emailGroup');

  if (contactPref && emailInput) {
    contactPref.addEventListener('change', () => {
      if (contactPref.value === 'email') {
        emailInput.required = true;
        const reqStar = emailGroup ? emailGroup.querySelector('.required') : null;
        if (reqStar) reqStar.style.display = 'inline';
      } else {
        emailInput.required = false;
        const reqStar = emailGroup ? emailGroup.querySelector('.required') : null;
        if (reqStar) reqStar.style.display = 'none';
      }
    });
  }

  // ==========================================================================
  // 6. Form Validation & Submission Handling
  // ==========================================================================
  const leadForm = document.getElementById('estimateForm');
  const formFeedback = document.getElementById('formFeedback');

  if (leadForm) {
    leadForm.addEventListener('submit', (e) => {
      e.preventDefault();

      // Reset prior errors
      leadForm.querySelectorAll('.form-group').forEach(grp => grp.classList.remove('has-error'));
      if (formFeedback) {
        formFeedback.className = 'form-feedback';
        formFeedback.style.display = 'none';
        formFeedback.textContent = '';
      }

      let isValid = true;
      let firstErrorField = null;

      function flagError(inputId, message) {
        isValid = false;
        const inputElem = document.getElementById(inputId);
        if (inputElem) {
          const group = inputElem.closest('.form-group');
          if (group) {
            group.classList.add('has-error');
            const errSpan = group.querySelector('.form-error-msg');
            if (errSpan && message) {
              errSpan.textContent = message;
            }
          }
          if (!firstErrorField) firstErrorField = inputElem;
        }
      }

      // Validate Full Name
      const nameVal = document.getElementById('fullName')?.value.trim() || '';
      if (nameVal.length < 2) {
        flagError('fullName', 'Please enter your full name (at least 2 characters).');
      }

      // Validate Phone Number (10 digits check)
      const phoneVal = document.getElementById('phoneNumber')?.value.trim() || '';
      const cleanDigits = phoneVal.replace(/\D/g, '');
      if (cleanDigits.length < 10) {
        flagError('phoneNumber', 'Please enter a valid 10-digit phone number (e.g. 602-555-0147).');
      }

      // Validate City
      const cityVal = document.getElementById('serviceCity')?.value || '';
      const allowedCities = ['Phoenix', 'Tempe', 'Scottsdale'];
      if (!allowedCities.includes(cityVal)) {
        flagError('serviceCity', 'Please select a city within our service area.');
      }

      // Validate Email (if provided or required)
      const emailVal = emailInput?.value.trim() || '';
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (contactPref?.value === 'email' && !emailVal) {
        flagError('emailAddress', 'Email address is required when Email is chosen as contact method.');
      } else if (emailVal && !emailPattern.test(emailVal)) {
        flagError('emailAddress', 'Please enter a valid email address format.');
      }

      // Validate Message / Symptom details
      const detailsVal = document.getElementById('projectDetails')?.value.trim() || '';
      if (detailsVal.length < 10) {
        flagError('projectDetails', 'Please describe what is happening with at least 10 characters.');
      }

      if (!isValid) {
        if (formFeedback) {
          formFeedback.className = 'form-feedback error';
          formFeedback.textContent = 'Please check the highlighted fields and try again.';
          formFeedback.style.display = 'block';
        }
        if (firstErrorField) {
          firstErrorField.focus();
        }
        return;
      }

      // Successful client-side submission handling
      if (formFeedback) {
        formFeedback.className = 'form-feedback success';
        formFeedback.innerHTML = '<strong>Thank you!</strong> Your request has been received. Daniel will review your details and contact you shortly.';
        formFeedback.style.display = 'block';
        formFeedback.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }

      // Reset form
      leadForm.reset();
      symptomChips.forEach(c => c.classList.remove('is-active'));
      setServiceMode('repair');
    });
  }
});
