# Collaboration Toolkit Module #

middlemanapp + YAML + textile + custom font + custom JS = learning module publishing workflow.

1. run bundler install to get the dependencies of this app.
1. run 'middleman server' to launch a webserver hosting the live version.
1. modify YAML in /data to maintain content. new pages get a line or two in 'chapters.yml', plus a file.
1. modify templates in /source to manage layouts.
1. run 'middleman build' to output static files to /build.
1. we've attempted to use relative paths that will make this site easy to integrate with OAH CMS asset locations. these may need adjustment (in CSS, templates, and config file)

