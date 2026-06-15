import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from 'react-router-dom'
import './index.css'
import Home from './Pages/Home.jsx'
import YoutubeImport from './Pages/YoutubeImport.jsx'
import SpotifyPlaylistPage from './Pages/SpotifyPlaylistPage.jsx'
import PlaylistContextProvider from './Contexts/PlaylistContextProvider.jsx'
import PlaylistTracksPage from './Pages/PlaylistTracksPage.jsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path='/' element={<Home/>} />
      <Route path='/youtubemusic' element={<YoutubeImport/>} />
      <Route path='/playlists' element={<SpotifyPlaylistPage/>}/>
      <Route path='/playlist/:playlistId' element={<PlaylistTracksPage/>} />
    </>
  )
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <PlaylistContextProvider>
      <RouterProvider router={router} />
    </PlaylistContextProvider>
  </StrictMode>,
)
