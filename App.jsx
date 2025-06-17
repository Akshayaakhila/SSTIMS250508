import React  from 'react'
import Quiz from './components/Quiz/Quiz'
import Homepage from './components/Quiz/Homepage';
import { Route, Router , Routes} from 'react-router-dom';

const App = () => {
  return (

      <Routes>
        <Route path='/' element={<Homepage/>}/>
        <Route path='/quiz' element={<Quiz/>}/>
       </Routes>

  )
}

export default App;