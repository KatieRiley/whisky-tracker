class WhiskiesController < ApplicationController
  before_action :set_whisky, only: %i[ show edit update destroy ]

  # GET /whiskies or /whiskies.json
  def index
    @whiskies = Whisky.all

    respond_to do |format|
      format.html # renders index.html.erb (which includes your React mount)
      format.json { render json: @whiskies }
    end
  end

  # GET /whiskies/1 or /whiskies/1.json
  def show
  end

  # GET /whiskies/new
  def new
    @whisky = Whisky.new
  end

  # GET /whiskies/1/edit
  def edit
  end

  # POST /whiskies or /whiskies.json
  def create
    @whisky = Whisky.new(whisky_params)

    respond_to do |format|
      if @whisky.save
        format.json { render json: @whisky.as_json(include: :location), status: :created }
      else
        format.html { render :new, status: :unprocessable_entity }
        format.json { render json: @whisky.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /whiskies/1 or /whiskies/1.json
  def update
    respond_to do |format|
      if @whisky.update(whisky_params)
        format.html { redirect_to @whisky, notice: "Whisky was successfully updated." }
        format.json { render :show, status: :ok, location: @whisky }
      else
        format.html { render :edit, status: :unprocessable_entity }
        format.json { render json: @whisky.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /whiskies/1 or /whiskies/1.json
  def destroy
    @whisky.destroy!

    respond_to do |format|
      format.html { redirect_to whiskies_path, status: :see_other, notice: "Whisky was successfully destroyed." }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_whisky
      @whisky = Whisky.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def whisky_params
      params.fetch(:whisky).permit(
        :tasting_notes,
        :name,
        :rating,
        :location_id
      )
    end
end
