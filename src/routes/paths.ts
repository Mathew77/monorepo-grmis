// ----------------------------------------------------------------------

const ROOTS = {
  HOME: '/',
  AUTH: '/auth',
  DASHBOARD: '/dashboard/',
  PREAWARD: '/pre-award',
  ADMIN: '/admin/',
  PROFILE: '/profile/',
  APPLICATION: '/applications',
  FUNDOPPORTUNITIES: '/fund'
};

// ----------------------------------------------------------------------

export const paths = {
  faqs: '/faqs',
  minimalStore: 'https://mui.com/store/items/minimal-dashboard/',
  // AUTH
  auth: {
    amplify: {
      signIn: `${ROOTS.AUTH}/amplify/sign-in`,
      verify: `${ROOTS.AUTH}/amplify/verify`,
      signUp: `${ROOTS.AUTH}/amplify/sign-up`,
      updatePassword: `${ROOTS.AUTH}/amplify/update-password`,
      resetPassword: `${ROOTS.AUTH}/amplify/reset-password`,
    },
    jwt: {
      signIn: `${ROOTS.AUTH}/jwt/sign-in`,
      signUp: `${ROOTS.AUTH}/jwt/sign-up`,
    },
    firebase: {
      signIn: `${ROOTS.AUTH}/firebase/sign-in`,
      verify: `${ROOTS.AUTH}/firebase/verify`,
      signUp: `${ROOTS.AUTH}/firebase/sign-up`,
      resetPassword: `${ROOTS.AUTH}/firebase/reset-password`,
    },
    auth0: {
      signIn: `${ROOTS.AUTH}/auth0/sign-in`,
    },
    supabase: {
      signIn: `${ROOTS.AUTH}/supabase/sign-in`,
      verify: `${ROOTS.AUTH}/supabase/verify`,
      signUp: `${ROOTS.AUTH}/supabase/sign-up`,
      updatePassword: `${ROOTS.AUTH}/supabase/update-password`,
      resetPassword: `${ROOTS.AUTH}/supabase/reset-password`,
    },
  },
  home: {
    root: `${ROOTS.HOME}home`,
  },
  // Fund Opportunities Links
  fund: {
    root: `${ROOTS.FUNDOPPORTUNITIES}/fund-opportunities`,
    detail: `${ROOTS.FUNDOPPORTUNITIES}/fund-opportunities/detail`,
  },
  //My Applications
  applications: {
    root: `${ROOTS.APPLICATION}/my-applications`,
  },

  // // Fund Management Links
  // profile: {
  //   root: `${ROOTS.PROFILE}`,
  // },
  // Fund Management Links
};
