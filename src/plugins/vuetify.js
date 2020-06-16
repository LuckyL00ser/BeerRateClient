import Vue from "vue";
import Vuetify from "vuetify/lib";
import pl from "vuetify/es5/locale/pl";
import '@fortawesome/fontawesome-free/css/all.css' // Ensure you are using css-loader

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: "#004d40",
        secondary: "#795548",
        accent: "#82B1FF",
        error: "#FF5252",
        info: "#2196F3",
        success: "#4CAF50",
        warning: "#FFC107"
      }
    }
  },
  lang: {
    locales: { pl },
    current: "pl"
  },
  icons: {
    iconfont: "fa"
  }
});
