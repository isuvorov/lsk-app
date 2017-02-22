import Note from '../../api/Note';
import NotePage from './NotePage';
export default {
  path: '*',
  async action({ path, next }) {
    const notePath = path.substr(6);
    const note = await Note.get(notePath);
    return {
      component: <NotePage note={note} />,
    };
  },
};
