require "rails_helper"

RSpec.describe WhiskiesController, type: :routing do
  describe "routing" do
    it "routes to #index" do
      expect(get: "/whiskies").to route_to("whiskies#index")
    end

    it "routes to #new" do
      expect(get: "/whiskies/new").to route_to("whiskies#new")
    end

    it "routes to #show" do
      expect(get: "/whiskies/1").to route_to("whiskies#show", id: "1")
    end

    it "routes to #edit" do
      expect(get: "/whiskies/1/edit").to route_to("whiskies#edit", id: "1")
    end


    it "routes to #create" do
      expect(post: "/whiskies").to route_to("whiskies#create")
    end

    it "routes to #update via PUT" do
      expect(put: "/whiskies/1").to route_to("whiskies#update", id: "1")
    end

    it "routes to #update via PATCH" do
      expect(patch: "/whiskies/1").to route_to("whiskies#update", id: "1")
    end

    it "routes to #destroy" do
      expect(delete: "/whiskies/1").to route_to("whiskies#destroy", id: "1")
    end
  end
end
