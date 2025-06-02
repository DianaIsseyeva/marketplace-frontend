import QuickLink from '../quick-link/QuickLink';
import { mockData } from './mock';
import s from './QuickLinks.module.scss';

const QuickLinks = () => {
  return (
    <div className={s.wrap}>
      {mockData.map(item => (
        <div key={item.id}>
          <QuickLink link={item.link} imgSrc={item.imgSrc} title={item.title} />
        </div>
      ))}
    </div>
  );
};

export default QuickLinks;
