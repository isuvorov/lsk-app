import HomePage from './HomePage'
import ErrorPage from './ErrorPage'
import Layout from '../components/Layout'

import Cabinet from '../components/Cabinet'
import Slide from '../components/Slide'
import Card from '../components/Card'

import SignupPage from './Auth/SignupPage'
import LoginPage from './Auth/LoginPage'
import RecoveryPage from './Auth/RecoveryPage'
// import ProfilePage from './ProfilePage'
// import ProfileEditPage from './ProfileEditPage'
// import HometasksPage from './HometasksPage'
import ConstructionPage from './ConstructionPage'
import ProfilePage from './ProfilePage'


import OnStore from './OnStore'
function onStore(check) {
  return {
    component: <OnStore check={check} />,
  }
}

export default {
  path: '/',
  children: [
    {
      path: '/',
      action() {
        return onStore((props, context) => {
          const user = props.user
          const history = context.history
          if (user.isAuth) {
            history.push('/cabinet')
          } else {
            history.push('/auth/login')
          }
        })
      },
    },
    {
      path: '/auth/login',
      action() {
        return {
          title: 'Вход',
          component: <Slide bg='http://skill-branch.ru/img/android-bg.png123'>
            <LoginPage />
          </Slide>,
        }
      },
    },
    {
      path: '/auth/recovery',
      action() {
        return {
          title: 'Восстановление пароля',
          component: <Slide bg='http://skill-branch.ru/img/android-bg.png123'>
            <RecoveryPage />
          </Slide>,
        }
      },
    },
    {
      path: '/auth/signup',
      action() {
        return {
          title: 'Регистрация',
          component: <Slide bg='http://skill-branch.ru/img/android-bg.png123'>
            <SignupPage />
          </Slide>,
        }
      },
    },
    {
      path: '/auth/logout',
      action() {
        return onStore((props, context) => {
          const user = props.user
          const history = context.history
          user.logout()
          history.push('/')
        })
      },
    },
    {
      path: '/auth/twitter',
      action() {
        return onStore((props, context) => {
          const user = props.user
          const history = context.history
          user.authSocial('twitter')
          history.push('/')
        })
      },
    },
    {
      path: '/cabinet',
      action() {
        return onStore((props, context) => {
          const history = context.history
          const user = props.user
          if (user.isAuth) {
            history.push('/cabinet/profile')
          } else {
            history.push('/auth/login')
          }
        })
      },
    },
    {
        path: '/cabinet/profile',
        action() {
          const title = 'Профиль'
          return {
            title,
            component: (
              <Cabinet title={title}>
                <ProfilePage />
              </Cabinet>
            ),
          }
        },
      },
    {
      path: '/cabinet/reviews',
      action() {
        const title = 'Публикации'
        return {
          title,
          component: (
            <Cabinet title={title}>
              <ConstructionPage />
            </Cabinet>
          ),
        }
      },
    },
    {
      path: '*',
      action({ error }) {
        return {
          title: 'ErrorPage',
          component: <ErrorPage />,
          // component: <ErrorPage error={error} />,
        }
      },
    },
  ],

  async action({ next }) {
    let route;
    try {
      route = await next();
    } catch(err) {
    }

    const siteTitle = 'The Site Title'
    // Provide default values for title, description etc.
    route.title = `${route.title || 'Untitled Page'} - ${siteTitle}`;
    route.description = route.description || siteTitle;
    route.component = <Layout>
      {route.component}
    </Layout>

    return route;
  },

  // async action({ next, context }) {
  //   const component = await next();
  //   if (component === undefined) return component;
  //   return render(
  //     <App context={context}>
  //       {component}
  //     </App>
  //   );
  // },
};
