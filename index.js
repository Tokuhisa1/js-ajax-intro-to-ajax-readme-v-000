function showRepositories() {
  // "this" is set to the XMLHttpRequest object that fired the event
  const repos = JSON.parse(this.responseText);
  // The way we tell the interpreter that we're working with JSON is to parse
  // it with JSON.parse.
  console.log(repos);
  // Then let's start by simply listing the repository names.
  const repoList = `<ul>${repos
    .map(r => '<li>' + r.name +
      // We'll start by adding the link to our repository output.
      ' - <a href="#" data-repo="' + r.name +
      '" onclick="getCommits(this)">Get Commits</a></li>')
    .join('')}</ul>`;
  document.getElementById('repositories').innerHTML = repoList;
}
// Then let's create our getRepositories function and initiate our XHR request.
function getRepositories() {
  const req = new XMLHttpRequest();
  // The second part of XHR is handling the response once we've made the
  // request.
  req.addEventListener('load', showRepositories);
  req.open('GET', 'https://api.github.com/users/octocat/repos');
  req.send();
}
// Now that that's out of the way, let's set up our getCommits. It's going to
// look very similar to getRepositories, because it's mostly about just making
// another XHR request to Github.
function getCommits(el) {
  const name = el.dataset.repo;
  const req = new XMLHttpRequest();
  req.addEventListener('load', showCommits);
  req.open('GET', 'https://api.github.com/repos/octocat/' + name + '/commits');
  req.send();
}
// Finally, let's handle that request with our callback function.
function showCommits() {
  const commits = JSON.parse(this.responseText);
  const commitsList = `<ul>${commits
    .map(commit => '<li><strong>' + commit.author.login + '</strong> - ' +
        commit.commit.message + '</li>')
    .join('')}</ul>`;
  document.getElementById('commits').innerHTML = commitsList;
}
