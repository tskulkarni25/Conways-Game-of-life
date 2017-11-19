class GameController < ApplicationController
  def index
    @@game = Game.new(50, 50)
  end

  def start
    cells = []
    if params[:load] == 'true'
      params[:cells].to_hash.values.each do |col, row|
        cells.push([col.to_i, row.to_i])
      end
      @@game.load cells
    end
    @grid = @@game.execute
  end

  def clear
    @@game = Game.new(50, 50)
    respond_to do |format|
      format.js
    end
  end
end
