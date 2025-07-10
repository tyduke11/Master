import React, { useState, useRef, useEffect } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { 
  Sidebar, 
  TopNavBar, 
  PlayerBar, 
  HomeContent, 
  SearchContent, 
  LibraryContent,
  PlaylistContent,
  ArtistContent,
  AlbumContent 
} from './components';

// Main App Component with Layout
function AppLayout() {
  const [currentTrack, setCurrentTrack] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [volume, setVolume] = useState(50);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [likedSongs, setLikedSongs] = useState(new Set());
  const [followedArtists, setFollowedArtists] = useState(new Set());
  const [userPlaylists, setUserPlaylists] = useState([]);
  const audioRef = useRef(null);
  const location = useLocation();

  // Initialize with default track
  useEffect(() => {
    if (!currentTrack) {
      setCurrentTrack({
        id: 1,
        title: "As It Was",
        artist: "Harry Styles",
        album: "Harry's House",
        duration: "2:47",
        image: "https://images.unsplash.com/photo-1595689226986-fc5081416d22?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Nzh8MHwxfHNlYXJjaHwyfHxhcnRpc3QlMjBwaG90b3xlbnwwfHx8fDE3NTIxNjEyMjJ8MA&ixlib=rb-4.1.0&q=85",
        audio: "https://www.soundjay.com/misc/sounds/bell-ringing-05.mp3"
      });
    }
  }, [currentTrack]);

  const playTrack = (track) => {
    setCurrentTrack(track);
    setIsPlaying(true);
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const toggleLike = (songId) => {
    const newLikedSongs = new Set(likedSongs);
    if (newLikedSongs.has(songId)) {
      newLikedSongs.delete(songId);
    } else {
      newLikedSongs.add(songId);
    }
    setLikedSongs(newLikedSongs);
  };

  const toggleFollow = (artistId) => {
    const newFollowedArtists = new Set(followedArtists);
    if (newFollowedArtists.has(artistId)) {
      newFollowedArtists.delete(artistId);
    } else {
      newFollowedArtists.add(artistId);
    }
    setFollowedArtists(newFollowedArtists);
  };

  const appState = {
    currentTrack,
    setCurrentTrack,
    isPlaying,
    setIsPlaying,
    searchQuery,
    setSearchQuery,
    volume,
    setVolume,
    currentTime,
    setCurrentTime,
    duration,
    setDuration,
    likedSongs,
    setLikedSongs,
    followedArtists,
    setFollowedArtists,
    userPlaylists,
    setUserPlaylists,
    audioRef,
    playTrack,
    togglePlayPause,
    toggleLike,
    toggleFollow
  };

  return (
    <div className="h-screen bg-black text-white flex flex-col">
      {/* Main Layout Container */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <Sidebar {...appState} />
        
        {/* Main Content Area */}
        <div className="flex-1 flex flex-col bg-gradient-to-b from-gray-900 to-black">
          {/* Top Navigation */}
          <TopNavBar {...appState} />
          
          {/* Content Area */}
          <div className="flex-1 overflow-y-auto px-6 pb-24">
            <Routes>
              <Route path="/" element={<HomeContent {...appState} />} />
              <Route path="/search" element={<SearchContent {...appState} />} />
              <Route path="/library" element={<LibraryContent {...appState} />} />
              <Route path="/playlist/:id" element={<PlaylistContent {...appState} />} />
              <Route path="/artist/:id" element={<ArtistContent {...appState} />} />
              <Route path="/album/:id" element={<AlbumContent {...appState} />} />
            </Routes>
          </div>
        </div>
      </div>

      {/* Bottom Player */}
      <PlayerBar {...appState} />
      
      {/* Hidden Audio Element */}
      <audio ref={audioRef} />
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppLayout />
    </BrowserRouter>
  );
}

export default App;