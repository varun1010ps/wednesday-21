import React, { Component } from "react";
import { Router, Route, Switch } from "react-router-dom";
import history from "../../history";

import TopNav from "../TopNav/TopNav";

import AdminLogin from "../AdminLogin/AdminLogin";
import Dashboard from "../Dashboard/Dashboard";

import Admin from "../Admin/Admin";
import AdminLogout from "../AdminLogout/AdminLogout";
import Content from "../Content/Content";
import ScrollToTop from "../ScrollToTop/ScrollToTop";
import Theme from "../Theme/Theme";
import ThemeDelete from "../ThemeDelete/ThemeDelete";
import ThemeEdit from "../ThemeEdit/ThemeEdit";

import Topic from "../Topic/Topic";
import TopicAdd from "../TopicAdd/TopicAdd";
import TopicDelete from "../TopicDelete/TopicDelete";
import TopicEdit from "../TopicEdit/TopicEdit";

import TeamAccess from "../TeamAccess/TeamAccess";
import TeamAccessView from "../TeamAccessView/TeamAccessView";
import Episode from "../Episode/Episode";
import EpisodeAdd from "../EpisodeAdd/EpisodeAdd";
import EpisodeView from "../EpisodeView/EpisodeView";
import EpisodeDelete from "../EpisodeDelete/EpisodeDelete";

import Story from "../Story/Story";
import StoryAdd from "../StoryAdd/StoryAdd";
import StoryView from "../StoryView/StoryView";
import StoryDelete from "../StoryDelete/StoryDelete";

import JournalQuestions from "../JournalQuestions/JournalQuestions";
import JournalQuestionsAdd from "../JournalQuestionsAdd/JournalQuestionsAdd";
import JournalQuestionsView from "../JournalQuestionsView/JournalQuestionsView";
import JournalQuestionsDelete from "../JournalQuestionsDelete/JournalQuestionsDelete";

import SessionBeta from "../Session/SessionBeta";
import SessionBetaAdd from "../SessionAdd/SessionBetaAdd";
import SessionBetaView from "../SessionView/SessionBetaView";
import SessionBetaDelete from "../SessionDelete/SessionBetaDelete";


// import routes from './routes';

class App extends Component {
  state = {};

  //   renderRoutes() {
  //     return _.map(routes, ({ path, compName }) => {
  //         return (
  //           <Route path={path} exact component={compName} />
  //         );
  //     });
  // }

  render() {
    return (
      <div className="App">
        <Router history={history}>
          <div>
            <ScrollToTop>
              <Switch>
                <Route path="/" component={TopNav} />
              </Switch>
              <Route path="/admin" component={Admin} />
              <div className="Page">
                <Route path="/" exact component={AdminLogin} />
                <Route path="/admin/dashboard" exact component={Dashboard} />
                <Route path="/admin/content" exact component={Content} />
                <Route
                  path="/admin/library-episodes"
                  exact
                  component={Episode}
                />
                <Route
                  path="/admin/library-episodes/new"
                  exact
                  component={EpisodeAdd}
                />
                <Route
                  path="/admin/library-episodes/view/:id"
                  exact
                  component={EpisodeView}
                />
                <Route
                  path="/admin/library-episodes/delete/:id"
                  exact
                  component={EpisodeDelete}
                />
                <Route
                  path="/admin/library-stories"
                  exact
                  component={Story}
                />
                <Route
                  path="/admin/library-stories/new"
                  exact
                  component={StoryAdd}
                />
                <Route
                  path="/admin/library-stories/view/:id"
                  exact
                  component={StoryView}
                />
                <Route
                  path="/admin/library-stories/delete/:id"
                  exact
                  component={StoryDelete}
                />
                <Route path="/admin/library-theme" exact component={Theme} />
                <Route
                  path="/admin/library-theme/delete/:id"
                  exact
                  component={ThemeDelete}
                />
                <Route
                  path="/admin/library-theme/edit/:id"
                  exact
                  component={ThemeEdit}
                />
                <Route path="/admin/library-topics" exact component={Topic} />
                <Route
                  path="/admin/library-topics/new"
                  exact
                  component={TopicAdd}
                />
                <Route
                  path="/admin/library-topics/delete/:id"
                  exact
                  component={TopicDelete}
                />
                <Route
                  path="/admin/library-topics/edit/:id"
                  exact
                  component={TopicEdit}
                />
                <Route path="/admin/team-access" exact component={TeamAccess} />
                <Route
                  path="/admin/team-access/view/:id"
                  exact
                  component={TeamAccessView}
                />
                <Route
                  path="/admin/library-journalquestion"
                  exact
                  component={JournalQuestions}
                />
                <Route
                  path="/admin/library-journalquestion/new"
                  exact
                  component={JournalQuestionsAdd}
                />
                <Route
                  path="/admin/library-journalquestion/view/:id"
                  exact
                  component={JournalQuestionsView}
                />
                <Route
                  path="/admin/library-journalquestion/delete/:id"
                  exact
                  component={JournalQuestionsDelete}
                />
                <Route
                  path="/admin/library-sessionBeta"
                  exact
                  component={SessionBeta}
                />
                <Route
                  path="/admin/library-sessionBeta/new"
                  exact
                  component={SessionBetaAdd}
                />
                <Route
                  path="/admin/library-sessionBeta/view/:id"
                  exact
                  component={SessionBetaView}
                />
                <Route
                  path="/admin/library-sessionBeta/delete/:id"
                  exact
                  component={SessionBetaDelete}
                />
                <Route path="/logout" exact component={AdminLogout} />
              </div>
            </ScrollToTop>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
