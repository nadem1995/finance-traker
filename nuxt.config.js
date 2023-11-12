export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['@nuxt/ui','@nuxtjs/supabase'],
  supabase:{
redirect:false,
  },
  app:{
    head:{
    title:'Finance Tracking',
    meta:[
      {name:'description' , content:'The fist meta tag to test'},
      {name:'description', content:'The second meta tag to test'}
    ],
    }
  },
  css:[
    '~/assets/css/style.css'
  ],
  
})