import CategoryPage from '../CategoryPage';

export default {
  async action({ page }) {
    return page
    .isAuth()
    .component(CategoryPage, {
      title: 'Академия Продаж',
      subtitle: '1 ступень',
      image: 'http://race-robotics.com/wp-content/uploads/2016/10/yumi-abb-robot.jpg',
      categories: [{
        link: '/game/create?categoryId=lico1&platform=lico',
        image: 'http://media.istockphoto.com/photos/worker-at-hardware-store-picture-id505747518?k=6&m=505747518&s=170667a&w=0&h=XYesI0oWGFPQEprAombnOoVLjIvPapCT2hm7TQxW6fs=',
        title: 'Знание ассортимента',
      }],
    });
  },
};
