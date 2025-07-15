import { Switch, Route } from 'react-router-dom';

import PrivateRoute from '../components/PrivateRoute/PrivateRoute';
import MainLayout from '../layout/MainLayout';
import ArticlePage from '../pages/ArticlePage';
import ArticlesListPage from '../pages/ArticlesListPage';
import CreateArticlePage from '../pages/CreateArticlePage';
import EditeArticle from '../pages/EditeArticle';
import EditProfilePage from '../pages/EditeProfilePage';
import SignUpPage from '../pages/SignUpPage';
import SignInPage from '../pages/SingInPage';

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
    <Route exact path="/articles/:slug/edit">
      <MainLayout>
        <EditeArticle />
      </MainLayout>
    </Route>
    <Route path="/articles/:slug">
      <MainLayout>
        <ArticlePage />
      </MainLayout>
    </Route>
    <Route exact path="/sign_up">
      <MainLayout>
        <SignUpPage />
      </MainLayout>
    </Route>
    <Route exact path="/sign_in">
      <MainLayout>
        <SignInPage />
      </MainLayout>
    </Route>
    <Route exact path="/profile">
      <MainLayout>
        <EditProfilePage />
      </MainLayout>
    </Route>
    <PrivateRoute
      exact
      path="/new-article"
      component={() => (
        <MainLayout>
          <CreateArticlePage />
        </MainLayout>
      )}
    />
  </Switch>
);

export default Routes;
