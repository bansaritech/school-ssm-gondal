const { createApp, ref, onMounted } = Vue;

const loadMessages = async () => {
  const en = await fetch('en.json').then(res => res.json());
  const hi = await fetch('hi.json').then(res => res.json());
  const gu = await fetch('gu.json').then(res => res.json());

  return {
      en,
      hi,
      gu
  };
};

loadMessages().then(messages => {
  const i18n = VueI18n.createI18n({
    locale: 'en', // set default locale
    messages
  });


  const app = Vue.createApp({
    setup() {
        const isDropdownOpen = ref(false);
        const currentSlide = ref(0);
        const slides = ref([
            { image: "unsplash.jpg", alt: "Activity 1" },
            { image: "unsplash2.jpg", alt: "Activity 2" },
            { image: "unsplash.jpg", alt: "Activity 3" },
            { image: "unsplash2.jpg", alt: "Activity 4" }
        ]);

        const toggleDropdown = () => {
            isDropdownOpen.value = !isDropdownOpen.value;
        };

        const selectLanguage = (language) => {
            console.log(`Selected language: ${language}`);
            isDropdownOpen.value = false; // Close dropdown after selection
        };

        const showNextSlide = () => {
            currentSlide.value = (currentSlide.value + 1) % slides.value.length;
        };

        const showPrevSlide = () => {
            currentSlide.value = (currentSlide.value - 1 + slides.value.length) % slides.value.length;
        };

        const goToSlide = (index) => {
            currentSlide.value = index;
        };

        onMounted(() => {
            // Automatically change slides every 3 seconds
            setInterval(showNextSlide, 3000);
        });

        return {
            isDropdownOpen,
            currentSlide,
            slides,
            toggleDropdown,
            selectLanguage,
            showNextSlide,
            showPrevSlide,
            goToSlide
        };
    },
    data() {
        return {
        };
    },
    methods: {
        changeLanguage(lang) {
            i18n.global.locale = lang;
        }
    }
  });

  app.use(i18n);
  app.mount("#app");

})
