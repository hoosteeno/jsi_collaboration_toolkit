_The files herein can serve as a dandy point of departure for a new Middleman site_

## Steps

  1. On GitHub, create new private dojo4 repo: _newproject_
  2. On local machine:
    * <code>git clone git@github.com:dojo4/static&#95;site.git _newproject_</pre></code> (this will clone 'static&#95;site' into a new directory called 'newproject')
    * <code>cd _newproject_</code>
    * <code>vim .git/config</code> (to edit git config)
    * change [remote "origin"] "url" path from <i>static&#95;site</i> to <i>newproject</i>
      <code>
        [remote "origin"] 
          fetch = +refs/heads/&#42;:refs/remotes/origin/&#42;
          url = git@github.com:dojo4/<i>newproject</i>.git
      </code>
    * <code>git push -u origin master</code>
  6. Consider updating _README.md_ file

_Note_: The paths in the /deploy files should be changed to match the true deploy path