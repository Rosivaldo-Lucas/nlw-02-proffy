import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Landing from '../pages/Landing';
import TeacherForm from '../pages/TeacherForm';
import TeacherList from '../pages/TeacherList';

function Router() {
  return (
    <BrowserRouter>
      <Route path="/" exact component={Landing} />
      <Route path="/give-classes" exact component={TeacherForm} />
      <Route path="/stydy" exact component={TeacherList} />
    </BrowserRouter>
  );
}

export default Router;
