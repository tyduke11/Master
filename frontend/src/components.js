import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

// Icons (using Unicode symbols for simplicity)
const PlayIcon = () => <span className="text-2xl">▶</span>;
const PauseIcon = () => <span className="text-2xl">⏸</span>;
const HeartIcon = ({ filled = false }) => (
  <span className={`text-xl ${filled ? 'text-green-500' : 'text-gray-400 hover:text-white'}`}>
    {filled ? '♥' : '♡'}
  </span>
);
const SearchIcon = () => <span className="text-xl">🔍</span>;
const HomeIcon = () => <span className="text-xl">🏠</span>;
const LibraryIcon = () => <span className="text-xl">📚</span>;
const PlusIcon = () => <span className="text-xl">+</span>;
const ShuffleIcon = () => <span className="text-lg">🔀</span>;
const RepeatIcon = () => <span className="text-lg">🔁</span>;
const PrevIcon = () => <span className="text-lg">⏮</span>;
const NextIcon = () => <span className="text-lg">⏭</span>;
const VolumeIcon = () => <span className="text-lg">🔊</span>;

// Mock Data
const mockTracks = [
  {
    id: 1,
    title: "As It Was",
    artist: "Harry Styles",
    album: "Harry's House",
    duration: "2:47",
    image: "https://images.unsplash.com/photo-1595689226986-fc5081416d22?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Nzh8MHwxfHNlYXJjaHwyfHxhcnRpc3QlMjBwaG90b3xlbnwwfHx8fDE3NTIxNjEyMjJ8MA&ixlib=rb-4.1.0&q=85"
  },
  {
    id: 2,
    title: "Anti-Hero",
    artist: "Taylor Swift",
    album: "Midnights",
    duration: "3:20",
    image: "https://images.pexels.com/photos/1713953/pexels-photo-1713953.jpeg"
  },
  {
    id: 3,
    title: "Flowers",
    artist: "Miley Cyrus",
    album: "Endless Summer Vacation",
    duration: "3:20",
    image: "https://images.pexels.com/photos/2170729/pexels-photo-2170729.jpeg"
  },
  {
    id: 4,
    title: "Unholy",
    artist: "Sam Smith ft. Kim Petras",
    album: "Gloria",
    duration: "2:36",
    image: "https://images.pexels.com/photos/14251997/pexels-photo-14251997.jpeg"
  },
  {
    id: 5,
    title: "Lavender Haze",
    artist: "Taylor Swift",
    album: "Midnights",
    duration: "3:22",
    image: "https://images.unsplash.com/photo-1711054824441-064a99073a0b?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1ODB8MHwxfHNlYXJjaHwxfHxhbGJ1bSUyMGNvdmVyfGVufDB8fHx8MTc1MjA5MzMzMXww&ixlib=rb-4.1.0&q=85"
  }
];

const mockPlaylists = [
  {
    id: 1,
    name: "Today's Top Hits",
    description: "Jung Kook is on top of the Hottest 50!",
    image: "https://images.unsplash.com/photo-1619983081563-430f63602796?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2NDJ8MHwxfHNlYXJjaHwxfHx2aW55bHxlbnwwfHx8fDE3NTIxNjEyMjh8MA&ixlib=rb-4.1.0&q=85",
    tracks: mockTracks
  },
  {
    id: 2,
    name: "RapCaviar",
    description: "New music from Drake, 21 Savage and more",
    image: "https://images.pexels.com/photos/167092/pexels-photo-167092.jpeg",
    tracks: mockTracks.slice(0, 3)
  },
  {
    id: 3,
    name: "All Out 2010s",
    description: "The biggest songs of the 2010s",
    image: "https://images.unsplash.com/photo-1526394931762-90052e97b376?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2NDJ8MHwxfHNlYXJjaHwyfHx2aW55bHxlbnwwfHx8fDE3NTIxNjEyMjh8MA&ixlib=rb-4.1.0&q=85",
    tracks: mockTracks.slice(1, 4)
  },
  {
    id: 4,
    name: "Rock Classics",
    description: "Rock legends & epic songs",
    image: "https://images.pexels.com/photos/1389429/pexels-photo-1389429.jpeg",
    tracks: mockTracks.slice(0, 4)
  },
  {
    id: 5,
    name: "Chill Hits",
    description: "Kick back to the best new and recent chill hits",
    image: "https://images.pexels.com/photos/2746823/pexels-photo-2746823.jpeg",
    tracks: mockTracks.slice(2, 5)
  },
  {
    id: 6,
    name: "Indie Mix",
    description: "Fresh indie tracks and hidden gems",
    image: "https://images.unsplash.com/photo-1602848597941-0d3d3a2c1241?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2NDJ8MHwxfHNlYXJjaHwzfHx2aW55bHxlbnwwfHx8fDE3NTIxNjEyMjh8MA&ixlib=rb-4.1.0&q=85",
    tracks: mockTracks.slice(1, 3)
  }
];

const mockArtists = [
  {
    id: 1,
    name: "Harry Styles",
    monthlyListeners: "83,757,911",
    image: "https://images.unsplash.com/photo-1595689226986-fc5081416d22?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Nzh8MHwxfHNlYXJjaHwyfHxhcnRpc3QlMjBwaG90b3xlbnwwfHx8fDE3NTIxNjEyMjJ8MA&ixlib=rb-4.1.0&q=85",
    topTracks: mockTracks.slice(0, 3)
  },
  {
    id: 2,
    name: "Taylor Swift",
    monthlyListeners: "92,345,123",
    image: "https://images.pexels.com/photos/2332030/pexels-photo-2332030.jpeg",
    topTracks: mockTracks.slice(1, 4)
  },
  {
    id: 3,
    name: "The Weeknd",
    monthlyListeners: "78,234,567",
    image: "https://images.unsplash.com/flagged/photo-1571876243425-dc33d92bed52?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Nzh8MHwxfHNlYXJjaHwxfHxhcnRpc3QlMjBwaG90b3xlbnwwfHx8fDE3NTIxNjEyMjJ8MA&ixlib=rb-4.1.0&q=85",
    topTracks: mockTracks.slice(2, 5)
  }
];

// Sidebar Component
export const Sidebar = ({ userPlaylists }) => {
  const navigate = useNavigate();

  return (
    <div className="w-60 bg-black h-full flex flex-col">
      {/* Main Navigation */}
      <div className="p-6 space-y-4">
        <div className="flex items-center space-x-2 mb-6">
          <div className="w-8 h-8 bg-green-500 rounded flex items-center justify-center">
            <span className="text-black font-bold text-lg">♪</span>
          </div>
          <span className="text-white font-bold text-xl">Spotify</span>
        </div>

        <nav className="space-y-3">
          <Link to="/" className="flex items-center space-x-4 text-gray-300 hover:text-white transition-colors group">
            <HomeIcon />
            <span className="font-medium">Home</span>
          </Link>
          <Link to="/search" className="flex items-center space-x-4 text-gray-300 hover:text-white transition-colors">
            <SearchIcon />
            <span className="font-medium">Search</span>
          </Link>
        </nav>
      </div>

      {/* Your Library */}
      <div className="px-6 pb-4">
        <Link to="/library" className="flex items-center space-x-4 text-gray-300 hover:text-white transition-colors">
          <LibraryIcon />
          <span className="font-medium">Your Library</span>
        </Link>
      </div>

      {/* Divider */}
      <div className="mx-6 border-t border-gray-800"></div>

      {/* Playlist Creation */}
      <div className="px-6 py-4 space-y-3">
        <div className="flex items-center space-x-4 text-gray-300 hover:text-white transition-colors cursor-pointer">
          <div className="w-6 h-6 bg-gray-300 flex items-center justify-center text-black">
            <PlusIcon />
          </div>
          <span className="font-medium">Create Playlist</span>
        </div>
        <div className="flex items-center space-x-4 text-gray-300 hover:text-white transition-colors cursor-pointer">
          <div className="w-6 h-6 bg-gradient-to-br from-purple-700 to-blue-300 flex items-center justify-center">
            <HeartIcon filled />
          </div>
          <span className="font-medium">Liked Songs</span>
        </div>
      </div>

      {/* Divider */}
      <div className="mx-6 border-t border-gray-800"></div>

      {/* Playlists */}
      <div className="flex-1 overflow-y-auto px-6 py-4">
        <div className="space-y-2">
          {mockPlaylists.map((playlist) => (
            <Link
              key={playlist.id}
              to={`/playlist/${playlist.id}`}
              className="block text-gray-300 hover:text-white transition-colors text-sm py-1"
            >
              {playlist.name}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

// Top Navigation Bar
export const TopNavBar = ({ searchQuery, setSearchQuery }) => {
  const navigate = useNavigate();
  const [canGoBack, setCanGoBack] = useState(false);
  const [canGoForward, setCanGoForward] = useState(false);

  return (
    <div className="flex items-center justify-between p-6 bg-gradient-to-b from-gray-800/50 to-transparent">
      {/* Navigation Arrows */}
      <div className="flex items-center space-x-2">
        <button
          onClick={() => navigate(-1)}
          className={`w-8 h-8 rounded-full bg-black/70 flex items-center justify-center ${
            canGoBack ? 'text-white' : 'text-gray-500'
          }`}
          disabled={!canGoBack}
        >
          ←
        </button>
        <button
          onClick={() => navigate(1)}
          className={`w-8 h-8 rounded-full bg-black/70 flex items-center justify-center ${
            canGoForward ? 'text-white' : 'text-gray-500'
          }`}
          disabled={!canGoForward}
        >
          →
        </button>
      </div>

      {/* User Profile */}
      <div className="flex items-center space-x-4">
        <button className="bg-black text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-gray-800 transition-colors">
          Upgrade
        </button>
        <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center">
          <span className="text-white text-sm">U</span>
        </div>
      </div>
    </div>
  );
};

// Player Bar Component
export const PlayerBar = ({
  currentTrack,
  isPlaying,
  togglePlayPause,
  volume,
  setVolume,
  currentTime,
  duration,
  toggleLike,
  likedSongs
}) => {
  if (!currentTrack) return null;

  return (
    <div className="h-20 bg-gray-900 border-t border-gray-800 flex items-center px-4">
      {/* Current Track Info */}
      <div className="flex items-center space-x-4 w-1/4">
        <img
          src={currentTrack.image}
          alt={currentTrack.title}
          className="w-14 h-14 rounded object-cover"
        />
        <div className="min-w-0 flex-1">
          <p className="text-white text-sm font-medium truncate">{currentTrack.title}</p>
          <p className="text-gray-400 text-xs truncate">{currentTrack.artist}</p>
        </div>
        <button
          onClick={() => toggleLike(currentTrack.id)}
          className="text-gray-400 hover:text-white transition-colors"
        >
          <HeartIcon filled={likedSongs.has(currentTrack.id)} />
        </button>
      </div>

      {/* Player Controls */}
      <div className="flex-1 flex flex-col items-center space-y-2">
        <div className="flex items-center space-x-4">
          <button className="text-gray-400 hover:text-white transition-colors">
            <ShuffleIcon />
          </button>
          <button className="text-gray-400 hover:text-white transition-colors">
            <PrevIcon />
          </button>
          <button
            onClick={togglePlayPause}
            className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-black hover:scale-105 transition-transform"
          >
            {isPlaying ? <PauseIcon /> : <PlayIcon />}
          </button>
          <button className="text-gray-400 hover:text-white transition-colors">
            <NextIcon />
          </button>
          <button className="text-gray-400 hover:text-white transition-colors">
            <RepeatIcon />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="flex items-center space-x-2 w-full max-w-lg">
          <span className="text-xs text-gray-400">0:30</span>
          <div className="flex-1 h-1 bg-gray-600 rounded-full">
            <div className="h-1 bg-white rounded-full" style={{ width: '30%' }}></div>
          </div>
          <span className="text-xs text-gray-400">{currentTrack.duration}</span>
        </div>
      </div>

      {/* Volume Control */}
      <div className="flex items-center space-x-2 w-1/4 justify-end">
        <VolumeIcon />
        <div className="w-20 h-1 bg-gray-600 rounded-full">
          <div
            className="h-1 bg-white rounded-full"
            style={{ width: `${volume}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

// Home Content Component
export const HomeContent = ({ playTrack }) => {
  const currentHour = new Date().getHours();
  let greeting = "Good evening";
  if (currentHour < 12) greeting = "Good morning";
  else if (currentHour < 18) greeting = "Good afternoon";

  return (
    <div className="space-y-8">
      {/* Greeting */}
      <h1 className="text-3xl font-bold text-white mt-4">{greeting}</h1>

      {/* Recently Played */}
      <div className="grid grid-cols-3 gap-4">
        {mockPlaylists.slice(0, 6).map((playlist) => (
          <Link
            key={playlist.id}
            to={`/playlist/${playlist.id}`}
            className="flex items-center bg-gray-800/50 rounded hover:bg-gray-700/50 transition-colors group"
          >
            <img
              src={playlist.image}
              alt={playlist.name}
              className="w-16 h-16 rounded-l object-cover"
            />
            <span className="px-4 font-medium text-white truncate">{playlist.name}</span>
            <div className="ml-auto mr-4 opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                <PlayIcon />
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Made For You */}
      <div>
        <h2 className="text-2xl font-bold text-white mb-4">Made for you</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {mockPlaylists.slice(0, 6).map((playlist) => (
            <Link
              key={playlist.id}
              to={`/playlist/${playlist.id}`}
              className="bg-gray-800/20 p-4 rounded-lg hover:bg-gray-700/30 transition-colors group"
            >
              <div className="relative">
                <img
                  src={playlist.image}
                  alt={playlist.name}
                  className="w-full aspect-square rounded-md object-cover mb-4"
                />
                <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center shadow-lg">
                    <PlayIcon />
                  </div>
                </div>
              </div>
              <h3 className="font-semibold text-white truncate">{playlist.name}</h3>
              <p className="text-sm text-gray-400 mt-1 line-clamp-2">{playlist.description}</p>
            </Link>
          ))}
        </div>
      </div>

      {/* Popular Artists */}
      <div>
        <h2 className="text-2xl font-bold text-white mb-4">Popular artists</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {mockArtists.map((artist) => (
            <Link
              key={artist.id}
              to={`/artist/${artist.id}`}
              className="bg-gray-800/20 p-4 rounded-lg hover:bg-gray-700/30 transition-colors group"
            >
              <div className="relative">
                <img
                  src={artist.image}
                  alt={artist.name}
                  className="w-full aspect-square rounded-full object-cover mb-4"
                />
                <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center shadow-lg">
                    <PlayIcon />
                  </div>
                </div>
              </div>
              <h3 className="font-semibold text-white truncate">{artist.name}</h3>
              <p className="text-sm text-gray-400 mt-1">Artist</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

// Search Content Component
export const SearchContent = ({ searchQuery, setSearchQuery, playTrack }) => {
  const [searchResults, setSearchResults] = useState({
    tracks: [],
    artists: [],
    playlists: []
  });

  useEffect(() => {
    if (searchQuery.trim()) {
      // Mock search results
      const results = {
        tracks: mockTracks.filter(track =>
          track.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          track.artist.toLowerCase().includes(searchQuery.toLowerCase())
        ),
        artists: mockArtists.filter(artist =>
          artist.name.toLowerCase().includes(searchQuery.toLowerCase())
        ),
        playlists: mockPlaylists.filter(playlist =>
          playlist.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
      };
      setSearchResults(results);
    } else {
      setSearchResults({ tracks: [], artists: [], playlists: [] });
    }
  }, [searchQuery]);

  const browseCategories = [
    { name: "Pop", color: "bg-pink-500", image: "https://images.pexels.com/photos/1713953/pexels-photo-1713953.jpeg" },
    { name: "Hip-Hop", color: "bg-red-500", image: "https://images.pexels.com/photos/14251997/pexels-photo-14251997.jpeg" },
    { name: "Rock", color: "bg-orange-500", image: "https://images.pexels.com/photos/167092/pexels-photo-167092.jpeg" },
    { name: "Indie", color: "bg-green-500", image: "https://images.pexels.com/photos/2170729/pexels-photo-2170729.jpeg" },
    { name: "Electronic", color: "bg-blue-500", image: "https://images.pexels.com/photos/1389429/pexels-photo-1389429.jpeg" },
    { name: "Classical", color: "bg-purple-500", image: "https://images.pexels.com/photos/2746823/pexels-photo-2746823.jpeg" }
  ];

  return (
    <div className="space-y-8">
      {/* Search Header */}
      <div className="sticky top-0 bg-gray-900/90 backdrop-blur-sm py-4 -mx-6 px-6">
        <div className="relative max-w-md">
          <SearchIcon />
          <input
            type="text"
            placeholder="What do you want to listen to?"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white text-black pl-12 pr-4 py-3 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-white"
          />
        </div>
      </div>

      {/* Search Results */}
      {searchQuery.trim() ? (
        <div className="space-y-8">
          {/* Top Result */}
          {(searchResults.tracks.length > 0 || searchResults.artists.length > 0) && (
            <div>
              <h2 className="text-2xl font-bold text-white mb-4">Top result</h2>
              <div className="bg-gray-800/50 p-6 rounded-lg hover:bg-gray-700/50 transition-colors">
                {searchResults.artists.length > 0 ? (
                  <Link to={`/artist/${searchResults.artists[0].id}`} className="flex items-center space-x-4">
                    <img
                      src={searchResults.artists[0].image}
                      alt={searchResults.artists[0].name}
                      className="w-20 h-20 rounded-full object-cover"
                    />
                    <div>
                      <h3 className="text-2xl font-bold text-white">{searchResults.artists[0].name}</h3>
                      <p className="text-gray-400">Artist</p>
                    </div>
                  </Link>
                ) : (
                  <div
                    onClick={() => playTrack(searchResults.tracks[0])}
                    className="flex items-center space-x-4 cursor-pointer"
                  >
                    <img
                      src={searchResults.tracks[0].image}
                      alt={searchResults.tracks[0].title}
                      className="w-20 h-20 rounded object-cover"
                    />
                    <div>
                      <h3 className="text-2xl font-bold text-white">{searchResults.tracks[0].title}</h3>
                      <p className="text-gray-400">{searchResults.tracks[0].artist}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Songs */}
          {searchResults.tracks.length > 0 && (
            <div>
              <h2 className="text-2xl font-bold text-white mb-4">Songs</h2>
              <div className="space-y-2">
                {searchResults.tracks.slice(0, 4).map((track, index) => (
                  <div
                    key={track.id}
                    onClick={() => playTrack(track)}
                    className="flex items-center space-x-4 p-2 rounded hover:bg-gray-800/50 transition-colors cursor-pointer group"
                  >
                    <img
                      src={track.image}
                      alt={track.title}
                      className="w-12 h-12 rounded object-cover"
                    />
                    <div className="flex-1">
                      <p className="text-white font-medium">{track.title}</p>
                      <p className="text-gray-400 text-sm">{track.artist}</p>
                    </div>
                    <span className="text-gray-400 text-sm">{track.duration}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      ) : (
        /* Browse All */
        <div>
          <h2 className="text-2xl font-bold text-white mb-6">Browse all</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {browseCategories.map((category) => (
              <div
                key={category.name}
                className={`${category.color} p-4 rounded-lg relative overflow-hidden hover:scale-105 transition-transform cursor-pointer`}
              >
                <h3 className="text-white font-bold text-lg mb-2">{category.name}</h3>
                <img
                  src={category.image}
                  alt={category.name}
                  className="absolute bottom-0 right-0 w-16 h-16 object-cover rounded transform rotate-12 translate-x-2 translate-y-2"
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

// Library Content Component
export const LibraryContent = ({ userPlaylists }) => {
  const [filter, setFilter] = useState('all');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white">Your Library</h1>
        <button className="text-gray-400 hover:text-white">
          <PlusIcon />
        </button>
      </div>

      {/* Filter Pills */}
      <div className="flex space-x-2">
        {['all', 'playlists', 'artists', 'albums'].map((filterType) => (
          <button
            key={filterType}
            onClick={() => setFilter(filterType)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              filter === filterType
                ? 'bg-white text-black'
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            }`}
          >
            {filterType.charAt(0).toUpperCase() + filterType.slice(1)}
          </button>
        ))}
      </div>

      {/* Content List */}
      <div className="space-y-2">
        {/* Liked Songs */}
        <div className="flex items-center space-x-4 p-2 rounded hover:bg-gray-800/50 transition-colors cursor-pointer">
          <div className="w-12 h-12 bg-gradient-to-br from-purple-700 to-blue-300 rounded flex items-center justify-center">
            <HeartIcon filled />
          </div>
          <div>
            <p className="text-white font-medium">Liked Songs</p>
            <p className="text-gray-400 text-sm">0 songs</p>
          </div>
        </div>

        {/* User Playlists */}
        {mockPlaylists.map((playlist) => (
          <Link
            key={playlist.id}
            to={`/playlist/${playlist.id}`}
            className="flex items-center space-x-4 p-2 rounded hover:bg-gray-800/50 transition-colors"
          >
            <img
              src={playlist.image}
              alt={playlist.name}
              className="w-12 h-12 rounded object-cover"
            />
            <div>
              <p className="text-white font-medium">{playlist.name}</p>
              <p className="text-gray-400 text-sm">Playlist • {playlist.tracks.length} songs</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

// Playlist Content Component
export const PlaylistContent = ({ playTrack, toggleLike, likedSongs }) => {
  const { id } = useParams();
  const playlist = mockPlaylists.find(p => p.id === parseInt(id));

  if (!playlist) {
    return <div className="text-white">Playlist not found</div>;
  }

  return (
    <div className="space-y-6">
      {/* Playlist Header */}
      <div className="flex items-end space-x-6 pt-16 pb-6">
        <img
          src={playlist.image}
          alt={playlist.name}
          className="w-60 h-60 shadow-2xl object-cover"
        />
        <div className="space-y-2">
          <p className="text-sm font-medium text-white">PLAYLIST</p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white">{playlist.name}</h1>
          <p className="text-gray-300">{playlist.description}</p>
          <div className="flex items-center space-x-1 text-sm text-gray-300">
            <span>Spotify</span>
            <span>•</span>
            <span>{playlist.tracks.length} songs</span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center space-x-6">
        <button className="w-14 h-14 bg-green-500 rounded-full flex items-center justify-center text-black hover:bg-green-400 transition-colors">
          <PlayIcon />
        </button>
        <button className="text-gray-400 hover:text-white text-2xl">
          <HeartIcon />
        </button>
        <button className="text-gray-400 hover:text-white">•••</button>
      </div>

      {/* Track List */}
      <div className="space-y-1">
        {/* Header */}
        <div className="grid grid-cols-12 gap-4 px-4 py-2 text-sm text-gray-400 border-b border-gray-800">
          <div className="col-span-1">#</div>
          <div className="col-span-6">TITLE</div>
          <div className="col-span-3">ALBUM</div>
          <div className="col-span-2 text-right">⏱</div>
        </div>

        {/* Tracks */}
        {playlist.tracks.map((track, index) => (
          <div
            key={track.id}
            onClick={() => playTrack(track)}
            className="grid grid-cols-12 gap-4 px-4 py-2 rounded hover:bg-gray-800/50 transition-colors cursor-pointer group"
          >
            <div className="col-span-1 flex items-center text-gray-400 group-hover:text-white">
              <span className="group-hover:hidden">{index + 1}</span>
              <PlayIcon className="hidden group-hover:block" />
            </div>
            <div className="col-span-6 flex items-center space-x-4">
              <img
                src={track.image}
                alt={track.title}
                className="w-10 h-10 rounded object-cover"
              />
              <div>
                <p className="text-white font-medium">{track.title}</p>
                <p className="text-gray-400 text-sm">{track.artist}</p>
              </div>
            </div>
            <div className="col-span-3 flex items-center text-gray-400 text-sm">
              {track.album}
            </div>
            <div className="col-span-2 flex items-center justify-end space-x-4">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleLike(track.id);
                }}
                className="opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <HeartIcon filled={likedSongs.has(track.id)} />
              </button>
              <span className="text-gray-400 text-sm">{track.duration}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Artist Content Component
export const ArtistContent = ({ playTrack, toggleFollow, followedArtists }) => {
  const { id } = useParams();
  const artist = mockArtists.find(a => a.id === parseInt(id));

  if (!artist) {
    return <div className="text-white">Artist not found</div>;
  }

  return (
    <div className="space-y-6">
      {/* Artist Header */}
      <div className="flex items-end space-x-6 pt-16 pb-6">
        <img
          src={artist.image}
          alt={artist.name}
          className="w-60 h-60 rounded-full shadow-2xl object-cover"
        />
        <div className="space-y-2">
          <p className="text-sm font-medium text-white">ARTIST</p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white">{artist.name}</h1>
          <p className="text-gray-300">{artist.monthlyListeners} monthly listeners</p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center space-x-6">
        <button className="w-14 h-14 bg-green-500 rounded-full flex items-center justify-center text-black hover:bg-green-400 transition-colors">
          <PlayIcon />
        </button>
        <button
          onClick={() => toggleFollow(artist.id)}
          className={`px-6 py-2 rounded-full border transition-colors ${
            followedArtists.has(artist.id)
              ? 'border-gray-400 text-gray-400 hover:border-white hover:text-white'
              : 'border-white text-white hover:bg-white hover:text-black'
          }`}
        >
          {followedArtists.has(artist.id) ? 'Following' : 'Follow'}
        </button>
        <button className="text-gray-400 hover:text-white">•••</button>
      </div>

      {/* Popular */}
      <div>
        <h2 className="text-xl font-bold text-white mb-4">Popular</h2>
        <div className="space-y-1">
          {artist.topTracks.map((track, index) => (
            <div
              key={track.id}
              onClick={() => playTrack(track)}
              className="flex items-center space-x-4 p-2 rounded hover:bg-gray-800/50 transition-colors cursor-pointer group"
            >
              <span className="text-gray-400 w-4 text-center group-hover:hidden">{index + 1}</span>
              <PlayIcon className="hidden group-hover:block text-white" />
              <img
                src={track.image}
                alt={track.title}
                className="w-10 h-10 rounded object-cover"
              />
              <div className="flex-1">
                <p className="text-white font-medium">{track.title}</p>
                <p className="text-gray-400 text-sm">{track.artist}</p>
              </div>
              <span className="text-gray-400 text-sm">{track.duration}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Album Content Component
export const AlbumContent = ({ playTrack, toggleLike, likedSongs }) => {
  const { id } = useParams();
  // For demo purposes, we'll use the first track's data as album info
  const album = {
    id: parseInt(id),
    name: "Harry's House",
    artist: "Harry Styles",
    year: "2022",
    image: "https://images.unsplash.com/photo-1595689226986-fc5081416d22?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Nzh8MHwxfHNlYXJjaHwyfHxhcnRpc3QlMjBwaG90b3xlbnwwfHx8fDE3NTIxNjEyMjJ8MA&ixlib=rb-4.1.0&q=85",
    tracks: mockTracks
  };

  return (
    <div className="space-y-6">
      {/* Album Header */}
      <div className="flex items-end space-x-6 pt-16 pb-6">
        <img
          src={album.image}
          alt={album.name}
          className="w-60 h-60 shadow-2xl object-cover"
        />
        <div className="space-y-2">
          <p className="text-sm font-medium text-white">ALBUM</p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white">{album.name}</h1>
          <div className="flex items-center space-x-1 text-sm text-gray-300">
            <span>{album.artist}</span>
            <span>•</span>
            <span>{album.year}</span>
            <span>•</span>
            <span>{album.tracks.length} songs</span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center space-x-6">
        <button className="w-14 h-14 bg-green-500 rounded-full flex items-center justify-center text-black hover:bg-green-400 transition-colors">
          <PlayIcon />
        </button>
        <button className="text-gray-400 hover:text-white text-2xl">
          <HeartIcon />
        </button>
        <button className="text-gray-400 hover:text-white">•••</button>
      </div>

      {/* Track List */}
      <div className="space-y-1">
        {album.tracks.map((track, index) => (
          <div
            key={track.id}
            onClick={() => playTrack(track)}
            className="grid grid-cols-12 gap-4 px-4 py-2 rounded hover:bg-gray-800/50 transition-colors cursor-pointer group"
          >
            <div className="col-span-1 flex items-center text-gray-400 group-hover:text-white">
              <span className="group-hover:hidden">{index + 1}</span>
              <PlayIcon className="hidden group-hover:block" />
            </div>
            <div className="col-span-9 flex items-center space-x-4">
              <div>
                <p className="text-white font-medium">{track.title}</p>
                <p className="text-gray-400 text-sm">{track.artist}</p>
              </div>
            </div>
            <div className="col-span-2 flex items-center justify-end space-x-4">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleLike(track.id);
                }}
                className="opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <HeartIcon filled={likedSongs.has(track.id)} />
              </button>
              <span className="text-gray-400 text-sm">{track.duration}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};