import { Play, Pause } from '../icons/PlayerIcons';
import { usePlayerStore } from '../store/playerStore';
import { getPlayListInfoById } from '../services/ApiService';

const isNewSongOfAnotherPlaylist = (currentMusic, song) => {
  return currentMusic.playlist?.id != song.albumId;
};

const setNewCurrentMusic = (song, setIsPlaying, setCurrentMusic) => {
  getPlayListInfoById(song.albumId)
    .then(data => {
      const { songs, playlist } = data;
      setCurrentMusic({ songs: songs, playlist: playlist, song: song });
    })
    .then(() => {
      setIsPlaying(true);
    });
};

export const MusicsTablePlay = ({ song }) => {
  const { currentMusic, isPlaying, setIsPlaying, setCurrentMusic } = usePlayerStore(state => state);

  const isCurrentSongRunning = song => {
    return currentMusic.song?.id == song.id && currentMusic.playlist?.albumId == song.albumId && isPlaying;
  };

  const handleClick = song => {
    if (isCurrentSongRunning(song)) {
      setIsPlaying(false);
      return;
    }

    if (isNewSongOfAnotherPlaylist(currentMusic, song)) {
      setNewCurrentMusic(song, setIsPlaying, setCurrentMusic);
      return;
    }

    // the playlist is the same, but the song is different
    if (currentMusic.song?.id !== song.id) {
      setCurrentMusic({ songs: currentMusic.songs, playlist: currentMusic.playlist, song: song });
    }
    setIsPlaying(true);
  };

  const className = 'hover:scale-125 fill-current ';
  return (
    <button
      aria-label="Play / Pause"
      className="text-white"
      onClick={() => handleClick(song)}>
      {isCurrentSongRunning(song) ? <Pause className={className} size={12} /> : <Play className={className} size={12} />}
    </button>
  );
};
