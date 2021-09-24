import { MovieProvider } from './MovieContext';
import { SideBar } from './components/SideBar';
import { Content } from './components/Content';

import './styles/content.scss';
import './styles/sidebar.scss';
import './styles/global.scss';

export function App() {
  return (
    <MovieProvider>
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <SideBar />
        <Content />
      </div>
    </MovieProvider>
  )
}