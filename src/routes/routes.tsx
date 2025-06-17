import { Switch, Route } from 'react-router-dom';

import MainLayout from '../layout/MainLayout';
import ArticlePage from '../pages/ArticlePage';
import ArticlesListPage from '../pages/ArticlesListPage';

const Routes = () => (
  <Switch>
    <Route exact path="/">
      <MainLayout>
        <ArticlesListPage />
      </MainLayout>
    </Route>
    <Route exact path="/articles">
      <MainLayout>
        <ArticlesListPage />
      </MainLayout>
    </Route>
    <Route path="/articles/:id">
      <MainLayout>
        <ArticlePage />
      </MainLayout>
    </Route>
  </Switch>
);

export default Routes;
