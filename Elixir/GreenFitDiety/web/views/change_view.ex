defmodule Greenfitdiety.ChangeView do
  use Greenfitdiety.Web, :view

    def render("index.json", %{changes: changes}) do
      render_many(changes, Greenfitdiety.ChangeView, "change.json")
    end

    def render("show.json", %{change: change}) do
      render_one(change, Greenfitdiety.ChangeView, "change.json")
    end

    def render("change.json", %{change: change}) do
      %{id:                      change.id,
        date:                    change.date,
        weight:                  change.weight,
        metabolic_age:           change.metabolic_age,
        fat:                     change.fat,
        visceral_fat:            change.visceral_fat,
        labs:                    change.labs,
        others:                  change.others,
        user_id:                 change.user_id
        }
    end

end
