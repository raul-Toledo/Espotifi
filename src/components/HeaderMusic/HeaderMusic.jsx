import Nightwish from './assets/nightwish.jpg';
import Once from './assets/once.jpg';
import './HeaderMusic.css';

const HeadMusic = () => {
  return (
    <div className='header-music'>
      <div><img className="album-cover" src={Once}/></div>
      <div className='album-info'>
        <p className='album-text'>Álbum</p>
        <p className='album-TextAlbum'>Once</p>
        <div className='album-song'>
          <img className="artist-image" src={Nightwish} /> 
          <p>Nightwish</p>
          <p>♪</p> 
          <p>2004</p>
          <p>♪</p> 
          <p>11 canciones, 1 hora</p>
        </div>
      </div>
    </div>
  )
}

export default HeadMusic;