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
      fattr :next => nil
      fattr :previous => nil
      fattr :address
      fattr :url
      fattr :title
      fattr :subtitle
      fattr :icon
      fattr :rows

      def initialize(options = {}, &block)
        @children = []

        options.each{|key, val| send("#{ key }=", val)}

        block.call(self) if block
      end

      def add_child(*args, &block)
        child = child_class.new(*args)
        child.parent = self

        # add next and prev
        kids = children
        index = parent.children.index(self) || 0 
        momma = parent
        while true
          if kids.length > 0 # if there are other children of self
            child.previous = kids.last # the previous child is the most recent child 
            kids.last.next = child # this child is the next child after the last one

          elsif index > 0 # else if we have a recent sibling
            sibling = momma.children[index-1] 
            if sibling.children.length > 0 # if our recent sibling has a child
              child.previous = sibling.children.last # the previous one is our recent sibling's last child
              sibling.children.last.next = child # this child is the next one after our recent sibling's last child 
            else
              child.previous = sibling # the previous one is our recent sibling
              sibling.next = child # this child is the next one after our recent sibling 
            end

          elsif momma.class.to_s != 'Hierarchy'  # unless momma is eve, move up a generation and do it again
            kids = momma.children # work with momma's kids instead of our own 
            index = momma.parent.children.index(momma) # get momma's index in there
            momma = momma.parent # work with momma's parent instead of our own 
            next
          end

          break # we're done if we got here
        end

        children.push(child)
        block ? block.call(child) : child
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

    class Section
      include Base
      child_class{ SubSection }
      alias_method :add_subsection, :add_child
      alias_method :subsections, :children
      alias_method :chapter, :parent

      class SubSection
        include Base
        alias_method :section, :parent
      end
    end
  end
end


__END__
