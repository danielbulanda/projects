defmodule Greenfitdiety.DietView do
  use Greenfitdiety.Web, :view

  def render("index.json", %{diets: diets}) do
    render_many(diets, Greenfitdiety.DietView, "diet.json")
  end

  def render("show.json", %{diet: diet}) do
    render_one(diet, Greenfitdiety.DietView, "diet.json")
  end

  def render("diet.json", %{diet: diet}) do
    %{id:                      diet.id,
      diet_name:               diet.diet_name,
      diet_img:                diet.diet_img,
      m1_name:                 diet.m1_name,
      m1_description:          diet.m1_description,
      m1_time:                 diet.m1_time,
      m2_name:                 diet.m2_name,
      m2_description:          diet.m2_description,
      m2_time:                 diet.m2_time,
      m3_name:                 diet.m3_name,
      m3_description:          diet.m3_description,
      m3_time:                 diet.m3_time,
      m4_name:                 diet.m4_name,
      m4_description:          diet.m4_description,
      m4_time:                 diet.m4_time,
      m5_name:                 diet.m5_name,
      m5_description:          diet.m5_description,
      m5_time:                 diet.m5_time,
      m6_name:                 diet.m6_name,
      m6_description:          diet.m6_description,
      m6_time:                 diet.m6_time,
      m7_name:                 diet.m7_name,
      m7_description:          diet.m7_description,
      m7_time:                 diet.m7_time,
      user_id:                 diet.user_id
      }
  end

end
