class MockLegsFinder
    OPPOSIT_TYPE = {
    'to' => 'from',
    'from' => 'to'
  }

  def initialize(type, query, scope = nil)
    @legs = GistParser.parse
    @query = query.to_s.downcase.strip
    @scope = scope
    @type = type
  end

  def results
    return [] unless @query.present?

    @legs.map do |leg|
      serializer = LegSerializer.new(leg[@type])
      next if !@scope.nil? && leg[OPPOSIT_TYPE[@type]]['name'].downcase != @scope.downcase
      next if serializer.name.downcase.match(%r{#{@query}}).nil?

      serializer.as_json
    end.compact.uniq { |element| element[:name] }
  end

  # Nie dodałem do oddzielnego pliku jako serializer, ponieważ nie użyłem AciteModel::Serializer
  class LegSerializer
    def initialize(object)
      @object = object
    end

    def mode
      @object['mode']
    end

    def name
      @object['name']
    end

    def latitude
      coordinate[1]
    end

    def longitude
      coordinate[0]
    end

    def arrival_time
      DateTime.parse(@object['arrival_time']).strftime('%c')
    rescue
      '-'
    end

    def departure_time
      DateTime.parse(@object['departure_time']).strftime('%c')
    rescue
      '-'
    end

    def as_json
      {
        mode: mode,
        name: name,
        lat: latitude,
        lng: longitude,
        arrivalTime: arrival_time,
        departureTime: departure_time,
      }
    end

    private

    def coordinate
      @object['coordinate']
    end
  end
end
