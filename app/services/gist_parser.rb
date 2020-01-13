class GistParser

  def self.parse
    result = JSON.parse(File.read('db/gist.json'))['features'].flat_map do |element|
      element['properties']['commute']['legs']
    end
  end

end
