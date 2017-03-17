 import AuthPage from './AuthPage';
 import React, {Component} from 'react'

 export default {
   children: [
     {
      //  path: '/login',
       path: '/(login|)',
       action() {
         return {
           title: 'Cabinet',
           component: <AuthPage type="login" />,
         };
       },
     },
     {
       path: '/recovery',
       action() {
         return {
           title: 'recovery',
           component: <AuthPage type="recovery" />,
         };
       },
     },
     {
       path: '/signup',
       action() {
         return {
           title: 'signup',
           component: <AuthPage type="signup" />,
         };
       },
     },
     {
       path: '/logout',
       action({ appStore }) {
         if (__SERVER__) return {
           component: <div>Loading</div>
         }
         appStore.auth.logout();
         //  console.log('appStore', appStore);
         return { redirect: '/' };
        //  return {
        //    title: 'signup',
        //    component: <AuthPage type="signup" />,
        //  };
       },
     },
    //  {
    //    path: '/profile',
    //    action() {
    //     //  return {
    //     //    title: 'signup',
    //     //    component: <AuthPage type="signup" />,
    //     //  };
    //    },
    //  },
   ],
 };
