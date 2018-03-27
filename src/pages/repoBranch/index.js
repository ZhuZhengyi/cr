'use strict';
import { Component } from 'preact'; /** @jsx h */
import TimeFormat from '_/utils/timeFormat.js';
import './index.less';

class RepoBranch extends Component {

  getList() {
    let {user, repo} = this.props.urlParams;
    let repoList = {};
    try {
      let storageData = localStorage.getItem('crRepoList') || '';
      repoList = JSON.parse(storageData);
    } catch(e){};

    let repoItem = repoList[user + '/' + repo];
    if (!repoItem || !repoItem.branch) {
      return <div>No Branch</div>;
    }

    return <div>{
      repoItem.branch.sort((a, b) => {
        return a.date - b.date;
      }).map(rep => {
        return <a class="branchItem" href={'#/code/' + user + '/' + repo + '/' + rep.sha}>
          <div class="branchName">{rep.name || rep.sha}</div>
          <div class="branchInfo">{ TimeFormat(rep.date, 'yyyy-MM-dd hh:mm:ss') }</div>
        </a>
      })
    }</div>;
  }

  handleBack() {
    history.back();
  }

  render() {
    let {user, repo} = this.props.urlParams;

    return <div class="branchList">
      <div class="title">Branch</div>
      <div class="return" onClick={this.handleBack.bind(this)}>Back</div>
      <a href={'#/branch/' + user + '/' + repo} class="add">+ Add Branch</a>
      <div class="listContainer">
        <div class="user">{user} / {repo}</div>
        { this.getList() }
      </div>
    </div>
  }
}

export default RepoBranch;

