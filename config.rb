require 'redcloth'

$:.unshift './lib'
require 'hierarchy.rb'



### 
# Compass
###

# Susy grids in Compass
# First: gem install compass-susy-plugin
# require 'susy'

# Change Compass configuration
# compass_config do |config|
#   config.output_style = :compact
# end

###
# Haml
###

# CodeRay syntax highlighting in Haml
# First: gem install haml-coderay
# require 'haml-coderay'

# CoffeeScript filters in Haml
# First: gem install coffee-filter
# require 'coffee-filter'

# Automatic image dimensions on image_tag helper
# activate :automatic_image_sizes

###
# Page command
###

# Per-page layout changes:
# 
# With no layout
# page "/path/to/file.html", :layout => false
# 
# With alternative layout
# page "/path/to/file.html", :layout => :otherlayout
# 
# A path which all have the same layout
# with_layout :admin do
#   page "/admin/*"
# end

# Proxy (fake) files
# page "/this-page-has-no-template.html", :proxy => "/template-file.html" do
#   @which_fake_page = "Rendering a fake page with a variable"
# end

###
# Helpers
###

# Methods defined in the helpers block are available in templates
helpers do
  def get_hierarchy 
    hierarchy = Hierarchy.new

    data.chapters.each_with_index do |chapter, chapter_index|

      hierarchy.add_chapter do |c| 
        c.address = chapter_index.to_s #create the unique filesystem and html address for this content

        if data.data_for_path c.address
          c.rows = data.send(c.address) # get the contents of the file if it exists
        end

        c.url "chapter-#{c.address}" #set up the url for this content
        c.title = chapter.title
        c.icon = chapter.icon
        c.subtitle = chapter.subtitle

        if chapter.sections
          chapter.sections.each_with_index do |section, section_index|

            section_index = section_index + 1

            c.add_section do |s| 
              s.address = "#{chapter_index.to_s}-#{section_index.to_s}" 

              if data.data_for_path s.address
                s.rows = data.send(s.address) 
              end

              s.url "section-#{s.address}" 
              s.title = section.title
              s.subtitle = section.subtitle

              if section.subsections
                section.subsections.each_with_index do |subsection, subsection_index|
                  subsection_index = subsection_index + 1

                  s.add_subsection do |ss| 
                    ss.address = "#{chapter_index.to_s}-#{section_index.to_s}-#{subsection_index.to_s}" 

                    if data.data_for_path ss.address
                      ss.rows = data.send(ss.address) 
                    end

                    ss.url "subsection-#{ss.address}" 
                    ss.title = subsection.title
                    ss.subtitle = subsection.subtitle

                  end # add_subsection
                end # each subsection
              end # if section.subsections
            end # add_section
          end # each section
        end # if chapter.sections
      end # add_chapter
    end # each chapter

    return hierarchy
  end

  def custom_or_default_content(thingy)
      if content_for?(thingy)
        yield_content(thingy)
      else
        data.site.send(thingy) || ''
      end
  end

  def textile_format(content)
    RedCloth.new(content).to_html
  end
end

# Change the CSS directory
set :css_dir, "/ash/oah/css/"

# Change the JS directory
set :js_dir, "/ash/oah/javascripts/"

# Change the images directory
set :images_dir, "/ash/oah/oah-initiatives/images/"

# Build-specific configuration
configure :build do
  # For example, change the Compass output style for deployment
   activate :minify_css
  
  # Minify Javascript on build
   activate :minify_javascript
  
  # Enable cache buster
   activate :cache_buster
  
  # Use relative URLs
  activate :relative_assets
  
  # Compress PNGs after build
  # First: gem install middleman-smusher
  # require "middleman-smusher"
  # activate :smusher
  
  # Or use a different image path
  set :http_path, "/ash/oah/oah-initiatives/images/"
end

activate :directory_indexes
page "/404.html", :directory_index => false
