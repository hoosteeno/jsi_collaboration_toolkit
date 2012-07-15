require 'tagz'
require 'fattr'

class Hierarchy

##
#
  module Base
    Code = proc do
      class << self
        def parent_class(&block)
          Fattr(:parent_class, &block)
        end

        def child_class(&block)
          Fattr(:child_class, &block)
        end

      end
  
      fattr :parent
      fattr :children
      fattr :address
      fattr :url
      fattr :title
      fattr :subtitle
      fattr :icon
      fattr :rows
      fattr :index => 0

      alias_method('__inspect__', 'inspect')

      def identifier
        attributes = {
          :address => address,
          :next => next_node,
          :prev => prev_node,
        }
        "#{ self.class.name }(#{ attributes.inspect })"
      end


      def inspect(accum = [], depth = 0)
        indent = '  ' * depth
        accum.push(indent + identifier)

        children.each do |child|
          child.inspect(accum, depth + 1)
        end
 
        accum.join("\n")
      end

      def initialize(options = {}, &block)
        @children = []

        options.each{|key, val| send("#{ key }=", val)}

        block.call(self) if block
      end

      def add_child(*args, &block)
        child = child_class.new(*args)
        child.parent = self

        children.push(child)
        block ? block.call(child) : child
      end

      def index
        parent.children.index(self)
      end

      def first?
        index == 0
      end

      def last?
        index == (parent.children.size - 1)
      end

      def parent_class
        self.class.parent_class
      end

      def child_class
        self.class.child_class
      end

    end

    def Base.included(other)
      super
    ensure
      other.send(:class_eval, &Code)
    end
  end

##
#
  include Base

  child_class{ Chapter }
  alias_method :add_chapter, :add_child
  alias_method :chapters, :children

  def parent
    self
  end

  class Chapter
    include Base
    child_class{ Section }
    alias_method :add_section, :add_child
    alias_method :sections, :children
    alias_method :hierarchy, :parent

    def prev_child 
      # i am a chapter. i and my siblings always have children.
      # if i have a previous sibling,  return the last of my sibling's kids
      # else, since i'm a chapter, i must be the first. 
    end

    def next_child 
      # i am a chapter. i and my siblings always have children.
      # if i have a next sibling,  return the first of my sibling's kids
      # else, since i'm a chapter, i must be the last. 
    end

    class Section
      include Base
      child_class{ SubSection }
      alias_method :add_subsection, :add_child
      alias_method :subsections, :children
      alias_method :chapter, :parent

      def prev_child 
        # i am a section. i and my siblings always either children, or content.
        # if i have a previous sibling, 
          # if my previous sibling has kids, return the last of my sibling's kids
          # else return my previous sibling 
      end

      def next_child 
        # i am a section. i and my siblings always either children, or content.
        # if i have a next sibling, 
          # if my next sibling has kids, return the next of my sibling's kids
          # else return my next sibling 
      end

      def previous
        case
          when first?
            parent.prev_child
          else
            parent.children[index - 1]
        end
      end

      def next
        case
          when last?
            parent.next_child
          else
            parent.children[index + 1]
        end
      end

      class SubSection
        include Base
        alias_method :section, :parent

        def previous
          case
            when first?
              parent.prev_child
            else
              parent.children[index - 1]
          end
        end

        def next
          case
            when last?
              parent.next_child
            else
              parent.children[index + 1]
          end
        end
      end
    end
  end
end

def Hierarchy.build(data)
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

            s.url "#{c.url}/section-#{s.address}" 
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

                  ss.url "#{s.url}/subsection-#{ss.address}" 
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


if $0 == __FILE__
  require 'yaml'
  require 'map'

  class D < ::Map
    def method_missing(method, *args, &block)
      self[method.to_s]
    end

     def data_for_path(path)
        key = File.basename(path, '.yml')
        has_key?(key)
     end
  end

  data = D.new

  libdir = File.dirname(__FILE__)
  mmdir = File.dirname(libdir)
  datadir = File.join(mmdir, 'data')

  glob = File.join(datadir, '**/**')

  Dir.glob(glob) do |file|
    key = File.basename(file, '.yml')
    data[key] = YAML.load(IO.read(file))
  end

  Hierarchy.build(data)

end


__END__
