_The files herein can serve as a dandy point of departure for a new Middleman site_

## Steps

  1. On GitHub, create new private dojo4 repo: _newproject_
  2. On local machine:
    * <code>git clone git@github.com:dojo4/static_site.git _newproject_</code> (this will clone the 'static_site' in new directory called _newproject_)
    * <code>cd _newproject_</code>
    * <code>vim .git/config</code> (to edit git config)
    * change (red) path <code>[remote "origin"]/n fetch = +refs/heads/*:refs/remotes/origin/*/n url = git@github.com:dojo4/<span style="color:red">static_site</span>.git</code> to <code>_newproject_</code> and save
    * <code>git push -u origin master</code>
  6. Consider updating _README.md_ file

_Note_: The paths in the /deploy files should be changed to match the true deploy path