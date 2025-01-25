tailwind.config = {
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#f8f8f8",
          100: "#e8e8e8",
          200: "#d3d3d3",
          300: "#a3a3a3",
          400: "#737373",
          500: "#525252",
          600: "#404040",
          700: "#262626",
          800: "#171717",
          900: "#0a0a0a",
          950: "#030303",
        },
        secondary: {
          50: "#f8f8f8",
          100: "#e8e8e8",
          200: "#d3d3d3",
          300: "#a3a3a3",
          400: "#737373",
          500: "#525252",
          600: "#404040",
          700: "#262626",
          800: "#171717",
          900: "#0a0a0a",
          950: "#030303",
        },
        accent: {
          50: "#f8f8f8",
          100: "#e8e8e8",
          200: "#d3d3d3",
          300: "#a3a3a3",
          400: "#737373",
          500: "#525252",
          600: "#404040",
          700: "#262626",
          800: "#171717",
          900: "#0a0a0a",
          950: "#030303",
        },
      },
      fontFamily: {
        sans: [
          "Inter",
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "Helvetica Neue",
          "Arial",
          "sans-serif",
        ],
        heading: ["Montserrat", "Inter", "system-ui", "sans-serif"],
      },
      spacing: {
        18: "4.5rem",
        22: "5.5rem",
        30: "7.5rem",
      },
      maxWidth: {
        "8xl": "88rem",
        "9xl": "96rem",
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-in",
        "fade-out": "fadeOut 0.5s ease-out",
        "slide-up": "slideUp 0.5s ease-out",
        "slide-down": "slideDown 0.5s ease-out",
        "slide-left": "slideLeft 0.5s ease-out",
        "slide-right": "slideRight 0.5s ease-out",
        "scale-in": "scaleIn 0.5s ease-out",
        "scale-out": "scaleOut 0.5s ease-out",
        "spin-slow": "spin 3s linear infinite",
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "bounce-slow": "bounce 3s infinite",
        float: "float 3s ease-in-out infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        fadeOut: {
          "0%": { opacity: "1" },
          "100%": { opacity: "0" },
        },
        slideUp: {
          "0%": { transform: "translateY(20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        slideDown: {
          "0%": { transform: "translateY(-20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        slideLeft: {
          "0%": { transform: "translateX(20px)", opacity: "0" },
          "100%": { transform: "translateX(0)", opacity: "1" },
        },
        slideRight: {
          "0%": { transform: "translateX(-20px)", opacity: "0" },
          "100%": { transform: "translateX(0)", opacity: "1" },
        },
        scaleIn: {
          "0%": { transform: "scale(0.9)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        scaleOut: {
          "0%": { transform: "scale(1.1)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
      aspectRatio: {
        portrait: "3/4",
        landscape: "4/3",
        ultrawide: "21/9",
      },
    },
  },
  variants: {
    extend: {
      opacity: ["disabled"],
      cursor: ["disabled"],
      backgroundColor: ["active", "disabled"],
      textColor: ["active", "disabled"],
    },
  },
};

document.addEventListener("DOMContentLoaded", () => {
  const imageObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target;
          if (img.dataset.src) {
            const tempImage = new Image();
            tempImage.onload = () => {
              img.src = img.dataset.src;
              img.classList.remove("opacity-0");
              img.classList.add("opacity-100");
            };
            tempImage.src = img.dataset.src;
            img.removeAttribute("data-src");
            observer.unobserve(img);
          }
        }
      });
    },
    {
      rootMargin: "50px 0px",
      threshold: 0.01,
    }
  );

  const loadImage = (img) => {
    if ("loading" in HTMLImageElement.prototype) {
      img.loading = "lazy";
    }

    img.classList.add("transition-opacity", "duration-300", "opacity-0");

    img.onerror = () => {
      const width = img.getAttribute("width") || img.clientWidth || 300;
      const height = img.getAttribute("height") || img.clientHeight || 200;
      img.src = `https://placehold.co/${width}x${height}/DEDEDE/555555?text=Image+Unavailable`;
      img.alt = "Image unavailable";
      img.classList.remove("opacity-0");
      img.classList.add("opacity-100", "error-image");
    };

    if (img.dataset.src) {
      imageObserver.observe(img);
    } else {
      img.classList.remove("opacity-0");
      img.classList.add("opacity-100");
    }
  };

  document
    .querySelectorAll("img[data-src], img:not([data-src])")
    .forEach(loadImage);

  // Watch for dynamically added images
  new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      mutation.addedNodes.forEach((node) => {
        if (node.nodeType === 1) {
          if (node.tagName === "IMG") {
            loadImage(node);
          }
          node.querySelectorAll("img").forEach(loadImage);
        }
      });
    });
  }).observe(document.body, {
    childList: true,
    subtree: true,
  });
});

// Performance monitoring
if ("performance" in window && "PerformanceObserver" in window) {
  // Create performance observer
  const observer = new PerformanceObserver((list) => {
    const entries = list.getEntries();
    entries.forEach((entry) => {
      if (entry.entryType === "largest-contentful-paint") {
        // console.log(`LCP: ${entry.startTime}ms`);
      }
      if (entry.entryType === "first-input") {
        // console.log(`FID: ${entry.processingStart - entry.startTime}ms`);
      }
      if (entry.entryType === "layout-shift") {
        // console.log(`CLS: ${entry.value}`);
      }
    });
  });

  // Observe performance metrics
  observer.observe({
    entryTypes: ["largest-contentful-paint", "first-input", "layout-shift"],
  });

  // Log basic performance metrics
  window.addEventListener("load", () => {
    const timing = performance.getEntriesByType("navigation")[0];
    console.log({
      "DNS Lookup": timing.domainLookupEnd - timing.domainLookupStart,
      "TCP Connection": timing.connectEnd - timing.connectStart,
      "DOM Content Loaded":
        timing.domContentLoadedEventEnd - timing.navigationStart,
      "Page Load": timing.loadEventEnd - timing.navigationStart,
    });
  });
}

// Handle offline/online status
window.addEventListener("online", () => {
  document.body.classList.remove("offline");
  console.log("Connection restored");
});

window.addEventListener("offline", () => {
  document.body.classList.add("offline");
  console.log("Connection lost");
});

document.addEventListener("DOMContentLoaded", function () {
  // Contact Form Handler
  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", async function (e) {
      e.preventDefault();
      const submitButton = contactForm.querySelector('button[type="submit"]');
      submitButton.disabled = true;
      submitButton.innerHTML = "Sending...";

      // Create form data object
      const formData = new FormData(contactForm);
      const data = {};
      formData.forEach((value, key) => (data[key] = value));

      try {
        const response = await fetch("https://formspree.io/f/movvnyan", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });

        if (response.ok) {
          contactForm.reset();
          alert("Thank you for your message. We will get back to you soon!");
        } else {
          const errorData = await response.json();
          throw new Error(errorData.error || "Form submission failed");
        }
      } catch (error) {
        console.error("Form submission error:", error);
        alert(
          "Sorry, there was a problem submitting your form. Please try again later."
        );
      } finally {
        submitButton.disabled = false;
        submitButton.innerHTML = "Send Message";
      }
    });
  }

  // Admission Form Handler
  const admissionForm = document.getElementById("admissionForm");
  if (admissionForm) {
    admissionForm.addEventListener("submit", async function (e) {
      e.preventDefault();
      const submitButton = admissionForm.querySelector('button[type="submit"]');
      submitButton.disabled = true;
      submitButton.innerHTML = "Submitting...";

      try {
        const response = await fetch("https://formspree.io/f/xeoolvoz", {
          method: "POST",
          body: new FormData(admissionForm),
          headers: {
            Accept: "application/json",
          },
        });

        if (response.ok) {
          admissionForm.reset();
          alert(
            "Thank you for your application. Our admissions team will contact you shortly!"
          );
        } else {
          throw new Error("Form submission failed");
        }
      } catch (error) {
        alert(
          "Sorry, there was a problem submitting your application. Please try again later."
        );
      } finally {
        submitButton.disabled = false;
        submitButton.innerHTML = "Submit Application";
      }
    });
  }

  // Newsletter Subscription Handler
  const newsletterForm = document.getElementById("newsletterForm");
  if (newsletterForm) {
    newsletterForm.addEventListener("submit", async function (e) {
      e.preventDefault();
      const submitButton = newsletterForm.querySelector(
        'button[type="submit"]'
      );
      submitButton.disabled = true;
      submitButton.innerHTML = "Subscribing...";

      try {
        const response = await fetch("https://formspree.io/f/movvnyvn", {
          method: "POST",
          body: new FormData(newsletterForm),
          headers: {
            Accept: "application/json",
          },
        });

        if (response.ok) {
          newsletterForm.reset();
          alert("Thank you for subscribing to our newsletter!");
        } else {
          throw new Error("Subscription failed");
        }
      } catch (error) {
        alert(
          "Sorry, there was a problem with your subscription. Please try again later."
        );
      } finally {
        submitButton.disabled = false;
        submitButton.innerHTML = "Subscribe";
      }
    });
  }
});

// Performance monitoring
window.addEventListener('load', () => {
  // Navigation Timing API
  const timing = window.performance.timing;
  const pageLoadTime = timing.loadEventEnd - timing.navigationStart;
  console.log(`Page load time: ${pageLoadTime}ms`);

  // Report to analytics if needed
  if (pageLoadTime > 3000) {
    // Report slow page load
    console.warn('Slow page load detected');
  }
});

// Lazy loading images
document.addEventListener('DOMContentLoaded', () => {
  const images = document.querySelectorAll('img[data-src]');
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.removeAttribute('data-src');
        observer.unobserve(img);
      }
    });
  });

  images.forEach(img => imageObserver.observe(img));
});
