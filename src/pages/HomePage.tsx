import Banner from '../banner/Banner';
import Card from '../card/Card';
import QuickLinks from '../quick-links/QuickLinks';

const HomePage = () => {
  return (
    <div>
      <div className='divider'></div>
      <Banner />
      <QuickLinks />
      <Card />
    </div>
  );
};

export default HomePage;
