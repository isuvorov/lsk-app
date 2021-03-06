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
        console.log({ctx});
        const props = {
          title: 'Панель управления',
          description: 'Управление приложением',
          siteTitle: ctx.config.siteTitle,
          children: <div>
            {/* {Task.getTasks().map(task => (
              <div>
                {JSON.stringify(task)}
                <button>
                  some
                </button>
              </div>
            ))} */}
          </div>,
        };
        return {
          title: props.title,
          component: <AdminLayout {...props} />,
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
