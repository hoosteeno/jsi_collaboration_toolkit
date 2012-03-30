## How to Fork the Base Middleman repo

  1. On GitHub, create new private dojo4 repo: _newproject_
  2. On local machine:
    * Clone 'static&#95;site' into a new directory called 'newproject'
      <code>git clone git@github.com:dojo4/static&#95;site.git _newproject_</code>
    * Go to _newproject_
      <code>cd _newproject_</code>
    * Edit git config
      <code>vim .git/config</code>
    * Change _static&#95;site_ to _newproject_ in the code below
      <pre><code>[remote "origin"] 
          fetch = +refs/heads/&#42;:refs/remotes/origin/&#42;
          url = git@github.com:dojo4/<i>newproject</i>.git
      </code></pre>
    * Push this to the _newproject_ repo
      <code>git push -u origin master</code>
  6. Consider updating _README.md_ file

_Note_: The paths in the /deploy files should be changed to match the true deploy path