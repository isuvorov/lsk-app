import { createElement as create } from 'react';
import AdminLayout from './AdminLayout';

import Dashboard from './Dashboard';
import Profile from './Profile';
import Users from './Users';

function provide(props) {
  return create(AdminLayout, props);
}

export default {
  children: [
    {
      path: '/',
      async action({ ctx }) {
        const props = {
          title: 'Панель управления',
          description: 'Управление приложением',
          siteTitle: ctx.config.siteTitle,
          children: create(Dashboard),
        };
        return {
          title: props.title,
          component: provide(props),
        };
      },
    },
    {
      path: '/profile',
      async action({ ctx }) {
        const props = {
          title: 'Профиль',
          siteTitle: ctx.config.siteTitle,
          children: create(Profile),
        };
        return {
          title: props.title,
          component: provide(props),
        };
      },
    },
    {
      path: '/users',
      async action({ ctx }) {
        const props = {
          title: 'Список пользователей',
          siteTitle: ctx.config.siteTitle,
          children: create(Users),
        };
        return {
          title: props.title,
          component: provide(props),
        };
      },
    },
  ],
};
