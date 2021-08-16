import s from './Preloader.module.css';
import PreloaderSVG from './Preloader2.svg';

const Preloader: React.FC = () => {
  // return <img src={PreloaderGif} alt="Загрузка..." />;
  return (
    <div className={s.preloaderContainer}>
      <img src={PreloaderSVG} alt="Загрузка..." className={s.preloader} />
    </div>
  );
};
export default Preloader;
