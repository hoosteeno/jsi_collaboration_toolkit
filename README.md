_The files herein can serve as a dandy point of departure for a new Middleman site_

## Steps

  1. On GitHub, create new private dojo4 repo
  2. On local machine, make new directory for new repo (mkdir _dirname_) then enter this directory (cd _dirname_)
  3. Run 
    * <code>git clone git@github.com:dojo4/static_site.git .</code> (this will clone the 'static_site' in current local directory)
    * <code>rm -rf .git</code> (this will detach local directory from cloned "static_site" repo)
    * <code>git init</code> (re-git-ify)
    * <code>git add .</code> (add new files)
    * <code>git commit -m _yourmessage_</code> (commit w/message)
    * <code>git remote add origin git@github.com:dojo4/_yournewreponame_</code>
    * <code>git push -u origin master</code>
  6. Consider updating _README.md_ file

_Note_: The paths in the /deploy files should be changed to match the true deploy path