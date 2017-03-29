import React, { Component } from 'react';
import AuthPage from './AuthPage';
import AuthLayout from '../MainLayout';

export default {
  action({ next, page }) {
    return page
       .pushTitle('Auth')
       .layout(AuthLayout)
       .next(next);
  },
  children: [
    {
      path: '/(login|)',
      action({ page }) {
        return page
          .pushTitle('Login')
          .component(AuthPage, { type: 'login' });
      },
    },
    {
      path: '/recovery',
      action({ page }) {
        return page
          .pushTitle('Recovery password')
          .component(AuthPage, { type: 'recovery' });
      },
    },
    {
      path: '/signup',
      action({ page }) {
        return page
          .pushTitle('Signup')
          .component(AuthPage, { type: 'signup' });
      },
    },
    {
      path: '/logout',
      action({ appStore, page }) {
        if (__SERVER__) {
          return page
            .pushTitle('Logout')
            .component(<div>Loading</div>);
        }
        appStore.auth.logout();
        return page.redirect('/');
      },
    },
  ],
};
